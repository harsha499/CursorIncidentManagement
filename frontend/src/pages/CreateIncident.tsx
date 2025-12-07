import { useNavigate } from 'react-router-dom';
import { incidentApi } from '../services/api';
import { CreateIncidentDto } from '../types/incident';
import IncidentForm from '../components/IncidentForm';
import './CreateIncident.css';

export default function CreateIncident() {
  const navigate = useNavigate();

  const handleSubmit = async (data: CreateIncidentDto) => {
    try {
      await incidentApi.create(data);
      navigate('/');
    } catch (error) {
      console.error('Error creating incident:', error);
      alert('Failed to create incident. Please try again.');
      throw error;
    }
  };

  const handleCancel = () => {
    navigate('/');
  };

  return (
    <div className="page-container">
      <div className="page-header">
        <h1>Create New Incident</h1>
      </div>
      <IncidentForm onSubmit={handleSubmit} onCancel={handleCancel} />
    </div>
  );
}

