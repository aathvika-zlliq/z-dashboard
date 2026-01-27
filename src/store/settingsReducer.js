import {
  LOADING_START,
  LOADING_STOP,
  RESET_MEMBER_UPDATED,
  SET_MEMBER_UPDATED,
  SET_SPIN_WHEEL_DATA,
  SET_USER,
  SET_USER_TOKEN,
} from "./actions";

const initialState = {
  isLoading: false,
  user: null,
  token: null,
  isMemberUpdated: false,
};

// eslint-disable-next-line default-param-last
const settingsReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOADING_START:
      return {
        ...state,
        isLoading: true,
      };

    case LOADING_STOP:
      return {
        ...state,
        isLoading: false,
      };

    case SET_USER:
      return {
        ...state,
        user: action.payload,
        token: action.payload,
      };

    case SET_USER_TOKEN:
      return {
        ...state,
        token: action.payload,
      };
    case SET_MEMBER_UPDATED:
      return { ...state, isMemberUpdated: true };
    case RESET_MEMBER_UPDATED:
      return { ...state, isMemberUpdated: false };

    default: {
      return { ...state };
    }
  }
};

export default settingsReducer;
