
import type { JobApplication } from '../features/jobs/jobTypes'

const STORAGE_KEY = 'job-track-applications'

export function saveJobs(jobs: JobApplication[]): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(jobs))
}

export function loadJobs(): JobApplication[] {
  const savedJobs = localStorage.getItem(STORAGE_KEY)

  if (savedJobs === null) {
    return []
  }

  return JSON.parse(savedJobs) as JobApplication[]
}
