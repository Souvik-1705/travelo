import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const DB_URL = "https://travel-website-7-default-rtdb.firebaseio.com/categories";

export const fetchCategories = createAsyncThunk("categories/fetch", async () => {
  const res = await axios.get(`${DB_URL}.json`);
  const data = res.data;
  if (!data) return [];
  return Object.keys(data).map((id) => ({ id, ...data[id] }));
});

const categorySlice = createSlice({
  name: "category",
  initialState: {
    categories: [],
    loading: false,
    error: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCategories.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.loading = false;
        state.categories = action.payload;
      });
  },
});

export default categorySlice.reducer;
