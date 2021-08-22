import React, { useState } from 'react'

const EmployeeCard = ({ job }) => {
  

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
          <h6 className='mb-3'>
            <span>
              {job.jobQty > 0 ? `Vacancy: ${job.jobQty}` : 'No more vacancy'}
            </span>
          </h6>
          <p>
            {job.jobDesc.length > 60
              ? job.jobDesc.substring(0, 60) + '...'
              : job.jobDesc.substring(0, 60)}
          </p>

          {job.jobQty > 0 ? (
            <button type='button' className='btn btn-info btn-sm' >
              Apply
            </button>
          ) : (
            <button type='button' className='btn btn-info btn-sm' disabled>
              Apply
            </button>
          )}
        </div>
      </div>
    </div>
  )
}

export default EmployeeCard
