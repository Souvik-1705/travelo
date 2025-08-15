import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const DB_URL = "https://travel-website-7-default-rtdb.firebaseio.com/bookings";

export const fetchBookings = createAsyncThunk("booking/fetch", async () => {
  const res = await axios.get(`${DB_URL}.json`);
  const data = res.data;
  if (!data) return [];
  return Object.keys(data).map((id) => ({ id, ...data[id] }));
});

const bookingSlice = createSlice({
  name: "booking",
  initialState: {
    bookings: [],
    loading: false,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchBookings.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchBookings.fulfilled, (state, action) => {
        state.loading = false;
        state.bookings = action.payload;
      });
  },
});

export default bookingSlice.reducer;
