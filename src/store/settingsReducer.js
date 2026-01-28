import {
  LOADING_START,
  LOADING_STOP,
  SET_USER,
  SET_USER_TOKEN,
  LOGOUT,
} from "./actions";

// Safe localStorage parse
const getLocalUser = () => {
  try {
    const user = localStorage.getItem("user");
    return user ? JSON.parse(user) : null;
  } catch (err) {
    console.warn("Failed to parse user from localStorage:", err);
    return null;
  }
};

const initialState = {
  isLoading: false,
  user: getLocalUser(),
  token: localStorage.getItem("jwtToken") || null,
};

const settingsReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOADING_START:
      return { ...state, isLoading: true };

    case LOADING_STOP:
      return { ...state, isLoading: false };

    case SET_USER:
      localStorage.setItem("user", JSON.stringify(action.payload));
      return { ...state, user: action.payload };

    case SET_USER_TOKEN:
      localStorage.setItem("jwtToken", action.payload);
      return { ...state, token: action.payload };

    case LOGOUT:
      localStorage.removeItem("jwtToken");
      localStorage.removeItem("user");
      return { ...state, user: null, token: null };

    default:
      return state;
  }
};

export default settingsReducer;
