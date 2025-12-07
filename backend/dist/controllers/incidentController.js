"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IncidentController = void 0;
const uuid_1 = require("uuid");
const dataService_1 = require("../services/dataService");
class IncidentController {
    static getAllIncidents(req, res) {
        try {
            let incidents = dataService_1.DataService.getAllIncidents();
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
                incidents = incidents.filter(inc => inc.teamName.toLowerCase().includes(searchLower) ||
                    inc.issueDescription.toLowerCase().includes(searchLower));
            }
            res.json(incidents);
        }
        catch (error) {
            res.status(500).json({ error: 'Failed to fetch incidents' });
        }
    }
    static getIncidentById(req, res) {
        try {
            const { id } = req.params;
            const incident = dataService_1.DataService.getIncidentById(id);
            if (!incident) {
                res.status(404).json({ error: 'Incident not found' });
                return;
            }
            res.json(incident);
        }
        catch (error) {
            res.status(500).json({ error: 'Failed to fetch incident' });
        }
    }
    static createIncident(req, res) {
        try {
            const dto = req.body;
            // Validation
            if (!dto.teamName || !dto.issueDescription || !dto.severity || !dto.environment) {
                res.status(400).json({ error: 'Missing required fields' });
                return;
            }
            const validSeverities = ['Critical', 'High', 'Medium', 'Low', 'Info'];
            const validEnvironments = ['Production', 'Staging', 'Development', 'Testing'];
            const validStatuses = ['Open', 'In Progress', 'Resolved'];
            if (!validSeverities.includes(dto.severity)) {
                res.status(400).json({ error: 'Invalid severity value' });
                return;
            }
            if (!validEnvironments.includes(dto.environment)) {
                res.status(400).json({ error: 'Invalid environment value' });
                return;
            }
            const now = new Date().toISOString();
            const incident = {
                id: (0, uuid_1.v4)(),
                teamName: dto.teamName,
                issueDescription: dto.issueDescription,
                severity: dto.severity,
                environment: dto.environment,
                status: dto.status || 'Open',
                createdAt: now,
                updatedAt: now
            };
            const created = dataService_1.DataService.createIncident(incident);
            res.status(201).json(created);
        }
        catch (error) {
            res.status(500).json({ error: 'Failed to create incident' });
        }
    }
    static updateIncident(req, res) {
        try {
            const { id } = req.params;
            const dto = req.body;
            // Validate enum values if provided
            if (dto.severity) {
                const validSeverities = ['Critical', 'High', 'Medium', 'Low', 'Info'];
                if (!validSeverities.includes(dto.severity)) {
                    res.status(400).json({ error: 'Invalid severity value' });
                    return;
                }
            }
            if (dto.environment) {
                const validEnvironments = ['Production', 'Staging', 'Development', 'Testing'];
                if (!validEnvironments.includes(dto.environment)) {
                    res.status(400).json({ error: 'Invalid environment value' });
                    return;
                }
            }
            if (dto.status) {
                const validStatuses = ['Open', 'In Progress', 'Resolved'];
                if (!validStatuses.includes(dto.status)) {
                    res.status(400).json({ error: 'Invalid status value' });
                    return;
                }
            }
            const updated = dataService_1.DataService.updateIncident(id, dto);
            if (!updated) {
                res.status(404).json({ error: 'Incident not found' });
                return;
            }
            res.json(updated);
        }
        catch (error) {
            res.status(500).json({ error: 'Failed to update incident' });
        }
    }
    static deleteIncident(req, res) {
        try {
            const { id } = req.params;
            const deleted = dataService_1.DataService.deleteIncident(id);
            if (!deleted) {
                res.status(404).json({ error: 'Incident not found' });
                return;
            }
            res.status(204).send();
        }
        catch (error) {
            res.status(500).json({ error: 'Failed to delete incident' });
        }
    }
}
exports.IncidentController = IncidentController;
