export type JobStatus =
  | 'Applied'
  | 'Interview'
  | 'Offer'
  | 'Rejected'

export interface JobApplication {
  id: string
  company: string
  position: string
  location: string
  status: JobStatus
  appliedDate: string
  salary?: number
  jobUrl?: string
  description?: string
  notes?: string
}