import React, { Fragment, useState } from 'react'
import isEmpty from 'validator/lib/isEmpty'
import { showErrorMsg, showSuccessMsg } from '../helpers/message'
import { showLoading } from '../helpers/loading'

// Redux
import { useSelector, useDispatch } from 'react-redux'
import { clearMessages } from '../redux/actions/messageActions'
import { createJob } from '../redux/actions/jobActions'

const EmployerJobModal = () => {
  /*************************************
   * REDUX GLOBAL STATE PROPERTIES
   ************************************/
  const { loading } = useSelector((state) => state.loading)
  const { successMsg, errorMsg } = useSelector((state) => state.messages)
  const { categories } = useSelector((state) => state.categories)

  const dispatch = useDispatch()
  /********************************
   * COMPONENT STATE PROPERTIES
   *********************************/
  const [employeeSideError, setEmployeeSideError] = useState('')
  const [jobData, setJobData] = useState({
    jobImage: null,
    jobName: '',
    jobDesc: '',
    jobPrice: '',
    jobCategory: '',
    jobQty: '',
  })

  const { jobImage, jobName, jobDesc, jobPrice, jobCategory, jobQty } = jobData

  /**********************
   * EVENT HANDLERS
   * *******************/
  const handleMessages = (evt) => {
    dispatch(clearMessages())
    setEmployeeSideError('')
  }

  const handleJobImage = (evt) => {
    console.log(evt.target.files[0])
    setJobData({
      ...jobData,
      [evt.target.name]: evt.target.files[0],
    })
  }

  const handleJobChange = (evt) => {
    setJobData({
      ...jobData,
      [evt.target.name]: evt.target.value,
    })
  }

  const handleJobSubmit = (evt) => {
    evt.preventDefault()

    if (jobImage === null) {
      setEmployeeSideError('Please select an image')
    } else if (isEmpty(jobName) || isEmpty(jobDesc) || isEmpty(jobPrice)) {
      setEmployeeSideError('All field are required')
    } else if (isEmpty(jobCategory)) {
      setEmployeeSideError('Please select a category')
    } else if (isEmpty(jobQty)) {
      setEmployeeSideError('Please insert a quantity')
    } else {
      let formData = new FormData()
      formData.append('jobImage', jobImage)
      formData.append('jobName', jobName)
      formData.append('jobDesc', jobDesc)
      formData.append('jobPrice', jobPrice)
      formData.append('jobCategory', jobCategory)
      formData.append('jobQty', jobQty)

      dispatch(createJob(formData))
      setJobData({
        jobImage: null,
        jobName: '',
        jobDesc: '',
        jobPrice: '',
        jobCategory: '',
        jobQty: '',
      })
    }
  }

  /***************
   * RENDERER
   **************/
  return (
    <div id='addJobModal' className='modal' onClick={handleMessages}>
      <div className='modal-dialog modal-dialog-centered modal-lg'>
        <div className='modal-content'>
          <form onSubmit={handleJobSubmit}>
            <div className='modal-header bg-warning'>
              <h5 className='modal-title'>Add Job</h5>
              <button className='close' data-dismiss='modal'>
                <span>
                  <i className='fas fa-times'></i>
                </span>
              </button>
            </div>
            <div className='modal-body my-2'>
              {employeeSideError && showErrorMsg(employeeSideError)}
              {errorMsg && showErrorMsg(errorMsg)}
              {successMsg && showSuccessMsg(successMsg)}

              {loading ? (
                <div className='text-center'>{showLoading()}</div>
              ) : (
                <Fragment>
                  <div className='form-group'>
                    <label className='text-secondary'>Name:</label>
                    <input
                      type='text'
                      className='form-control'
                      name='jobName'
                      value={jobName}
                      onChange={handleJobChange}
                    />
                  </div>

                  <div className='form-group'>
                    <label className='text-secondary'>Description:</label>
                    <textarea
                      rows='3'
                      className='form-control'
                      name='jobDesc'
                      value={jobDesc}
                      onChange={handleJobChange}
                    ></textarea>
                  </div>

                  <div className='form-group'>
                    <label className='text-secondary'>Price:</label>
                    <input
                      type='text'
                      className='form-control'
                      name='jobPrice'
                      value={jobPrice}
                      onChange={handleJobChange}
                    />
                  </div>

                  <div className='form-row'>
                    <div className='form-group col-md-6'>
                      <label className='text-secondary'>Category:</label>
                      <select
                        className='custom-select mr-sm-2'
                        name='jobCategory'
                        onChange={handleJobChange}
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
                      <label className='text-secondary'>Quantity:</label>
                      <input
                        type='number'
                        className='form-control'
                        min='0'
                        max='100'
                        name='jobQty'
                        value={jobQty}
                        onChange={handleJobChange}
                      />
                    </div>

                    <label className='text-secondary'>Image:</label>
                    <div className='custom-file mb-2'>
                      <input
                        type='file'
                        className='custom-file-input'
                        name='jobImage'
                        onChange={handleJobImage}
                      />
                      <label className='custom-file-label'>Choose file</label>
                    </div>
                  </div>
                </Fragment>
              )}
            </div>
            <div className='modal-footer'>
              <button className='btn btn-secondary' data-dismiss='modal'>
                Close
              </button>
              <button type='submit' className='btn btn-warning'>
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default EmployerJobModal
