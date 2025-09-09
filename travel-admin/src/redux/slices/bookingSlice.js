import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const DB_URL = "https://travel-website-2ae60-default-rtdb.firebaseio.com/bookings";

// Fetch all bookings
export const fetchBookings = createAsyncThunk("bookings/fetch", async () => {
  const res = await axios.get(`${DB_URL}.json`);
  const data = res.data;
  if (!data) return [];
  return Object.keys(data).map((id) => ({ id, ...data[id] }));
});

// Update booking status
export const updateBookingStatus = createAsyncThunk(
  "bookings/update",
  async ({ id, status }) => {
    await axios.patch(`${DB_URL}/${id}.json`, { status });
    return { id, status };
  }
);

// ✅ Delete booking
export const deleteBooking = createAsyncThunk(
  "bookings/delete",
  async (id) => {
    await axios.delete(`${DB_URL}/${id}.json`);
    return id;
  }
);

const bookingSlice = createSlice({
  name: "booking",
  initialState: {
    bookings: [],
    loading: false,
    error: null,
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
      .addCase(updateBookingStatus.fulfilled, (state, action) => {
        const booking = state.bookings.find((b) => b.id === action.payload.id);
        if (booking) booking.status = action.payload.status;
      })
      .addCase(deleteBooking.fulfilled, (state, action) => {
        state.bookings = state.bookings.filter((b) => b.id !== action.payload);
      });
  },
});

export default bookingSlice.reducer;
