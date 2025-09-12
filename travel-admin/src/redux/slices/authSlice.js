import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_KEY = "AIzaSyBv0JR9ylSEjTSJGWj0PTSZwnDYjw5hN-Q";

export const loginUser = createAsyncThunk("auth/login", async ({ email, password }) => {
  const res = await axios.post(
    `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${API_KEY}`,
    {
      email,
      password,
      returnSecureToken: true,
    }
  );
  return res.data;
});

const authSlice = createSlice({
  name: "auth",
  initialState: {
    token: localStorage.getItem("adminToken") || null,
    email: localStorage.getItem("adminEmail") || null,
    userId: localStorage.getItem("adminUserId") || null,
    guest: localStorage.getItem("admin_guest") === "true",
    loading: false,
    error: null,
  },
  reducers: {
    logout: (state) => {
      state.token = null;
      state.email = null;
      state.userId = null;
      state.guest = false;
      localStorage.removeItem("adminToken");
      localStorage.removeItem("adminEmail");
      localStorage.removeItem("adminUserId");
      localStorage.removeItem("admin_guest");
    },
    guestLogin: (state) => {
      state.guest = true;
      localStorage.setItem("admin_guest", "true");
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.fulfilled, (state, action) => {
        state.token = action.payload.idToken;
        state.email = action.payload.email;
        state.userId = action.payload.localId;
        state.guest = false;
        localStorage.setItem("adminToken", action.payload.idToken);
        localStorage.setItem("adminEmail", action.payload.email);
        localStorage.setItem("adminUserId", action.payload.localId);
        localStorage.removeItem("admin_guest");
        state.error = null;
        state.loading = false;
      })
      .addMatcher(
        (action) => action.type.startsWith("auth/") && action.type.endsWith("/pending"),
        (state) => {
          state.loading = true;
          state.error = null;
        }
      )
      .addMatcher(
        (action) => action.type.startsWith("auth/") && action.type.endsWith("/rejected"),
        (state, action) => {
          state.loading = false;
          state.error = action.error.message;
        }
      );
  },
});

export const { logout, guestLogin } = authSlice.actions;
export default authSlice.reducer;
