import React from 'react'
import Card from './Card'

// Redux
import { useSelector } from 'react-redux'

const EmployerBody = () => {
  const { jobs } = useSelector((state) => state.jobs)

  return (
    <div className='container'>
      <div className='row'>
        <div className='card-deck'>
          {jobs &&
            jobs.map((job) => (
              <Card key={job._id} job={job} />
            ))}
        </div>
      </div>
    </div>
  )
}

export default EmployerBody
