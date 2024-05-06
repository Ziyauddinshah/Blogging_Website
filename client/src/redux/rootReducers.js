import { combineReducers } from "@reduxjs/toolkit";
import postReducer from "./postReducer";
import itemReducer from "./itemReducer";
import commentReducer from "./commentReducer";

const rootReducer = combineReducers({
  item: itemReducer,
  post: postReducer,
  comment: commentReducer,
});

export default rootReducer;
