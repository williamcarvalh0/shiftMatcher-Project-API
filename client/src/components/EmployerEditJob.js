import React, { useState, useEffect, Fragment } from 'react'
import axios from 'axios'
import EmployerHeader from './EmployerHeader'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { getJob } from '../redux/actions/jobActions'
import { getCategories } from '../redux/actions/categoryActions'

const EmployerEditJob = ({ match, history }) => {
  /****************************
   * PARAMS
   ***************************/
  const jobId = match.params.jobId

  /****************************
   * REDUX GLOBAL STATE PROPERTIES
   ***************************/
  const dispatch = useDispatch()
  const { job } = useSelector((state) => state.jobs)
  const { categories } = useSelector((state) => state.categories)

  /****************************
   * COMPONENT STATE PROPERTIES
   ***************************/
  const [jobImage, setJobImage] = useState(null)
  const [jobName, setJobName] = useState('')
  const [jobDesc, setJobDesc] = useState('')
  const [jobPrice, setJobPrice] = useState('')
  const [jobCategory, setJobCategory] = useState('')
  const [jobQty, setJobQty] = useState('')

  /****************************
   * LIFECYCLE METHODS
   ***************************/
  useEffect(() => {
    if (!job) {
      dispatch(getJob(jobId))
      dispatch(getCategories())
    } else {
      setJobImage(job.fileName)
      setJobName(job.jobName)
      setJobDesc(job.jobDesc)
      setJobPrice(job.jobPrice)
      setJobCategory(job.jobCategory)
      setJobQty(job.jobQty)
    }
  }, [dispatch, jobId, job])

  /****************************
   * EVENT HANDLERS
   ***************************/
  const handleImageUpload = (e) => {
    const image = e.target.files[0]
    setJobImage(image)
  }

  const handleJobSubmit = async (e) => {
    e.preventDefault()

    const formData = new FormData()
    formData.append('jobImage', jobImage)
    formData.append('jobName', jobName)
    formData.append('jobDesc', jobDesc)
    formData.append('jobPrice', jobPrice)
    formData.append('jobCategory', jobCategory)
    formData.append('jobQty', jobQty)

    const config = {
      headers: { 
        'Content-Type': 'multipart/form-data',
      },
    }

    await axios
      .put(`/api/job/${jobId}`, formData, config)
      .then((res) => {
        history.push('/employer/dashboard')
      })
      .catch((err) => {
        console.log(err)
      })
  }

  /****************************
   * RENDERER
   ***************************/
  return (
    <Fragment>
      <EmployerHeader />
      <div className='container my-3'>
        <div className='row'>
          <div className='col-md-8 mx-auto'>
            <Link to='/employer/dashboard'>
              <span className='fas fa-arrow-left'> Go Back</span>
            </Link>
            <div>
              <br />
              <div className='modal-content'>
                <form onSubmit={handleJobSubmit}>
                  <div className='modal-header bg-warning text-white'>
                    <h5 className='modal-title'>Update Job</h5>
                  </div>
                  <div className='modal-body my-2'>
                    <Fragment>
                      <label className='btn btn-dark mr-4'>
                        Choose file
                        <input
                          type='file'
                          name='jobImage'
                          accept='images/*'
                          hidden
                          onChange={handleImageUpload}
                        />
                      </label>
                      {jobImage && jobImage.name ? (
                        <span className='badge badge-secondary'>
                          {jobImage.name}
                        </span>
                      ) : jobImage ? (
                        <img
                          className='img-thumbnail'
                          style={{
                            width: '120px',
                            height: '80px',
                          }}
                          src={`/server/images/${jobImage}`}
                          alt='job'
                        />
                      ) : null}

                      <div className='form-group'>
                        <label className='text-secondary'>Name</label>
                        <input
                          type='text'
                          className='form-control'
                          name='jobName'
                          value={jobName}
                          onChange={(e) => setJobName(e.target.value)}
                        />
                      </div>
                      <div className='form-group'>
                        <label className='text-secondary'>Description</label>
                        <textarea
                          className='form-control'
                          rows='3'
                          name='jobDesc'
                          value={jobDesc}
                          onChange={(e) => setJobDesc(e.target.value)}
                        ></textarea>
                      </div>
                      <div className='form-group'>
                        <label className='text-secondary'>Price</label>
                        <input
                          type='text'
                          className='form-control'
                          name='jobPrice'
                          value={jobPrice}
                          onChange={(e) => setJobPrice(e.target.value)}
                        />
                      </div>
                      <div className='form-row'>
                        <div className='form-group col-md-6'>
                          <label className='text-secondary'>Category</label>
                          <select
                            className='custom-select mr-sm-2'
                            name='jobCategory'
                            value={jobCategory}
                            onChange={(e) => setJobCategory(e.target.value)}
                          >
                            <option value=''>Choose one...</option>
                            {categories &&
                              categories.map((c) => (
                                <option key={c._id} value={c._id}>
                                  {c.category}
                                </option>
                              ))}
                          </select>
                        </div>

                        <div className='form-group col-md-6'>
                          <label className='text-secondary'>Quantity</label>
                          <input
                            type='number'
                            className='form-control'
                            min='0'
                            max='1000'
                            name='jobQty'
                            value={jobQty}
                            onChange={(e) => setJobQty(e.target.value)}
                          />
                        </div>
                      </div>
                    </Fragment>
                  </div>
                  <div className='modal-footer'>
                    <button
                      type='submit'
                      className='btn btn-warning text-white'
                    >
                      Submit
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  )
}

export default EmployerEditJob
