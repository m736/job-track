import { useState } from "react";
import JobList from "./features/jobs/JobList";
import JobForm from "./features/jobs/JobForm";
import type { JobApplication } from "./features/jobs/jobTypes";
import JobFilter from "./features/filters/JobFilter";
import JobSearch from "./features/filters/JobSearch";
import JobSort from "./features/filters/JobSort";
import Dashboard from "./features/dashboard/Dashboard";
import "./App.css";
function App() {
  const [editingJob, setEditingJob] = useState<JobApplication | null>(null);

  return (
    <>
      <main className="app-container">
        <header className="app-header">
          <h1>Job Tracker</h1>
          <p>Manage your job applications in one place.</p>
        </header>

        <Dashboard />
        <section className="app-section ">
          
          <JobForm
            key={editingJob?.id ?? "new-job"}
            editingJob={editingJob}
            onFinishEditing={() => setEditingJob(null)}
          />
        </section>
        <section className="app-section">
          <div className="job-controls">
            <JobFilter />
            <JobSearch />
            <JobSort />
          </div>
          <JobList onEdit={setEditingJob} />
        </section>
      </main>
    </>
  );
}

export default App;
