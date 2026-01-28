import { combineReducers } from "redux";

// reducer import
import settingsReducer from "./settingsReducer";
import userDetailsReducer from "./userDetailsReducer";
import dashboardReducer from "./dashboardReducer";

// ===========================|| COMBINE REDUCER ||=========================== //

const reducers = combineReducers({
  settingsReducer,
  dashboardReducer,
  userDetailsReducer,
});

export default reducers;
