import axios from 'axios'
import { START_LOADING, STOP_LOADING } from '../constants/loadingConstants'
import {
  SHOW_ERROR_MESSAGE,
  SHOW_SUCCESS_MESSAGE,
} from '../constants/messageConstants'
import {
  CREATE_JOB,
  GET_JOBS,
  DELETE_JOB,
  GET_JOB,
} from '../constants/jobConstants'

export const createJob = (formData) => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING })
    const response = await axios.post('/api/job', formData)
    dispatch({ type: STOP_LOADING })
    dispatch({
      type: SHOW_SUCCESS_MESSAGE,
      payload: response.data.successMessage,
    })
    dispatch({
      type: CREATE_JOB,
      payload: response.data.job,
    })
  } catch (err) {
    console.log('createJob api error: ', err)
    dispatch({ type: STOP_LOADING })
    dispatch({
      type: SHOW_ERROR_MESSAGE,
      payload: err.response.data.errorMessage,
    })
  }
}

export const getJob = (jobId) => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING })
    const response = await axios.get(`/api/job/${jobId}`)
    dispatch({ type: STOP_LOADING })
    dispatch({
      type: GET_JOB,
      payload: response.data,
    })
  } catch (err) {
    console.log('getJobs api error: ', err)
    dispatch({ type: STOP_LOADING })
    dispatch({
      type: SHOW_ERROR_MESSAGE,
      payload: err.response.data.errorMessage,
    })
  }
}

export const getJobs = () => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING })
    const response = await axios.get('/api/job')
    dispatch({ type: STOP_LOADING })
    dispatch({
      type: GET_JOBS,
      payload: response.data.jobs,
    })
  } catch (err) {
    console.log('getJobs api error: ', err)
    dispatch({ type: STOP_LOADING })
    dispatch({
      type: SHOW_ERROR_MESSAGE,
      payload: err.response.data.errorMessage,
    })
  }
}

export const deleteJob = (jobId) => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING })
    const response = await axios.delete(`/api/job/${jobId}`)
    dispatch({ type: STOP_LOADING })
    dispatch({
      type: DELETE_JOB,
      payload: response.data,
    })
  } catch (err) {
    console.log('deleteJob api error: ', err)
    dispatch({ type: STOP_LOADING })
    dispatch({
      type: SHOW_ERROR_MESSAGE,
      payload: err.response.data.errorMessage,
    })
  }
}
