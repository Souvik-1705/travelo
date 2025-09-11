import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const DB_URL = "https://travel-website-2ae60-default-rtdb.firebaseio.com/cities";


export const fetchCities = createAsyncThunk("cities/fetch", async () => {
  const res = await axios.get(`${DB_URL}.json`,);
  const data = res.data;
  if (!data) return [];
  return Object.keys(data).map((id) => ({ id, ...data[id] }));
});


export const addCity = createAsyncThunk("cities/add", async ({name,image}) => {
  const res = await axios.post(`${DB_URL}.json`, { name,image });
  return { id: res.data.name, name,image };
});


export const updateCity = createAsyncThunk("cities/update", async ({ id, name,image }) => {
  await axios.patch(`${DB_URL}/${id}.json`, { id,name,image });
  return { id, name,image };
});


export const updateFamousPlaces = createAsyncThunk(
  "cities/updateFamousPlaces",
  async ({ cityId, famousPlaces }) => {
    await axios.patch(`${DB_URL}/${cityId}.json`, { famousPlaces });
    return { cityId, famousPlaces };
  }
);



export const deleteCity = createAsyncThunk("cities/delete", async (id) => {
  await axios.delete(`${DB_URL}/${id}.json`);
  return id;
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
      })
      .addCase(fetchCities.rejected, (state) => {
        state.loading = false;
      })
      .addCase(addCity.fulfilled, (state, action) => {
        state.cities.push(action.payload);
      })
      .addCase(updateCity.fulfilled, (state, action) => {
        const index = state.cities.findIndex((c) => c.id === action.payload.id);
        if (index !== -1) state.cities[index] = action.payload;
      })
      .addCase(updateFamousPlaces.fulfilled, (state, action) => {
        const index = state.cities.findIndex(c => c.id === action.payload.cityId);
        if (index !== -1) {
        state.cities[index].famousPlaces = action.payload.famousPlaces;
      }
      })
      .addCase(deleteCity.fulfilled, (state, action) => {
        state.cities = state.cities.filter((c) => c.id !== action.payload);
      });
  },
});

export default citySlice.reducer;
