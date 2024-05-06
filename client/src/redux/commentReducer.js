import { createSlice } from "@reduxjs/toolkit";
import { getAllCommentsOfOnePost } from "./actions";
const commentReducer = createSlice({
  name: "commentReducer",
  initialState: {
    commentDataForOnePost: [],
    status: "",
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getAllCommentsOfOnePost.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(getAllCommentsOfOnePost.fulfilled, (state, action) => {
      state.status = "successful";
      state.commentDataForOnePost = action.payload;
    });
    builder.addCase(getAllCommentsOfOnePost.rejected, (state, action) => {
      state.status = "failed";
    });
  },
});

export default commentReducer.reducer;
