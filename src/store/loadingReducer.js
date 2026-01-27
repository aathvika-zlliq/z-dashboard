import { ERROR, LOADING_START, LOADING_STOP } from "./actions";

const initialState = {
  loading: false,
  error: '',
};


export const loadingReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOADING_START:
      return { ...state, loading: true, error: '' }; // Clear error when starting load
    case LOADING_STOP:
      return { ...state, loading: false };
    case ERROR:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};
