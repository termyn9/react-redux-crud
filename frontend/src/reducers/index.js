import { combineReducers } from "redux";
import tutorials from "./tutorials";
import auth from "./auth";
import message from "./message";
import users from "./users"

const rootReducer = combineReducers({
  tutorials,
  users,
  auth,
  message,
});

export default rootReducer
