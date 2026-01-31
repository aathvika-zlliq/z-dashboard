import { combineReducers } from "redux";

// reducer import
import settingsReducer from "./settingsReducer";
import userDetailsReducer from "./userDetailsReducer";
import dashboardReducer from "./dashboardReducer";
import smtpReducer from "./smtpReducer";
import campaignReducer from "./campaignReducer";
import exportReducer from "./exportReducer";

// ===========================|| COMBINE REDUCER ||=========================== //

const reducers = combineReducers({
  settingsReducer,
  dashboardReducer,
  userDetailsReducer,
  smtpReducer,
  campaignReducer,
  exportReducer,
});

export default reducers;
