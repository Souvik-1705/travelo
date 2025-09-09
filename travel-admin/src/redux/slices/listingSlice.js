import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const DB_URL = "https://travel-website-2ae60-default-rtdb.firebaseio.com/listings";

export const fetchListings = createAsyncThunk("listings/fetch", async () => {
  const res = await axios.get(`${DB_URL}.json`);
  const data = res.data;
  if (!data) return [];
  return Object.keys(data).map((id) => ({ id, ...data[id] }));
});

export const addListing = createAsyncThunk("listings/add", async (listing) => {
  const res = await axios.post(`${DB_URL}.json`, listing);
  return { id: res.data.name, ...listing };
});

export const updateListing = createAsyncThunk("listings/update", async ({ id, ...updates }) => {
  await axios.patch(`${DB_URL}/${id}.json`, updates);
  return { id, ...updates };
});

export const deleteListing = createAsyncThunk("listings/delete", async (id) => {
  await axios.delete(`${DB_URL}/${id}.json`);
  return id;
});

const listingSlice = createSlice({
  name: "listing",
  initialState: {
    listings: [],
    loading: false,
    error: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchListings.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchListings.fulfilled, (state, action) => {
        state.loading = false;
        state.listings = action.payload;
      })
      .addCase(addListing.fulfilled, (state, action) => {
        state.listings.push(action.payload);
      })
      .addCase(updateListing.fulfilled, (state, action) => {
        const index = state.listings.findIndex((l) => l.id === action.payload.id);
        if (index !== -1) state.listings[index] = action.payload;
      })
      .addCase(deleteListing.fulfilled, (state, action) => {
        state.listings = state.listings.filter((l) => l.id !== action.payload);
      });
  },
});

export default listingSlice.reducer;
