import { SET_CATEGORIES, SET_COLLECTIBLES } from "./actions";

const initialState = {
  selectedCategories: [],
  otherCategories: [],
  categories: [],
  collectibles: [],
};

// eslint-disable-next-line default-param-last
const categoryReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_CATEGORIES: {
      return {
        ...state,
        selectedCategories: (action.payload || []).filter((c) => c.is_selected),
        otherCategories: (action.payload || []).filter((c) => !c.is_selected),
        categories: action.payload || [],
      };
    }

    case SET_COLLECTIBLES: {
      return {
        ...state,
        collectibles: action.payload || [],
      };
    }

    default: {
      return { ...state };
    }
  }
};

export default categoryReducer;
