import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchBlogs = createAsyncThunk('blogs/fetchBlogs', async () => {
  const response = await axios.get('https://dummyjson.com/posts');
  return response.data.posts;
});

const blogSlice = createSlice({
  name: 'blogs',
  initialState: [],
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchBlogs.fulfilled, (state, action) => {
      return action.payload;
    });
  },
});

export default blogSlice.reducer;
