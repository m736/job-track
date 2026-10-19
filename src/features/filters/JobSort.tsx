
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import { setSortorder } from './filterSlice'
import { selectSortOrder } from './filterSelectors'
import type { JobSortOrder } from './filterTypes'

function JobSort() {
  const dispatch = useAppDispatch()
  const sortOrder = useAppSelector(selectSortOrder)

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    dispatch(setSortorder(event.target.value as JobSortOrder))
  }

  return (
    <select
      value={sortOrder}
      onChange={handleChange}
      aria-label="Sort job applications"
    >
      <option value="newest">Newest first</option>
      <option value="oldest">Oldest first</option>
    </select>
  )
}

export default JobSort
