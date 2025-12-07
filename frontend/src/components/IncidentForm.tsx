import { useState, FormEvent } from 'react';
import { CreateIncidentDto, UpdateIncidentDto, Severity, Environment, Status } from '../types/incident';
import './IncidentForm.css';

interface IncidentFormProps {
  initialData?: Partial<CreateIncidentDto>;
  onSubmit: (data: CreateIncidentDto | UpdateIncidentDto) => Promise<void>;
  onCancel?: () => void;
  submitLabel?: string;
}

export default function IncidentForm({
  initialData,
  onSubmit,
  onCancel,
  submitLabel = 'Create Incident',
}: IncidentFormProps) {
  const [formData, setFormData] = useState<CreateIncidentDto>({
    teamName: initialData?.teamName || '',
    issueDescription: initialData?.issueDescription || '',
    severity: initialData?.severity || 'Medium',
    environment: initialData?.environment || 'Development',
    status: initialData?.status || 'Open',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const validate = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.teamName.trim()) {
      newErrors.teamName = 'Team name is required';
    }

    if (!formData.issueDescription.trim()) {
      newErrors.issueDescription = 'Issue description is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!validate()) {
      return;
    }

    setIsSubmitting(true);
    try {
      await onSubmit(formData);
    } catch (error) {
      console.error('Form submission error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="incident-form">
      <div className="form-group">
        <label htmlFor="teamName">
          Team Name <span className="required">*</span>
        </label>
        <input
          id="teamName"
          name="teamName"
          type="text"
          value={formData.teamName}
          onChange={handleChange}
          className={errors.teamName ? 'error' : ''}
          placeholder="Enter team name"
        />
        {errors.teamName && <span className="error-message">{errors.teamName}</span>}
      </div>

      <div className="form-group">
        <label htmlFor="issueDescription">
          Issue Description <span className="required">*</span>
        </label>
        <textarea
          id="issueDescription"
          name="issueDescription"
          value={formData.issueDescription}
          onChange={handleChange}
          className={errors.issueDescription ? 'error' : ''}
          placeholder="Describe the issue..."
          rows={5}
        />
        {errors.issueDescription && (
          <span className="error-message">{errors.issueDescription}</span>
        )}
      </div>

      <div className="form-row">
        <div className="form-group">
          <label htmlFor="severity">Severity</label>
          <select
            id="severity"
            name="severity"
            value={formData.severity}
            onChange={handleChange}
          >
            <option value="Critical">Critical</option>
            <option value="High">High</option>
            <option value="Medium">Medium</option>
            <option value="Low">Low</option>
            <option value="Info">Info</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="environment">Environment</label>
          <select
            id="environment"
            name="environment"
            value={formData.environment}
            onChange={handleChange}
          >
            <option value="Production">Production</option>
            <option value="Staging">Staging</option>
            <option value="Development">Development</option>
            <option value="Testing">Testing</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="status">Status</label>
          <select
            id="status"
            name="status"
            value={formData.status}
            onChange={handleChange}
          >
            <option value="Open">Open</option>
            <option value="In Progress">In Progress</option>
            <option value="Resolved">Resolved</option>
          </select>
        </div>
      </div>

      <div className="form-actions">
        {onCancel && (
          <button type="button" onClick={onCancel} className="btn-secondary">
            Cancel
          </button>
        )}
        <button type="submit" className="btn-primary" disabled={isSubmitting}>
          {isSubmitting ? 'Submitting...' : submitLabel}
        </button>
      </div>
    </form>
  );
}

