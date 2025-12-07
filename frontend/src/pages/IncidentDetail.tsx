import { useNavigate, useParams } from 'react-router-dom';
import { useIncident } from '../hooks/useIncidents';
import { incidentApi } from '../services/api';
import './IncidentDetail.css';

export default function IncidentDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { incident, loading, error } = useIncident(id || '');

  const handleDelete = async () => {
    if (!id) return;

    if (window.confirm('Are you sure you want to delete this incident?')) {
      try {
        await incidentApi.delete(id);
        navigate('/');
      } catch (error) {
        console.error('Error deleting incident:', error);
        alert('Failed to delete incident. Please try again.');
      }
    }
  };

  const getSeverityClass = (severity: string) => {
    const classes: Record<string, string> = {
      Critical: 'severity-critical',
      High: 'severity-high',
      Medium: 'severity-medium',
      Low: 'severity-low',
      Info: 'severity-info',
    };
    return classes[severity] || '';
  };

  const getStatusClass = (status: string) => {
    const classes: Record<string, string> = {
      Open: 'status-open',
      'In Progress': 'status-in-progress',
      Resolved: 'status-resolved',
    };
    return classes[status] || '';
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleString();
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
        <button onClick={() => navigate('/')} className="btn-back">
          ← Back to List
        </button>
        <div className="header-actions">
          <button
            onClick={() => navigate(`/incidents/${incident.id}/edit`)}
            className="btn-secondary"
          >
            Edit
          </button>
          <button onClick={handleDelete} className="btn-danger">
            Delete
          </button>
        </div>
      </div>

      <div className="incident-detail">
        <div className="detail-section">
          <h2>Incident Details</h2>
          <div className="detail-grid">
            <div className="detail-item">
              <label>Team Name</label>
              <p>{incident.teamName}</p>
            </div>
            <div className="detail-item">
              <label>Severity</label>
              <span className={`badge severity ${getSeverityClass(incident.severity)}`}>
                {incident.severity}
              </span>
            </div>
            <div className="detail-item">
              <label>Environment</label>
              <p>{incident.environment}</p>
            </div>
            <div className="detail-item">
              <label>Status</label>
              <span className={`badge status ${getStatusClass(incident.status)}`}>
                {incident.status}
              </span>
            </div>
            <div className="detail-item">
              <label>Created At</label>
              <p>{formatDate(incident.createdAt)}</p>
            </div>
            <div className="detail-item">
              <label>Updated At</label>
              <p>{formatDate(incident.updatedAt)}</p>
            </div>
          </div>
        </div>

        <div className="detail-section">
          <h2>Issue Description</h2>
          <div className="description-box">
            <p>{incident.issueDescription}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

