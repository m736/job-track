import { useAppDispatch, useAppSelector } from '../../app/hooks'
import { selectJobCount, selectJobs } from './jobSelectors'
import { addJob, deleteJob } from './jobSlice'

function JobTest() {
  const dispatch = useAppDispatch()

  const jobs = useAppSelector(selectJobs)
  const jobCount=useAppSelector(selectJobCount)

  const handleAddJob = () => {
    dispatch(
      addJob({
        id: crypto.randomUUID(),
        company: 'Google',
        position: 'React Developer',
        location: 'Bangalore',
        status: 'Applied',
        appliedDate: '2026-10-06',
      }),
    )
  }
  const handleDeleteJob=(id:string)=>{
    dispatch(deleteJob(id))
  }

  return (
    <div>
      <button onClick={handleAddJob}>Add Job</button>

      <h2>Applications: {jobCount}</h2>

      {jobs.map((job) => (
        <div key={job.id}>
          <p>{job.company}</p>
          <p>{job.position}</p>
          <button onClick={()=>handleDeleteJob(job.id)}>Delete</button>
        </div>
      ))}
    </div>
  )
}

export default JobTest