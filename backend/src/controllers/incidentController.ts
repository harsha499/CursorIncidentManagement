import { Request, Response } from 'express';
import { v4 as uuidv4 } from 'uuid';
import { DataService } from '../services/dataService';
import { Incident, CreateIncidentDto, UpdateIncidentDto, Severity, Environment, Status } from '../types/incident';

export class IncidentController {
  static getAllIncidents(req: Request, res: Response): void {
    try {
      let incidents = DataService.getAllIncidents();

      // Apply filters
      const { status, severity, environment, search } = req.query;

      if (status) {
        incidents = incidents.filter(inc => inc.status === status);
      }

      if (severity) {
        incidents = incidents.filter(inc => inc.severity === severity);
      }

      if (environment) {
        incidents = incidents.filter(inc => inc.environment === environment);
      }

      if (search && typeof search === 'string') {
        const searchLower = search.toLowerCase();
        incidents = incidents.filter(inc =>
          inc.teamName.toLowerCase().includes(searchLower) ||
          inc.issueDescription.toLowerCase().includes(searchLower)
        );
      }

      res.json(incidents);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch incidents' });
    }
  }

  static getIncidentById(req: Request, res: Response): void {
    try {
      const { id } = req.params;
      const incident = DataService.getIncidentById(id);

      if (!incident) {
        res.status(404).json({ error: 'Incident not found' });
        return;
      }

      res.json(incident);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch incident' });
    }
  }

  static createIncident(req: Request, res: Response): void {
    try {
      const dto: CreateIncidentDto = req.body;

      // Validation
      if (!dto.teamName || !dto.issueDescription || !dto.severity || !dto.environment) {
        res.status(400).json({ error: 'Missing required fields' });
        return;
      }

      const validSeverities: Severity[] = ['Critical', 'High', 'Medium', 'Low', 'Info'];
      const validEnvironments: Environment[] = ['Production', 'Staging', 'Development', 'Testing'];
      const validStatuses: Status[] = ['Open', 'In Progress', 'Resolved'];

      if (!validSeverities.includes(dto.severity)) {
        res.status(400).json({ error: 'Invalid severity value' });
        return;
      }

      if (!validEnvironments.includes(dto.environment)) {
        res.status(400).json({ error: 'Invalid environment value' });
        return;
      }

      const now = new Date().toISOString();
      const incident: Incident = {
        id: uuidv4(),
        teamName: dto.teamName,
        issueDescription: dto.issueDescription,
        severity: dto.severity,
        environment: dto.environment,
        status: dto.status || 'Open',
        createdAt: now,
        updatedAt: now
      };

      const created = DataService.createIncident(incident);
      res.status(201).json(created);
    } catch (error) {
      res.status(500).json({ error: 'Failed to create incident' });
    }
  }

  static updateIncident(req: Request, res: Response): void {
    try {
      const { id } = req.params;
      const dto: UpdateIncidentDto = req.body;

      // Validate enum values if provided
      if (dto.severity) {
        const validSeverities: Severity[] = ['Critical', 'High', 'Medium', 'Low', 'Info'];
        if (!validSeverities.includes(dto.severity)) {
          res.status(400).json({ error: 'Invalid severity value' });
          return;
        }
      }

      if (dto.environment) {
        const validEnvironments: Environment[] = ['Production', 'Staging', 'Development', 'Testing'];
        if (!validEnvironments.includes(dto.environment)) {
          res.status(400).json({ error: 'Invalid environment value' });
          return;
        }
      }

      if (dto.status) {
        const validStatuses: Status[] = ['Open', 'In Progress', 'Resolved'];
        if (!validStatuses.includes(dto.status)) {
          res.status(400).json({ error: 'Invalid status value' });
          return;
        }
      }

      const updated = DataService.updateIncident(id, dto);

      if (!updated) {
        res.status(404).json({ error: 'Incident not found' });
        return;
      }

      res.json(updated);
    } catch (error) {
      res.status(500).json({ error: 'Failed to update incident' });
    }
  }

  static deleteIncident(req: Request, res: Response): void {
    try {
      const { id } = req.params;
      const deleted = DataService.deleteIncident(id);

      if (!deleted) {
        res.status(404).json({ error: 'Incident not found' });
        return;
      }

      res.status(204).send();
    } catch (error) {
      res.status(500).json({ error: 'Failed to delete incident' });
    }
  }
}

