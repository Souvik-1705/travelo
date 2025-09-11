import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const DB_URL = "https://travel-website-2ae60-default-rtdb.firebaseio.com/categories";

export const fetchCategories = createAsyncThunk("categories/fetch", async () => {
  const res = await axios.get(`${DB_URL}.json`);
  const data = res.data;
  if (!data) return [];
  return Object.keys(data).map((id) => ({ id, ...data[id] }));
});

export const addCategory = createAsyncThunk("categories/add", async ({name,image}) => {
  const res = await axios.post(`${DB_URL}.json`, { name,image});
  return { id: res.data.name, name,image };
});

export const updateCategory = createAsyncThunk("categories/update", async ({ id,name,image }) => {
  await axios.patch(`${DB_URL}/${id}.json`, { name,image });
  return { id,name,image };
});

export const deleteCategory = createAsyncThunk("categories/delete", async (id) => {
  await axios.delete(`${DB_URL}/${id}.json`);
  return id;
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
      })
      .addCase(addCategory.fulfilled, (state, action) => {
        state.categories.push(action.payload);
      })
      .addCase(updateCategory.fulfilled, (state, action) => {
        const index = state.categories.findIndex((cat) => cat.id === action.payload.id);
        if (index !== -1) state.categories[index] = action.payload;
      })
      .addCase(deleteCategory.fulfilled, (state, action) => {
        state.categories = state.categories.filter((cat) => cat.id !== action.payload);
      });
  },
});

export default categorySlice.reducer;
