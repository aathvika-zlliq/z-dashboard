import {
  SET_SPIN_WHEEL_UPDATED,
  RESET_SPIN_WHEEL_UPDATED,
  SET_SPIN_WHEEL_DATA, // ✅ new import
} from "./actions";

const initialState = {
  spinWheelUpdated: false,
  spinData: {
    list: [], // ✅ initialize to an object with `list`
  },
};
// eslint-disable-next-line default-param-last
const spinWheelReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_SPIN_WHEEL_UPDATED:
      return {
        ...state,
        spinWheelUpdated: true,
      };

    case RESET_SPIN_WHEEL_UPDATED:
      return {
        ...state,
        spinWheelUpdated: false,
      };

    case SET_SPIN_WHEEL_DATA: // ✅ new case
      return {
        ...state,
        spinData: action.payload,
      };

    default:
      return state;
  }
};

export default spinWheelReducer;
