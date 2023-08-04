import thunk from "redux-thunk";
import { reducer as formReducer } from "./_singleForm/reducer";
import { applyMiddleware, legacy_createStore, combineReducers } from "redux";

const rootReducer = combineReducers({
  formReducer,
});

const store = legacy_createStore(rootReducer, applyMiddleware(thunk));

export { store };

// Logger Middleware

// const stateChangeLogger = (store) => (next) => (action) => {
//   console.log("Dispatching action:", action);
//   console.log("Current state:", store.getState());
//   const result = next(action);
//   console.log("Next state:", store.getState());
//   return result;
// };
