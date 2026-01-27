import { BEST_DEALS, BNRY_GAMES, COMPETE_GAMES, SET_BANNERS, SET_EARNING, SET_POPUP, SET_REDEEM, SET_SHORTCUTAPPS, SET_SHORTCUTS, SET_TOOLTIPS, WALLET_ADDRESS } from "./actions";

const initialState = {
  bnryGames: [],
  competeGames: [],
  bestDeals: [],
  banners: [],
  earningApps: [],
  redeemApps: [],
  shortcutApps: [],
  shortcuts: {},
  tooltips: {},
  popUp: null,
  walletAddress: ''
};
// Home screen
const homeReducer = (state = initialState, action) => {
  switch (action.type) {
    case BNRY_GAMES: {
      return {
        ...state,
        bnryGames: action.payload || [],
      };
    }

    case COMPETE_GAMES: {
      return {
        ...state,
        competeGames: action.payload || [],
      };
    }
    case BEST_DEALS: {
      return {
        ...state,
        bestDeals: action.payload || [],
      };
    }
    case WALLET_ADDRESS: {
      return {
        ...state,
        walletAddress: action.payload || '',
      };
    }
    case SET_BANNERS: {
      return {
        ...state,
        banners: action.payload || '',
      };
    }
    case SET_REDEEM: {
      return {
        ...state,
        redeemApps: action.payload || '',
      };
    }
    case SET_EARNING: {
      return {
        ...state,
        earningApps: action.payload || '',
      };
    }
    case SET_POPUP: {
      return {
        ...state,
        popUp: action.payload || '',
      };
    }
    case SET_SHORTCUTAPPS: {
      return {
        ...state,
        shortcutApps: action.payload || '',
      };
    }
    case SET_SHORTCUTS: {
      const { id, result } = action.payload;
      return {
        ...state,
        shortcuts: {
          ...state.shortcuts,
          [id]: result || [],
        },
      };
    }
    case SET_TOOLTIPS: {
      const { id, result } = action.payload;
      return {
        ...state,
        tooltips: {
          ...state.tooltips,
          [id]: result || [],
        },
      };
    }
    default: {
      return { ...state };
    }
  }
};

export default homeReducer;
