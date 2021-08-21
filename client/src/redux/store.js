import { combineReducers, applyMiddleware, createStore } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import loadingReducer from "./reducers/loadingReducers";
import messageReducer from "./reducers/messageReducers";
import categoryReducer from "./reducers/categoryReducers";
import jobReducer from "./reducers/jobReducers";
import userReducer from "./reducers/userReducers";

const reducer = combineReducers({
  loading: loadingReducer,
  messages: messageReducer,
  categories: categoryReducer,
  jobs: jobReducer,
  users: userReducer
});

const initialState = {};

const middleware = [thunk];

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
