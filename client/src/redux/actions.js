import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getPosts = createAsyncThunk(
  "getPosts",
  async (args, { rejectWithValue }) => {
    let config = {
      headers: {
        authorization: "Bearer " + localStorage.getItem("jwt_token"),
      },
    };
    const response = await axios.get(
      "http://localhost:3005/posts/get-all",
      config
    );
    try {
      const result = await response.data;
      return result;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const addPost = createAsyncThunk(
  "addPost",
  async (data, { rejectWithValue }) => {
    const config = {
      headers: {
        authorization: "Bearer " + data.token,
      },
    };
    const response = await axios.post(
      "http://localhost:3005/posts/add",
      {
        post_text: data.post_text,
      },
      config
    );
    try {
      const result = await response.data;
      // console.log("response ", result);
      return result;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const deletePost = createAsyncThunk(
  "deletePost",
  async (postid, { rejectWithValue }) => {
    let config = {
      headers: {
        authorization: "Bearer " + localStorage.getItem("jwt_token"),
      },
    };
    const response = await axios.delete(
      `http://localhost:3005/posts/delete?post_uuid=${postid}`,
      config
    );
    try {
      const result = await response.data;
      // console.log(result);
      return result;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const getAllCommentsOfOnePost = createAsyncThunk(
  "getAllCommentsOfOnePost",
  async (postid, { rejectWithValue }) => {
    let config = {
      headers: {
        authorization: "Bearer " + localStorage.getItem("jwt_token"),
      },
    };
    const response = await axios.get(
      `http://localhost:3005/comments/get?post_id=${postid}`,
      config
    );
    try {
      const result = await response;
      return result.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);
