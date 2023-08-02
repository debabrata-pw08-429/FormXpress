import thunk from "redux-thunk";
import { reducer as formReducer } from "./_singleForm/reducer";
import { applyMiddleware, legacy_createStore, combineReducers } from "redux";

const rootReducer = combineReducers({
  formReducer,
});

const store = legacy_createStore(rootReducer, applyMiddleware(thunk));

export { store };
