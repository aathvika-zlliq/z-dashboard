import {
  LOADING_START,
  LOADING_STOP,
  SET_USER_TOKEN,
  SET_USER,
  SET_USER_DETAILS,
} from "../store/actions";
import Api from "../utils/api";
import Api1 from "../utils/api1";

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const postLoginData = (data) => (dispatch) => {
  dispatch({ type: LOADING_START });

  return Api(BASE_URL)
    .post("v1/user-login", data)
    .then((result) => {
      /**
       * Expected API response:
       * {
       *   api_key: "token",
       *   user_id: 123,
       *   user: { name, email, ... }
       * }
       */

      // ✅ Store token
      dispatch({
        type: SET_USER_TOKEN,
        payload: result.api_key,
      });

      // ✅ Store user data
      dispatch({
        type: SET_USER,
        payload: {
          user_id: result.user_id,
          account_id: result.account_id,
          mail_class: result.mail_class,
          ...(result.user || {}),
        },
      });

      return result;
    })
    .catch((err) => Promise.reject(err))
    .finally(() => {
      dispatch({ type: LOADING_STOP });
    });
};

export const getUserProfile = () => (dispatch, getState) => {
  dispatch({ type: LOADING_START });

  const { user } = getState().settingsReducer;

  if (!user?.user_id || !user?.account_id) {
    dispatch({ type: LOADING_STOP });
    return Promise.reject("User ID or Account ID missing");
  }

  const { user_id, account_id } = user;

  return Api1(BASE_URL)
    .get(`v1/user-profile?user_id=${user_id}&account_id=${account_id}`)
    .then((result) => {
      /**
       * Expected response:
       * {
       *   name,
       *   email,
       *   role,
       *   company,
       *   ...
       * }
       */

      dispatch({
        type: SET_USER_DETAILS,
        payload: result, // ✅ ONLY profile data
      });

      return result;
    })
    .catch((err) => Promise.reject(err))
    .finally(() => {
      dispatch({ type: LOADING_STOP });
    });
};
