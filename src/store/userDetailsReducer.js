import { LOADING_START, LOADING_STOP, SET_USER_DETAILS } from "./actions";

const initialState = {
  isLoading: false,
  details: null, // full user profile
};

const userDetailsReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOADING_START:
      return { ...state, isLoading: true };

    case LOADING_STOP:
      return { ...state, isLoading: false };

    case SET_USER_DETAILS:
      return {
        ...state,
        details: action.payload,
      };

    default:
      return state;
  }
};

export default userDetailsReducer;
