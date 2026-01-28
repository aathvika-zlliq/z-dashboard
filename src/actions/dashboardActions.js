import {
  LOADING_START,
  LOADING_STOP,
  SET_DASHBOARD_STATISTICS,
} from "../store/actions";

import Api1 from "../utils/api1";

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

/**
 * Fetch dashboard statistics for a user
 */
export const getDashboardStatistics =
  ({ user_id, from, to, ranges = 1 }) =>
  (dispatch) => {
    dispatch({ type: LOADING_START });

    const query = `user_id=${user_id}&from=${from}&to=${to}&ranges=${ranges}`;

    return Api1(BASE_URL)
      .get(`/smtp/dashboard_statistics?${query}`)
      .then((result) => {
        dispatch({
          type: SET_DASHBOARD_STATISTICS,
          payload: result,
        });
        return result;
      })
      .catch((err) => Promise.reject(err))
      .finally(() => {
        dispatch({ type: LOADING_STOP });
      });
  };
