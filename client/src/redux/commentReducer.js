import { createSlice } from "@reduxjs/toolkit";
import {
  addCommentAction,
  deleteCommentAction,
  getAllCommentsOfOnePostAction,
} from "./actions";
const commentReducer = createSlice({
  name: "commentReducer",
  initialState: {
    commentDataForOnePost: [],
    status: "",
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(addCommentAction.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(addCommentAction.fulfilled, (state, action) => {
      state.status = "successful";
      if (action.payload.message === "Token expired") {
        state.message = action.payload.message;
      } else {
        state.postDataFromDB = action.payload;
      }
    });
    builder.addCase(addCommentAction.rejected, (state) => {
      state.status = "failed";
    });
    builder.addCase(deleteCommentAction.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(deleteCommentAction.fulfilled, (state, action) => {
      state.status = "successful";
      state.commentDataForOnePost = action.payload;
    });
    builder.addCase(deleteCommentAction.rejected, (state) => {
      state.status = "failed";
    });

    builder.addCase(getAllCommentsOfOnePostAction.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(
      getAllCommentsOfOnePostAction.fulfilled,
      (state, action) => {
        state.status = "successful";
        state.commentDataForOnePost = action.payload;
      }
    );
    builder.addCase(getAllCommentsOfOnePostAction.rejected, (state, action) => {
      state.status = "failed";
    });
  },
});

export default commentReducer.reducer;
