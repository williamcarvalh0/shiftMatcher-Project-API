import React from 'react'
import EmployeeCard from './EmployeeCard'

// Redux
import { useSelector } from 'react-redux'

const EmployeeBody = () => {
  const { jobs } = useSelector((state) => state.jobs)

  return (
    <div className='container'>
      <div className='row'>
        <div className='card-deck'>
          {jobs &&
            jobs.map((job) => (
              <EmployeeCard key={job._id} job={job} />
            ))}
        </div>
      </div>
    </div>
  )
}

export default EmployeeBody
