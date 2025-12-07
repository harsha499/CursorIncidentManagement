import { Router } from 'express';
import { IncidentController } from '../controllers/incidentController';

const router = Router();

router.get('/', IncidentController.getAllIncidents);
router.get('/:id', IncidentController.getIncidentById);
router.post('/', IncidentController.createIncident);
router.put('/:id', IncidentController.updateIncident);
router.delete('/:id', IncidentController.deleteIncident);

export default router;

