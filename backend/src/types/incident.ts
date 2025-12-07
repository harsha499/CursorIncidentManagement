export type Severity = 'Critical' | 'High' | 'Medium' | 'Low' | 'Info';
export type Environment = 'Production' | 'Staging' | 'Development' | 'Testing';
export type Status = 'Open' | 'In Progress' | 'Resolved';

export interface Incident {
  id: string;
  teamName: string;
  issueDescription: string;
  severity: Severity;
  environment: Environment;
  status: Status;
  createdAt: string;
  updatedAt: string;
}

export interface CreateIncidentDto {
  teamName: string;
  issueDescription: string;
  severity: Severity;
  environment: Environment;
  status?: Status;
}

export interface UpdateIncidentDto {
  teamName?: string;
  issueDescription?: string;
  severity?: Severity;
  environment?: Environment;
  status?: Status;
}

