
import { describe, it, expect, vi, afterEach } from 'vitest'
import { cleanup, fireEvent, render, screen } from '@testing-library/react'
import JobCard from './JobCard'
import type { JobApplication } from './jobTypes'

const job: JobApplication = {
  id: '1',
  company: 'Google',
  position: 'Frontend Developer',
  location: 'Bangalore',
  status: 'Applied',
  appliedDate: '2026-10-14',
  notes: 'Prepare for technical interview',
}

describe('JobCard', () => {
  afterEach(() => {
    cleanup()
    vi.restoreAllMocks()
  })

  it('should display company, position, and status', () => {
    render(
      <JobCard
        job={job}
        onDelete={vi.fn()}
        onEdit={vi.fn()}
      />,
    )

    expect(screen.getByRole('heading', { name: 'Google' })).toBeTruthy()
    expect(screen.getByText('Frontend Developer')).toBeTruthy()
    expect(screen.getByText('Applied')).toBeTruthy()
  })

  it('should display job location and notes', () => {
    render(
      <JobCard
        job={job}
        onDelete={vi.fn()}
        onEdit={vi.fn()}
      />,
    )

    expect(screen.getByText('Bangalore')).toBeTruthy()
    expect(screen.getByText(/Prepare for technical interview/)).toBeTruthy()
  })

  it('should call onEdit with the job when Edit is clicked', () => {
    const onEdit = vi.fn()

    render(
      <JobCard
        job={job}
        onDelete={vi.fn()}
        onEdit={onEdit}
      />,
    )

    fireEvent.click(screen.getByRole('button', { name: 'Edit' }))

    expect(onEdit).toHaveBeenCalledWith(job)
  })

  it('should call onDelete when deletion is confirmed', () => {
    const onDelete = vi.fn()
    vi.spyOn(window, 'confirm').mockReturnValue(true)

    render(
      <JobCard
        job={job}
        onDelete={onDelete}
        onEdit={vi.fn()}
      />,
    )

    fireEvent.click(screen.getByRole('button', { name: 'Delete' }))

    expect(window.confirm).toHaveBeenCalledWith(
      'Are you sure you want to delete Google?',
    )
    expect(onDelete).toHaveBeenCalledWith('1')
  })

  it('should not delete the job when deletion is cancelled', () => {
    const onDelete = vi.fn()
    vi.spyOn(window, 'confirm').mockReturnValue(false)

    render(
      <JobCard
        job={job}
        onDelete={onDelete}
        onEdit={vi.fn()}
      />,
    )

    fireEvent.click(screen.getByRole('button', { name: 'Delete' }))

    expect(onDelete).not.toHaveBeenCalled()
  })
})
