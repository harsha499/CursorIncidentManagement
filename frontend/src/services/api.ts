import axios from 'axios';
import { Incident, CreateIncidentDto, UpdateIncidentDto, IncidentFilters } from '../types/incident';

const API_BASE_URL = '/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const incidentApi = {
  getAll: async (filters?: IncidentFilters): Promise<Incident[]> => {
    const params = new URLSearchParams();
    if (filters?.status) params.append('status', filters.status);
    if (filters?.severity) params.append('severity', filters.severity);
    if (filters?.environment) params.append('environment', filters.environment);
    if (filters?.search) params.append('search', filters.search);

    const queryString = params.toString();
    const url = `/incidents${queryString ? `?${queryString}` : ''}`;
    const response = await api.get<Incident[]>(url);
    return response.data;
  },

  getById: async (id: string): Promise<Incident> => {
    const response = await api.get<Incident>(`/incidents/${id}`);
    return response.data;
  },

  create: async (data: CreateIncidentDto): Promise<Incident> => {
    const response = await api.post<Incident>('/incidents', data);
    return response.data;
  },

  update: async (id: string, data: UpdateIncidentDto): Promise<Incident> => {
    const response = await api.put<Incident>(`/incidents/${id}`, data);
    return response.data;
  },

  delete: async (id: string): Promise<void> => {
    await api.delete(`/incidents/${id}`);
  },
};

export default api;

