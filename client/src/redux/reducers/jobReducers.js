import { CREATE_JOB, DELETE_JOB, GET_JOB, GET_JOBS } from "../constants/jobConstants";

const INITIAL_STATE = {
  jobs: [],
};

const jobReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case CREATE_JOB:
      return {
        jobs: [...state.jobs, action.payload],
      };
    case GET_JOBS:
      return {
        jobs: [...action.payload],
      };
      case GET_JOB:
      return {
        job: action.payload,
      };
      case DELETE_JOB:
      return {
        jobs: state.jobs.filter(p => p._id !== action.payload._id),
      };
    default:
      return state;
  }
};

export default jobReducer;
