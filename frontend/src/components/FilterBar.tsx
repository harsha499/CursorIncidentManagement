import { Severity, Environment, Status, IncidentFilters } from '../types/incident';
import './FilterBar.css';

interface FilterBarProps {
  filters: IncidentFilters;
  onFilterChange: (filters: IncidentFilters) => void;
}

export default function FilterBar({ filters, onFilterChange }: FilterBarProps) {
  const handleChange = (key: keyof IncidentFilters, value: string) => {
    onFilterChange({
      ...filters,
      [key]: value || undefined,
    });
  };

  const clearFilters = () => {
    onFilterChange({});
  };

  const hasActiveFilters = Boolean(
    filters.status || filters.severity || filters.environment || filters.search
  );

  return (
    <div className="filter-bar">
      <div className="filter-group">
        <label htmlFor="search">Search</label>
        <input
          id="search"
          type="text"
          placeholder="Search by team name or description..."
          value={filters.search || ''}
          onChange={(e) => handleChange('search', e.target.value)}
          className="filter-input"
        />
      </div>

      <div className="filter-group">
        <label htmlFor="status">Status</label>
        <select
          id="status"
          value={filters.status || ''}
          onChange={(e) => handleChange('status', e.target.value)}
          className="filter-select"
        >
          <option value="">All Statuses</option>
          <option value="Open">Open</option>
          <option value="In Progress">In Progress</option>
          <option value="Resolved">Resolved</option>
        </select>
      </div>

      <div className="filter-group">
        <label htmlFor="severity">Severity</label>
        <select
          id="severity"
          value={filters.severity || ''}
          onChange={(e) => handleChange('severity', e.target.value)}
          className="filter-select"
        >
          <option value="">All Severities</option>
          <option value="Critical">Critical</option>
          <option value="High">High</option>
          <option value="Medium">Medium</option>
          <option value="Low">Low</option>
          <option value="Info">Info</option>
        </select>
      </div>

      <div className="filter-group">
        <label htmlFor="environment">Environment</label>
        <select
          id="environment"
          value={filters.environment || ''}
          onChange={(e) => handleChange('environment', e.target.value)}
          className="filter-select"
        >
          <option value="">All Environments</option>
          <option value="Production">Production</option>
          <option value="Staging">Staging</option>
          <option value="Development">Development</option>
          <option value="Testing">Testing</option>
        </select>
      </div>

      {hasActiveFilters && (
        <button className="clear-filters-btn" onClick={clearFilters}>
          Clear Filters
        </button>
      )}
    </div>
  );
}

