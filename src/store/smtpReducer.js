import { SET_SEARCH_BY_SENDS } from "./actions";

const initialState = {
  data: null,
};

export default function smtpReducer(state = initialState, action) {
  switch (action.type) {
    case SET_SEARCH_BY_SENDS:
      return {
        ...state,
        data: action.payload,
      };
    default:
      return state;
  }
}
