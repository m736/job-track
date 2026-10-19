
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, fireEvent, cleanup } from '@testing-library/react'
import { Provider } from 'react-redux'
import { configureStore } from '@reduxjs/toolkit'
import jobReducer from './jobSlice'
import filterReducer from '../filters/filterSlice'
import JobForm from './JobForm'

function renderJobForm() {
  const store = configureStore({
    reducer: {
      jobs: jobReducer,
      filters: filterReducer,
    },
  })

  return {
    store,
    ...render(
      <Provider store={store}>
        <JobForm
          editingJob={null}
          onFinishEditing={vi.fn()}
        />
      </Provider>,
    ),
  }
}

describe('JobForm', () => {
  beforeEach(() => {
    cleanup()
  })

  it('should show an error when company and position are empty', () => {
    renderJobForm()

    fireEvent.click(screen.getByRole('button', { name: 'Add Job' }))

    expect(
      screen.getByText('Company and position are required.'),
    ).toBeTruthy()
  })

  it('should show an error when company is empty', () => {
    renderJobForm()

    fireEvent.change(screen.getByPlaceholderText('Position'), {
      target: { value: 'Frontend Developer' },
    })

    fireEvent.click(screen.getByRole('button', { name: 'Add Job' }))

    expect(
      screen.getByText('Company and position are required.'),
    ).toBeTruthy()
  })

  it('should show an error when position is empty', () => {
    renderJobForm()

    fireEvent.change(screen.getByPlaceholderText('Company'), {
      target: { value: 'Google' },
    })

    fireEvent.click(screen.getByRole('button', { name: 'Add Job' }))

    expect(
      screen.getByText('Company and position are required.'),
    ).toBeTruthy()
  })

  it('should add a job when valid details are entered', () => {
    const { store } = renderJobForm()

    fireEvent.change(screen.getByPlaceholderText('Company'), {
      target: { value: 'Google' },
    })

    fireEvent.change(screen.getByPlaceholderText('Position'), {
      target: { value: 'Frontend Developer' },
    })

    fireEvent.click(screen.getByRole('button', { name: 'Add Job' }))

   const jobs = Object.values(store.getState().jobs.entities)

expect(jobs).toHaveLength(1)
expect(jobs[0]?.company).toBe('Google')
expect(jobs[0]?.position).toBe('Frontend Developer')
  })
})
