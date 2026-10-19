import { useAppDispatch, useAppSelector } from '../../app/hooks'
import { setStatusFilter } from './filterSlice'
import { selectStatusFilter } from './filterSelectors'
import type { JobStatusFilter } from './filterTypes'

function JobFilter() {
  const dispatch = useAppDispatch()
  const status = useAppSelector(selectStatusFilter)

  const handleChange = (
    event: React.ChangeEvent<HTMLSelectElement>,
  ) => {
    dispatch(
      setStatusFilter(event.target.value as JobStatusFilter),
    )
  }

  return (
    <select value={status} onChange={handleChange}>
      <option value="All">All</option>
      <option value="Applied">Applied</option>
      <option value="Interview">Interview</option>
      <option value="Offer">Offer</option>
      <option value="Rejected">Rejected</option>
    </select>
  )
}

export default JobFilter