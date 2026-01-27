import { SET_FILTER_PRICE, SET_PRODUCTS } from "./actions";

const initialState = {
  data: {},
  count: {},
  currentPage: {},
  lastPage: {},
  isMoreData: {},
  bestDeals: {},
  filterData: [],
};

const productReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_PRODUCTS: {
      const { id, result } = action.payload;
      const isFirstPage = result.current_page === 1;
      const existingData = state.data[id] || [];
      return {
        ...state,
        data: {
          ...state.data,
          [id]: isFirstPage
            ? result.data || []
            : [...existingData, ...(result.data || [])],
        },
        bestDeals: {
          ...state.bestDeals,
          [id]:
            (result.data?.length >= 6 ? result.data[5] : result.data?.[0]) ||
            null,
        },
        count: {
          ...state.count,
          [id]: result.total,
        },
        currentPage: {
          ...state.currentPage,
          [id]: result.current_page,
        },
        lastPage: {
          ...state.lastPage,
          [id]: result.last_page,
        },
        isMoreData: {
          ...state.isMoreData,
          [id]: result.current_page !== result.last_page,
        },
      };
    }

    case SET_FILTER_PRICE: {
      return {
        ...state,
        filterData: [...(action.payload.result.list || [])],
      };
    }
    default:
      return state;
  }
};

export default productReducer;
