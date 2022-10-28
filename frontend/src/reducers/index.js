import { combineReducers } from "redux";
import tutorials from "./tutorials";
import auth from "./auth";
import message from "./message";

const rootReducer = combineReducers({
  tutorials,
  auth,
  message,
});

export default rootReducer
