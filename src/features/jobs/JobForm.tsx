import { useState } from "react";
import { useAppDispatch } from "../../app/hooks";
import { addJob, updateJob } from "./jobSlice";
import type { JobApplication, JobStatus } from "./jobTypes";

interface JobFormProps {
  editingJob: JobApplication | null;
  onFinishEditing: () => void;
}

function JobForm({ editingJob, onFinishEditing }: JobFormProps) {
  const dispatch = useAppDispatch();
  const [company, setCompany] = useState(editingJob?.company ?? "");
  const [position, setPosition] = useState(editingJob?.position ?? "");
  const [status, setStatus] = useState<JobStatus>(
    editingJob?.status ?? "Applied",
  );
  const [error, setError] = useState("");
  const [notes, setNotes] = useState(editingJob?.notes ?? "");
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!company.trim() || !position.trim()) {
      setError("Company and position are required.");
      return;
    }

    setError("");

    if (editingJob) {
      dispatch(
        updateJob({
          ...editingJob,
          company: company.trim(),
          position: position.trim(),
          notes: notes.trim(),
          status,
        }),
      );

      onFinishEditing();
    } else {
      dispatch(
        addJob({
          id: crypto.randomUUID(),
          company: company.trim(),
          position: position.trim(),
          notes: notes.trim(),
          location: "Bangalore",
          status,
          appliedDate: new Date().toISOString(),
        }),
      );
    }

    setCompany("");
    setPosition("");
    setStatus("Applied");
    setNotes('')
  };

  return (
    <form onSubmit={handleSubmit} className="job-form">
      <input
        className="form-control"
        value={company}
        onChange={(event) => setCompany(event.target.value)}
        placeholder="Company"
      />

      <input
        className="form-control"
        value={position}
        onChange={(event) => setPosition(event.target.value)}
        placeholder="Position"
      />

      <select
        className="form-control"
        value={status}
        onChange={(event) => setStatus(event.target.value as JobStatus)}
      >
        <option value="Applied">Applied</option>
        <option value="Interview">Interview</option>
        <option value="Offer">Offer</option>
        <option value="Rejected">Rejected</option>
      </select>
      
<textarea
  className="form-control"
  value={notes}
  onChange={(event) => setNotes(event.target.value)}
  placeholder="Notes (recruiter details, interview feedback, etc.)"
  rows={3}
/>

      {error && <p className="form-error">{error}</p>}
      <button type="submit" className="submit-button">
        {editingJob ? "Update Job" : "Add Job"}
      </button>

      {editingJob && (
        <button
          type="button"
          className="cancel-button"
          onClick={() => {
            setCompany("");
            setPosition("");
            setStatus("Applied");
            onFinishEditing();
          }}
        >
          Cancel
        </button>
      )}
    </form>
  );
}

export default JobForm;
