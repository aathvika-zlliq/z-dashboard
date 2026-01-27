import {
  SET_WALLET,
  SET_TRANSACTIONS,
  IS_WALLETE_ACTION,
  RESET_WALLET_UPDATED,
  SPIN_WHEEL_OR_NOT,
} from "./actions";

const initialState = {
  wallet: {},
  isWalletAction: true,
  transactions: [],
  lastPage: null,
  walletUpdated: false,
  spinORnot: null,
};

const walletReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_WALLET:
      return {
        ...state,
        isWalletAction: false,
        wallet: action.payload,
        walletUpdated: true,
      };
    case SET_TRANSACTIONS:
      return {
        ...state,
        transactions: action.payload.transactions,
        lastPage: action.payload.lastPage,
      };
    case IS_WALLETE_ACTION: {
      return {
        ...state,
        isWalletAction: true,
        walletUpdated: true,
      };
    }
    case SPIN_WHEEL_OR_NOT: {
      return {
        ...state,
        spinORnot: action.payload.message === 'Success' ? false : true,
      };
    }
    case RESET_WALLET_UPDATED:
      return { ...state, walletUpdated: false };
    default:
      return state;
  }
};

export default walletReducer;
