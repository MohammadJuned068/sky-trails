import { configureStore } from '@reduxjs/toolkit';
import blogReducer from './blogSlice';
import userReducer from './userSlice';

export default configureStore({
  reducer: {
    blogs: blogReducer,
    user: userReducer,
  },
});
