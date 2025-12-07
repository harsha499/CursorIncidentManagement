import { useState, useEffect, useCallback } from 'react';
import { Incident, IncidentFilters } from '../types/incident';
import { incidentApi } from '../services/api';

export function useIncidents(filters?: IncidentFilters) {
  const [incidents, setIncidents] = useState<Incident[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchIncidents = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await incidentApi.getAll(filters);
      setIncidents(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch incidents');
      console.error('Error fetching incidents:', err);
    } finally {
      setLoading(false);
    }
  }, [filters]);

  useEffect(() => {
    fetchIncidents();
  }, [fetchIncidents]);

  const refetch = useCallback(() => {
    fetchIncidents();
  }, [fetchIncidents]);

  return { incidents, loading, error, refetch };
}

export function useIncident(id: string) {
  const [incident, setIncident] = useState<Incident | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchIncident = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await incidentApi.getById(id);
        setIncident(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch incident');
        console.error('Error fetching incident:', err);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchIncident();
    }
  }, [id]);

  return { incident, loading, error };
}

