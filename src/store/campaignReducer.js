import { SET_LIST_OF_CAMPAIGNS } from "./actions";

const initialState = {
  campaigns: [],
};

const dashboardReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_LIST_OF_CAMPAIGNS:
      return {
        ...state,
        campaigns: action.payload,
      };

    default:
      return state;
  }
};

export default dashboardReducer;
