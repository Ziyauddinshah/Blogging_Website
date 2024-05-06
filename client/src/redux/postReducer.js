import { createSlice } from "@reduxjs/toolkit";
import { getPosts, addPost, deletePost } from "./actions";
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
    builder.addCase(getPosts.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(getPosts.fulfilled, (state, action) => {
      state.status = "successful";
      state.postDataFromDB = action.payload;
    });
    builder.addCase(getPosts.rejected, (state) => {
      state.status = "failed";
    });

    builder.addCase(addPost.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(addPost.fulfilled, (state, action) => {
      state.status = "successful";
      if (action.payload.message === "Token expired") {
        state.message = action.payload.message;
      } else {
        state.postDataFromDB = action.payload;
      }
    });
    builder.addCase(addPost.rejected, (state) => {
      state.status = "failed";
    });

    builder.addCase(deletePost.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(deletePost.fulfilled, (state, action) => {
      state.status = "successful";
      // const restEntities = Object.values(state.postDataFromDB).filter(
      //   (e) => e.post_uuid !== action.payload
      // );
      // state.postDataFromDB = restEntities;
      state.postDataFromDB = action.payload;
    });
    builder.addCase(deletePost.rejected, (state, action) => {
      state.status = "failed";
    });
  },
});
// export const { deletePost } = postReducer.actions;
export default postReducer.reducer;
