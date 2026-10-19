
import { describe, it, expect, vi, afterEach } from 'vitest'
import { cleanup, render, screen } from '@testing-library/react'
import { Provider } from 'react-redux'
import { configureStore } from '@reduxjs/toolkit'
import jobReducer, { jobsAdapter } from '../jobs/jobSlice'
import type { JobApplication } from '../jobs/jobTypes'
import filterReducer from '../filters/filterSlice'
import Dashboard from './Dashboard'

const jobs: JobApplication[] = [
  {
    id: '1',
    company: 'Google',
    position: 'Frontend Developer',
    location: 'Bangalore',
    status: 'Applied',
    appliedDate: '2026-10-10',
  },
  {
    id: '2',
    company: 'Microsoft',
    position: 'React Developer',
    location: 'Bangalore',
    status: 'Interview',
    appliedDate: '2026-10-11',
  },
  {
    id: '3',
    company: 'Amazon',
    position: 'UI Developer',
    location: 'Bangalore',
    status: 'Offer',
    appliedDate: '2026-10-12',
  },
  {
    id: '4',
    company: 'Infosys',
    position: 'React Developer',
    location: 'Bangalore',
    status: 'Rejected',
    appliedDate: '2026-10-13',
  },
]

const preloadedState = {
  jobs: jobsAdapter.setAll(
    jobsAdapter.getInitialState({
      loading: false,
      error: null as string | null,
    }),
    jobs,
  ),
  filters: {
    status: 'All' as const,
    search: '',
    sortOrder: 'newest' as const,
  },
}

function renderDashboard() {
  const store = configureStore({
    reducer: {
      jobs: jobReducer,
      filters: filterReducer,
    },
    preloadedState,
  })

  return render(
    <Provider store={store}>
      <Dashboard />
    </Provider>,
  )
}

describe('Dashboard', () => {
  afterEach(() => {
    cleanup()
    vi.restoreAllMocks()
  })

  it('should display the dashboard heading', () => {
    renderDashboard()

    expect(
      screen.getByRole('heading', { name: 'Dashboard' }),
    ).toBeTruthy()
  })

  it('should display the correct application counts', () => {
    renderDashboard()

    expect(screen.getByText('Total Applications')).toBeTruthy()
    expect(screen.getByText('Interviews')).toBeTruthy()
    expect(screen.getByText('Offers')).toBeTruthy()
    expect(screen.getByText('Rejected')).toBeTruthy()

    const countValues = screen
      .getAllByText(/^[0-9]+$/)
      .map((element) => element.textContent)

    expect(countValues).toEqual(['4', '1', '1', '1'])
  })
})
