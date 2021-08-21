import axios from "axios";
import { START_LOADING, STOP_LOADING } from "../constants/loadingConstants";
import {
  SHOW_ERROR_MESSAGE,
} from "../constants/messageConstants";
import {
  GET_USERS, GET_USER
} from "../constants/userConstants";

export const getUser= (userId) => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING });
    const response = await axios.get(`/api/auth/${userId}`);
    dispatch({ type: STOP_LOADING });
    dispatch({
      type: GET_USER,
      payload: response.data,
    });
  } catch (err) {
    console.log("getUsers api error: ", err);
    dispatch({ type: STOP_LOADING });
    dispatch({
      type: SHOW_ERROR_MESSAGE,
      payload: err.response.data.errorMessage,
    });
  }
};

export const getUsers = () => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING });
    const response = await axios.get("/api/auth");
    dispatch({ type: STOP_LOADING });
    dispatch({
      type: GET_USERS,
      payload: response.data.jobs,
    });
  } catch (err) {
    console.log("getUsers api error: ", err);
    dispatch({ type: STOP_LOADING });
    dispatch({
      type: SHOW_ERROR_MESSAGE,
      payload: err.response.data.errorMessage,
    });
  }
};

