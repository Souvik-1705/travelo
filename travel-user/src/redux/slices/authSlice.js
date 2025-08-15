import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_KEY = "AIzaSyBaDqCUo6E7xswrHwp_5hOpQJKHbKeUbJ8";

export const verifyToken = createAsyncThunk("auth/verifyToken", async (token, { rejectWithValue }) => {
  try {
    const res = await axios.post(
      `https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=${API_KEY}`,
      { idToken: token }
    );
    return res.data.users[0]; 
  } catch (err) {
    return rejectWithValue("Invalid token");
  }
});

export const signupUser = createAsyncThunk("auth/signup", async ({ email, password }) => {
  const res = await axios.post(
    `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${API_KEY}`,
    {
      email,
      password,
      returnSecureToken: true,
    }
  );
  return res.data;
});

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
    token: localStorage.getItem("token") || null,
    email: localStorage.getItem("email") || null,
    userId: localStorage.getItem("userId") || null,
    loading: false,
    error: null,
    isTokenVerified: false,
  },
  reducers: {
    logout: (state) => {
      state.token = null;
      state.email = null;
      state.userId = null;
      state.isTokenVerified = false;
      localStorage.clear();
    },
  },
  extraReducers: (builder) => {
    builder

      .addCase(verifyToken.fulfilled,(state,action)=>{
        state.isTokenVerified=true;
        state.email = action.payload.email;
        state.userId = action.payload.localId;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.token = action.payload.idToken;
        state.email = action.payload.email;
        state.userId = action.payload.localId;
        localStorage.setItem("token", action.payload.idToken);
        localStorage.setItem("email", action.payload.email);
        localStorage.setItem("userId", action.payload.localId);
        state.error = null;
        state.loading = false;
      })
      .addCase(verifyToken.rejected, (state) => {
        state.token = null;
        state.email = null;
        state.userId = null;
        state.isTokenVerified = false;
        localStorage.clear();
      })
      .addCase(signupUser.fulfilled, (state, action) => {
        state.token = action.payload.idToken;
        state.email = action.payload.email;
        state.userId = action.payload.localId;
        state.isTokenVerified = true;
        localStorage.setItem("token", action.payload.idToken);
        localStorage.setItem("email", action.payload.email);
        localStorage.setItem("userId", action.payload.localId);
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

export const { logout } = authSlice.actions;
export default authSlice.reducer;
