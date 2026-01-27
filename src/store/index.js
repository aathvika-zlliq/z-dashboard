import { createStore, applyMiddleware, compose } from "redux";
import { thunk } from "redux-thunk";

import reducers from "./reducer";
import { RESET_STORE } from "./actions";

export function configureStore(initialState) {
  const rootReducer = (state, action) => {
    if (action.type === RESET_STORE) {
      return reducers(undefined, action);
    }

    return reducers(state, action);
  };

  const store = createStore(
    rootReducer,
    initialState,
    compose(applyMiddleware(thunk))
  );

  return store;
}
