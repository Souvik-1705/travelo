
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const DB_URL = "https://travel-website-2ae60-default-rtdb.firebaseio.com/cities";


export const fetchCities = createAsyncThunk("cities/fetch", async () => {
  const res = await axios.get(`${DB_URL}.json`);
  const data = res.data;
  if (!data) return [];
  return Object.keys(data).map((id) => ({ id, ...data[id] }));
});

const citySlice = createSlice({
  name: "city",
  initialState: {
    cities: [],
    loading: false,
    error: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCities.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchCities.fulfilled, (state, action) => {
        state.loading = false;
        state.cities = action.payload;
      });
  },
});

export default citySlice.reducer;
