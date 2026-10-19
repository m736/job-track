
import { memo } from "react";
import type { JobApplication } from "./jobTypes";
interface JobCardProps {
  job: JobApplication;
  onDelete: (id: string) => void;
  onEdit: (job: JobApplication) => void;
}

function JobCard({ job, onDelete, onEdit }: JobCardProps) {
  return (
    <article className="job-card">
      <div className="job-card-content">
        <h3>{job.company}</h3>
        <p className="job-position">{job.position}</p>

        <span className={`job-status status-${job.status.toLowerCase()}`}>
          {job.status}
        </span>

        <p className="job-date">
          Applied on: {new Date(job.appliedDate).toLocaleDateString()}
        </p>

        {job.location && <p className="job-location">{job.location}</p>}
        {job.notes && (
  <p className="job-notes">
    <strong>Notes:</strong> {job.notes}
  </p>
)}
      </div>

      <div className="job-card-actions">
        <button
          type="button"
          className="edit-button"
          onClick={() => onEdit(job)}
        >
          Edit
        </button>

       <button
  type="button"
  className="delete-button"
  onClick={() => {
    const confirmed = window.confirm(
      `Are you sure you want to delete ${job.company}?`,
    )

    if (confirmed) {
      onDelete(job.id)
    }
  }}
>
  Delete
</button>
      </div>
    </article>
  );
}

export default memo(JobCard);
