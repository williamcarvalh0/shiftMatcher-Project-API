import { GET_USERS, GET_USER } from "../constants/userConstants";

const INITIAL_STATE = {
  users: [],
};

const userReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
   
    case GET_USERS:
      return {
        users: [...action.payload],
      };
      case GET_USER:
      return {
        user: action.payload,
      };
    default:
      return state;
  }
};

export default userReducer;
