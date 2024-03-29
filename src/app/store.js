import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice.js";
import postReducer from "../features/posts/post-slice.js";
export const store = configureStore({
  reducer: {
    auth: authReducer,
    posts: postReducer,
  },
});
