import { LOADING_START, LOADING_STOP, SET_USER_TOKEN } from "../store/actions";
import Api from "../utils/api";

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const postLoginData = (data) => (dispatch) => {
  dispatch({ type: LOADING_START });

  return Api(BASE_URL)
    .post("user-login", data)
    .then((result) => {
      dispatch({
        type: SET_USER_TOKEN,
        payload: result.token,
      });
      return result; // ✅ success
    })
    .catch((err) => {
      // ✅ IMPORTANT: rethrow error
      return Promise.reject(err);
    })
    .finally(() => {
      dispatch({ type: LOADING_STOP });
    });
};
