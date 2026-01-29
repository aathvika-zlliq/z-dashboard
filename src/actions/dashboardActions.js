import {
  LOADING_START,
  LOADING_STOP,
  SET_DASHBOARD_STATISTICS,
  SET_SEARCH_BY_SENDS,
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

export const searchBySends = (payload) => (dispatch) => {
  dispatch({ type: LOADING_START });

  return Api1(BASE_URL)
    .post("/smtp/search_by_sends", payload)
    .then((result) => {
      dispatch({
        type: SET_SEARCH_BY_SENDS,
        payload: result,
      });
      return result;
    })
    .catch((err) => Promise.reject(err))
    .finally(() => {
      dispatch({ type: LOADING_STOP });
    });
};
export const getSendingDomainList = () => (dispatch) => {
  dispatch({ type: LOADING_START });

  return Api1(BASE_URL)
    .get("/smtp/sending_domain_list")
    .then((result) => {
      return result;
    })
    .catch((err) => Promise.reject(err))
    .finally(() => {
      dispatch({ type: LOADING_STOP });
    });
};
export const getSendProfileDetails =
  ({ user_id, mail_class, send_id, click_tracking_id }) =>
  (dispatch) => {
    dispatch({ type: LOADING_START });

    const query = `user_id=${user_id}&mail_class=${mail_class}&send_id=${send_id}&click_tracking_id=${encodeURIComponent(
      click_tracking_id,
    )}`;

    return Api1(BASE_URL)
      .get(`/smtp/sends/profile_details?${query}`)
      .then((result) => {
        return result; // 👈 important: return API response
      })
      .catch((err) => Promise.reject(err))
      .finally(() => {
        dispatch({ type: LOADING_STOP });
      });
  };
