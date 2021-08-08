import React from 'react'
import { Link } from 'react-router-dom'

// Redux
import { useDispatch } from 'react-redux'
import { deleteJob } from '../redux/actions/jobActions'

const Card = ({ job }) => {
  const dispatch = useDispatch()

  return (
    <div className='col-md-4 my-3'>
      <div className='card h-100'>
        <a href='#!'>
          <img
            className='img-fluid w-60'
            src={`/server/images/${job.fileName}`}
            alt='job'
          />
        </a>
        <div className='card-body text-center'>
          <h5>{job.jobName}</h5>
          <hr />
          <h6 className='mb-3'>
            <span className='text-secondary mr-2'>
              {job.jobPrice.toLocaleString('en-UK', {
                style: 'currency',
                currency: 'EUR',
              })}
            </span>
          </h6>
          <p>
            {job.jobDesc.length > 60
              ? job.jobDesc.substring(0, 60) + '...'
              : job.jobDesc.substring(0, 60)}
          </p>
          <Link
            to={`/employer/edit/job/${job._id}`}
            type='button'
            className='btn btn-secondary btn-sm mr-1 my-1'
          >
            <i className='far fa-edit pr-1'></i>
            Edit
          </Link>
          <button
            type='button'
            className='btn btn-danger btn-sm'
            onClick={() => dispatch(deleteJob(job._id))}
          >
            <i className='far fa-trash-alt pr-1'></i>
            Delete
          </button>
        </div>
      </div>
    </div>
  )
}

export default Card
