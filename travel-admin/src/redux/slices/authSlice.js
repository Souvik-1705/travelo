
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { FIREBASE_AUTH_URL, FIREBASE_VERIFY_URL } from "../../firebase/config";

export const verifyToken = createAsyncThunk(
  "auth/verifyToken",
  async (token, { rejectWithValue }) => {
    try {
      const response = await axios.post(FIREBASE_VERIFY_URL, {
        idToken: token,
      });
      const data = response.data;

      return {
        token,
        email: data.users[0].email,
      };
    } catch (error) {
      return rejectWithValue("Invalid or expired token");
    }
  }
);

export const loginAdmin = createAsyncThunk(
  "auth/loginAdmin",
  async ({ email, password }, thunkAPI) => {
    try {
      const response = await axios.post(FIREBASE_AUTH_URL, {
        email,
        password,
        returnSecureToken: true,
      });

      const data = response.data;

      localStorage.setItem("adminToken", data.idToken);
      localStorage.setItem("adminEmail", data.email);
      localStorage.setItem("isGuest", "false");

      return {
        token: data.idToken,
        email: data.email,
      };
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.error?.message || "Login failed"
      );
    }
  }
);

const initialState = {
  token: localStorage.getItem("adminToken") || null,
  email: localStorage.getItem("adminEmail") || null,
  loading: false,
  error: null,
  isGuest: localStorage.getItem("isGuest") === "true",
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logoutAdmin(state) {
      state.token = null;
      state.email = null;
      state.isGuest = false;

      localStorage.removeItem("adminToken");
      localStorage.removeItem("adminEmail");
      localStorage.removeItem("isGuest");
    },

    
    loginAsGuest(state) {
      state.token = "guest_token";
      state.email = "guest@travelo.com";
      state.isGuest = true;

      localStorage.setItem("adminToken", "guest_token");
      localStorage.setItem("adminEmail", "guest@travelo.com");
      localStorage.setItem("isGuest", "true");
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(verifyToken.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(verifyToken.fulfilled, (state, action) => {
        state.token = action.payload.token;
        state.email = action.payload.email;
        state.loading = false;
      })
      .addCase(verifyToken.rejected, (state, action) => {
        state.token = null;
        state.email = null;
        state.loading = false;
        state.error = action.payload;

        localStorage.removeItem("adminToken");
        localStorage.removeItem("adminEmail");
        localStorage.removeItem("isGuest");
      })

      .addCase(loginAdmin.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginAdmin.fulfilled, (state, action) => {
        state.token = action.payload.token;
        state.email = action.payload.email;
        state.loading = false;
      })
      .addCase(loginAdmin.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      });
  },
});

export const { logoutAdmin, loginAsGuest } = authSlice.actions;
export default authSlice.reducer;
