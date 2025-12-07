import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useIncidents } from '../hooks/useIncidents';
import { incidentApi } from '../services/api';
import { IncidentFilters } from '../types/incident';
import FilterBar from '../components/FilterBar';
import IncidentTable from '../components/IncidentTable';
import './IncidentList.css';

export default function IncidentList() {
  const navigate = useNavigate();
  const [filters, setFilters] = useState<IncidentFilters>({});
  const { incidents, loading, error, refetch } = useIncidents(filters);

  const handleDelete = async (id: string) => {
    try {
      await incidentApi.delete(id);
      refetch();
    } catch (err) {
      console.error('Error deleting incident:', err);
      alert('Failed to delete incident. Please try again.');
    }
  };

  if (loading) {
    return (
      <div className="page-container">
        <div className="page-header">
          <h1>Incidents</h1>
          <button className="btn-primary" onClick={() => navigate('/create')}>
            + Create Incident
          </button>
        </div>
        <div className="loading-state">Loading incidents...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="page-container">
        <div className="page-header">
          <h1>Incidents</h1>
          <button className="btn-primary" onClick={() => navigate('/create')}>
            + Create Incident
          </button>
        </div>
        <div className="error-state">
          <p>Error: {error}</p>
          <button onClick={refetch} className="btn-primary">
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="page-container">
      <div className="page-header">
        <h1>Incidents</h1>
        <button className="btn-primary" onClick={() => navigate('/create')}>
          + Create Incident
        </button>
      </div>

      <FilterBar filters={filters} onFilterChange={setFilters} />

      <div className="incidents-summary">
        <p>
          Showing <strong>{incidents.length}</strong> incident{incidents.length !== 1 ? 's' : ''}
        </p>
      </div>

      <IncidentTable incidents={incidents} onDelete={handleDelete} />
    </div>
  );
}

