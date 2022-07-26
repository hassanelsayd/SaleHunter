import { combineReducers } from "redux";
import authReducer from "./authReducer";
import message from "./message";
import searchReducer from "./searchReducer";
export const rootReducer = combineReducers({
  authReducer: authReducer,
  searchReducer: searchReducer,
  message: message,
});
