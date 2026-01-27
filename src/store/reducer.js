import { combineReducers } from "redux";

// reducer import
import settingsReducer from "./settingsReducer";
import reelReducer from "./reelReducer";
import reelUserReducer from "./reelUserReducer";
import playbytesReducer from "./playbytesReducer";
import categoryReducer from "./categoryReducer";
import creatorReducer from "./creatorReducer";
import postReducer from "./postReducer";
import languageReducer from "./languageReducer";
import campaignReelReducer from "./campaignReelReducer";
import homeReducer from "./homeReducer";
import { loadingReducer } from "./loadingReducer";
import productReducer from "./productsReducer";
import walletReducer from "./walletReducer";
import dealsReducer from "./dealsReducer";
import spinWheelReducer from "./spinWheelReducer";
import rewardReducer from "./rewardReducer";
import gamingReducer from "./gamingReducer";

// ===========================|| COMBINE REDUCER ||=========================== //

const reducers = combineReducers({
  settingsReducer,
  reelReducer,
  reelUserReducer,
  playbytesReducer,
  categoryReducer,
  creatorReducer,
  productReducer,
  postReducer,
  languageReducer,
  campaignReelReducer,
  homeReducer,
  loadingReducer,
  walletReducer,
  dealsReducer,
  spinWheelReducer,
  rewardReducer,
  gamingReducer,
});

export default reducers;
