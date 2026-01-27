import { PRODUCT_PURCHASED, RESET_PRODUCT_PURCHASED } from "./actions";

const initialState = {
  isProductPurchased: false,
};

const rewardReducer = (state = initialState, action) => {
  switch (action.type) {
    case PRODUCT_PURCHASED:
      return {
        ...state,
        isProductPurchased: true,
      };

    case RESET_PRODUCT_PURCHASED:
      return {
        ...state,
        isProductPurchased: false,
      };

    default:
      return state;
  }
};

export default rewardReducer;
