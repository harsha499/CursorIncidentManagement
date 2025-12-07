import { useNavigate, useParams } from 'react-router-dom';
import { incidentApi } from '../services/api';
import { UpdateIncidentDto } from '../types/incident';
import { useIncident } from '../hooks/useIncidents';
import IncidentForm from '../components/IncidentForm';
import './EditIncident.css';

export default function EditIncident() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { incident, loading, error } = useIncident(id || '');

  const handleSubmit = async (data: UpdateIncidentDto) => {
    if (!id) return;

    try {
      await incidentApi.update(id, data);
      navigate(`/incidents/${id}`);
    } catch (error) {
      console.error('Error updating incident:', error);
      alert('Failed to update incident. Please try again.');
      throw error;
    }
  };

  const handleCancel = () => {
    if (id) {
      navigate(`/incidents/${id}`);
    } else {
      navigate('/');
    }
  };

  if (loading) {
    return (
      <div className="page-container">
        <div className="loading-state">Loading incident...</div>
      </div>
    );
  }

  if (error || !incident) {
    return (
      <div className="page-container">
        <div className="error-state">
          <p>{error || 'Incident not found'}</p>
          <button onClick={() => navigate('/')} className="btn-primary">
            Back to List
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="page-container">
      <div className="page-header">
        <h1>Edit Incident</h1>
      </div>
      <IncidentForm
        initialData={incident}
        onSubmit={handleSubmit}
        onCancel={handleCancel}
        submitLabel="Update Incident"
      />
    </div>
  );
}

