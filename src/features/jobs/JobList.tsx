import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { deleteJob } from "./jobSlice";
import JobCard from "./JobCard";
import type { JobApplication } from "./jobTypes";
import { selectFilteredJobs } from "../filters/filterSelectors";
import { memo, useCallback } from "react";
interface JobListProps {
  onEdit: (job: JobApplication) => void
}
function JobList({ onEdit }: JobListProps) {
  const dispatch = useAppDispatch();
  const jobs = useAppSelector(selectFilteredJobs);

const handleDeleteJob = useCallback((id: string) => {
  dispatch(deleteJob(id));
}, [dispatch]);


 
  return (
    <div  className="job-list">
      <h2>Job Applications</h2>

      {jobs.map((job) => (
        <JobCard
          key={job.id}
          job={job}
          onDelete={handleDeleteJob}
          onEdit={onEdit}
        />
      ))}
    </div>
  );
}

export default memo(JobList);
