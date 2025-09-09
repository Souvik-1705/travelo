import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const DB_URL = "https://travel-website-2ae60-default-rtdb.firebaseio.com/bookings";

export const fetchBookings = createAsyncThunk("booking/fetch", async () => {
  const res = await axios.get(`${DB_URL}.json`);
  const data = res.data;
  if (!data) return [];
  return Object.keys(data).map((id) => ({ id, ...data[id] }));
});

export const cancelBooking = createAsyncThunk("booking/cancelBooking", async (id) => {
  await axios.patch(
    `https://travel-website-2ae60-default-rtdb.firebaseio.com/bookings/${id}.json`,
    { status: "cancelled" }
  );
  return { id };
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
      })
      .addCase(cancelBooking.fulfilled, (state, action) => {
        const booking = state.bookings.find((b) => b.id === action.payload.id);
        if (booking) booking.status = "cancelled";
      });
  },
});

export default bookingSlice.reducer;
