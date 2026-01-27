import {
  RESET_LANGUAGE_SELECTED,
  SET_LANGUAGE,
  SET_LANGUAGE_LIST,
  SET_LANGUAGE_SELECTED,
} from "./actions";

const initialState = {
  selectedLang: "en",
  list: [],
  isLanguageSelected: false,
};

const languageReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_LANGUAGE:
      return {
        ...state,
        selectedLang: action.payload,
      };
    case SET_LANGUAGE_SELECTED:
      return {
        ...state,
        isLanguageSelected: true,
      };
    case SET_LANGUAGE_LIST:
      return {
        ...state,
        list: action.payload,
      };
    case RESET_LANGUAGE_SELECTED:
      return {
        ...state,
        isLanguageSelected: false,
      };
    default:
      return state;
  }
};

export default languageReducer;
