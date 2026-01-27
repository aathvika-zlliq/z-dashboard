import {
  GAMING_PLAN_PURCHASED,
  RESET_GAMING_PLAN_PURCHASED,
  UPLAY_GAMING_CONTENT,
} from "./actions";

const initialState = {
  isGamingPlanPurchased: false,
  gamingContent: {},
};

const gamingReducer = (state = initialState, action) => {
  switch (action.type) {
    case GAMING_PLAN_PURCHASED:
      return {
        ...state,
        isGamingPlanPurchased: true,
      };

    case RESET_GAMING_PLAN_PURCHASED:
      return {
        ...state,
        isGamingPlanPurchased: false,
      };
    case UPLAY_GAMING_CONTENT:
      return {
        ...state,
        gamingContent: action.payload,
      };

    default:
      return state;
  }
};

export default gamingReducer;
