import {
  GET_COUPON_CATEGORIES,
  GET_COUPON_COUNTRIES,
  GET_COUPONS,
  GET_MY_COUPONS,
  USER_BUYS_COUPONS,
} from "./actions";

const initialState = {
  categories: [],
  countries: [],
  deals: [],
  myDeals: [],
  count: 0,
  currentPage: 0,
  lastPage: 0,
  isMoreData: true,
  isUserBuys: false,
  dealUpdated: false,
};

const dealsReducer = (state = initialState, action) => {
  switch (action.type) {

    case GET_COUPON_CATEGORIES:
      {
        return {
          ...state,
          categories: [...(action.payload.data || [])],
        };
      }
    case GET_COUPON_COUNTRIES:
      return {
        ...state,
        countries: [...(action.payload || [])],
      };

    case GET_MY_COUPONS:
      return {
        ...state,
        myDeals: [...(action.payload || [])],
        isUserBuys: false,
      };

    case USER_BUYS_COUPONS:
      return {
        ...state,
        isUserBuys: true,
        dealUpdated: true,
      };

    case GET_COUPONS:
      return {
        ...state,
        deals: [...state.deals, ...(action.payload.data || [])],
        count: action.payload.total,
        currentPage: action.payload.current_page,
        lastPage: action.payload.last_page,
        isMoreData: action.payload.current_page !== action.payload.last_page,
      };

    default:
      return state;
  }
};

export default dealsReducer;
