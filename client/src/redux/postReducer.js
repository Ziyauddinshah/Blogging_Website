import { createSlice } from "@reduxjs/toolkit";
import {
  getPostAction,
  addPostAction,
  deletePostAction,
  editPostAction,
} from "./actions";
const postReducer = createSlice({
  name: "postReducer",
  initialState: {
    postDataFromDB: [],
    status: "",
    message: "",
  },
  reducers: {
    deletePost: (state, action) => {
      console.log("before", state);
      state.postDataFromDB = state.postDataFromDB.filter(
        (item) => item.post_uuid !== action.payload
      );
      console.log("after", state);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getPostAction.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(getPostAction.fulfilled, (state, action) => {
      state.status = "successful";
      state.postDataFromDB = action.payload;
    });
    builder.addCase(getPostAction.rejected, (state) => {
      state.status = "failed";
    });

    builder.addCase(addPostAction.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(addPostAction.fulfilled, (state, action) => {
      state.status = "successful";
      if (action.payload.message === "Token expired") {
        state.message = action.payload.message;
      } else {
        state.postDataFromDB = action.payload;
      }
    });
    builder.addCase(addPostAction.rejected, (state) => {
      state.status = "failed";
    });

    builder.addCase(editPostAction.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(editPostAction.fulfilled, (state, action) => {
      state.status = "successful";
      console.log("reducer", action.payload);
      state.postDataFromDB = action.payload;
    });
    builder.addCase(editPostAction.rejected, (state) => {
      state.status = "failed";
    });

    builder.addCase(deletePostAction.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(deletePostAction.fulfilled, (state, action) => {
      state.status = "successful";
      // const restEntities = Object.values(state.postDataFromDB).filter(
      //   (e) => e.post_uuid !== action.payload
      // );
      // state.postDataFromDB = restEntities;
      state.postDataFromDB = action.payload;
    });
    builder.addCase(deletePostAction.rejected, (state, action) => {
      state.status = "failed";
    });
  },
});
// export const { deletePost } = postReducer.actions;
export default postReducer.reducer;
