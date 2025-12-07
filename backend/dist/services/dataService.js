"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.DataService = void 0;
const fs = __importStar(require("fs-extra"));
const path = __importStar(require("path"));
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
class DataService {
    static readData() {
        try {
            return fs.readJsonSync(DATA_FILE);
        }
        catch (error) {
            console.error('Error reading data file:', error);
            return [];
        }
    }
    static writeData(data) {
        try {
            fs.writeJsonSync(DATA_FILE, data, { spaces: 2 });
        }
        catch (error) {
            console.error('Error writing data file:', error);
            throw new Error('Failed to save data');
        }
    }
    static getAllIncidents() {
        return this.readData();
    }
    static getIncidentById(id) {
        const incidents = this.readData();
        return incidents.find(incident => incident.id === id);
    }
    static createIncident(incident) {
        const incidents = this.readData();
        incidents.push(incident);
        this.writeData(incidents);
        return incident;
    }
    static updateIncident(id, updates) {
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
    static deleteIncident(id) {
        const incidents = this.readData();
        const filtered = incidents.filter(incident => incident.id !== id);
        if (filtered.length === incidents.length) {
            return false; // Incident not found
        }
        this.writeData(filtered);
        return true;
    }
}
exports.DataService = DataService;
