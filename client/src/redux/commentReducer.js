import { createSlice } from "@reduxjs/toolkit";
import {
  addCommentAction,
  editCommentAction,
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

    builder.addCase(addCommentAction.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(addCommentAction.fulfilled, (state, action) => {
      state.status = "successful";
      if (action.payload.message === "Token expired") {
        state.message = action.payload.message;
      } else {
        state.commentDataForOnePost = action.payload;
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

    builder.addCase(editCommentAction.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(editCommentAction.fulfilled, (state, action) => {
      state.status = "successful";
      console.log(state);
      // console.log("reducer ", action.payload.data);
      // const editedData = state.commentDataForOnePost.map((data) =>
      //   data.comment_uuid === action.payload.data[0].comment_uuid
      //     ? action.payload.data[0]
      //     : data
      // );
      // state.commentDataForOnePost = editedData;
    });
    builder.addCase(editCommentAction.rejected, (state) => {
      state.status = "failed";
    });
  },
});

export default commentReducer.reducer;
