import { SET_EXPORT_REPORT, RESET_EXPORT_REPORT } from "./actions";

const initialState = {
  data: null, // full API response
  results: [], // table rows
  totalItems: 0, // pagination count
};

const exportReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_EXPORT_REPORT: {
      const payload = action.payload || {};

      return {
        ...state,
        data: payload,
        results: payload.Results || [],
        totalItems: payload.table_count || 0,
      };
    }

    case RESET_EXPORT_REPORT:
      return initialState;

    default:
      return state;
  }
};

export default exportReducer;
