import * as fs from 'fs-extra';
import * as path from 'path';
import { Incident } from '../types/incident';

// Resolve data directory - works in both dev (ts-node-dev) and production (compiled)
// In dev: __dirname = backend/src/services, so go up 2 levels to backend, then src/data
// In prod: __dirname = backend/dist/services, so go up 2 levels to backend, then src/data
const BACKEND_ROOT = path.resolve(__dirname, '../..');
const DATA_DIR = path.join(BACKEND_ROOT, 'src/data');
const DATA_FILE = path.join(DATA_DIR, 'incidents.json');

// Ensure data directory exists
fs.ensureDirSync(DATA_DIR);

// Initialize file if it doesn't exist
if (!fs.existsSync(DATA_FILE)) {
  fs.writeJsonSync(DATA_FILE, [], { spaces: 2 });
}

export class DataService {
  private static readData(): Incident[] {
    try {
      return fs.readJsonSync(DATA_FILE);
    } catch (error) {
      console.error('Error reading data file:', error);
      return [];
    }
  }

  private static writeData(data: Incident[]): void {
    try {
      fs.writeJsonSync(DATA_FILE, data, { spaces: 2 });
    } catch (error) {
      console.error('Error writing data file:', error);
      throw new Error('Failed to save data');
    }
  }

  static getAllIncidents(): Incident[] {
    return this.readData();
  }

  static getIncidentById(id: string): Incident | undefined {
    const incidents = this.readData();
    return incidents.find(incident => incident.id === id);
  }

  static createIncident(incident: Incident): Incident {
    const incidents = this.readData();
    incidents.push(incident);
    this.writeData(incidents);
    return incident;
  }

  static updateIncident(id: string, updates: Partial<Incident>): Incident | null {
    const incidents = this.readData();
    const index = incidents.findIndex(incident => incident.id === id);
    
    if (index === -1) {
      return null;
    }

    incidents[index] = {
      ...incidents[index],
      ...updates,
      updatedAt: new Date().toISOString()
    };

    this.writeData(incidents);
    return incidents[index];
  }

  static deleteIncident(id: string): boolean {
    const incidents = this.readData();
    const filtered = incidents.filter(incident => incident.id !== id);
    
    if (filtered.length === incidents.length) {
      return false; // Incident not found
    }

    this.writeData(filtered);
    return true;
  }
}

