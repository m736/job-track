import type { JobStatus } from '../jobs/jobTypes'

export type JobStatusFilter = JobStatus | 'All'
export type JobSortOrder = 'newest' | 'oldest'
export interface FilterState {
  status: JobStatusFilter
  search: string
  sortOrder: JobSortOrder
}