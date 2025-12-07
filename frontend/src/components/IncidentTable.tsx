import { Incident } from '../types/incident';
import { useNavigate } from 'react-router-dom';
import './IncidentTable.css';

interface IncidentTableProps {
  incidents: Incident[];
  onDelete?: (id: string) => void;
}

export default function IncidentTable({ incidents, onDelete }: IncidentTableProps) {
  const navigate = useNavigate();

  const getSeverityClass = (severity: Incident['severity']) => {
    const classes = {
      Critical: 'severity-critical',
      High: 'severity-high',
      Medium: 'severity-medium',
      Low: 'severity-low',
      Info: 'severity-info',
    };
    return classes[severity];
  };

  const getStatusClass = (status: Incident['status']) => {
    const classes = {
      Open: 'status-open',
      'In Progress': 'status-in-progress',
      Resolved: 'status-resolved',
    };
    return classes[status];
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString() + ' ' + date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const handleDelete = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    if (window.confirm('Are you sure you want to delete this incident?')) {
      onDelete?.(id);
    }
  };

  if (incidents.length === 0) {
    return (
      <div className="empty-state">
        <p>No incidents found. Create your first incident to get started!</p>
      </div>
    );
  }

  return (
    <div className="table-container">
      <table className="incident-table">
        <thead>
          <tr>
            <th>Team</th>
            <th>Description</th>
            <th>Severity</th>
            <th>Environment</th>
            <th>Status</th>
            <th>Created</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {incidents.map((incident) => (
            <tr
              key={incident.id}
              onClick={() => navigate(`/incidents/${incident.id}`)}
              className="table-row"
            >
              <td className="team-name">{incident.teamName}</td>
              <td className="description">
                {incident.issueDescription.length > 60
                  ? `${incident.issueDescription.substring(0, 60)}...`
                  : incident.issueDescription}
              </td>
              <td>
                <span className={`badge severity ${getSeverityClass(incident.severity)}`}>
                  {incident.severity}
                </span>
              </td>
              <td>{incident.environment}</td>
              <td>
                <span className={`badge status ${getStatusClass(incident.status)}`}>
                  {incident.status}
                </span>
              </td>
              <td className="date">{formatDate(incident.createdAt)}</td>
              <td className="actions" onClick={(e) => e.stopPropagation()}>
                <button
                  className="btn-edit"
                  onClick={() => navigate(`/incidents/${incident.id}/edit`)}
                  aria-label="Edit incident"
                >
                  ✏️
                </button>
                {onDelete && (
                  <button
                    className="btn-delete"
                    onClick={(e) => handleDelete(e, incident.id)}
                    aria-label="Delete incident"
                  >
                    🗑️
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

