import {
  LOADING_START,
  LOADING_STOP,
  SET_DASHBOARD_STATISTICS,
} from "../store/actions";

const initialState = {
  loading: false, // will be controlled by LOADING_START / LOADING_STOP
  statistics: null,
};

export default function dashboardReducer(state = initialState, action) {
  switch (action.type) {
    case LOADING_START:
      return { ...state, loading: true };
    case LOADING_STOP:
      return { ...state, loading: false };
    case SET_DASHBOARD_STATISTICS:
      return { ...state, statistics: action.payload };
    default:
      return state;
  }
}
