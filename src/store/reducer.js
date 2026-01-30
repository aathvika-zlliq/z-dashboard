import { combineReducers } from "redux";

// reducer import
import settingsReducer from "./settingsReducer";
import userDetailsReducer from "./userDetailsReducer";
import dashboardReducer from "./dashboardReducer";
import smtpReducer from "./smtpReducer";
import campaignReducer from "./campaignReducer";

// ===========================|| COMBINE REDUCER ||=========================== //

const reducers = combineReducers({
  settingsReducer,
  dashboardReducer,
  userDetailsReducer,
  smtpReducer,
  campaignReducer,
});

export default reducers;
