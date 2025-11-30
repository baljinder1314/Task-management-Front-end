import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const BASE_URL = `https://task-management-front-end.onrender.com`;

export const registerUser = createAsyncThunk(
  "users/Register",
  async (formData, thunkAPI) => {
    try {
      const response = await axios.post(
        `${BASE_URL}/api/v1/user/register`,
        formData
      );
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.errors?.[0]?.message ||
          error.response?.data?.message
      );
    }
  }
);

export const logIn = createAsyncThunk(
  "auth/login",
  async (formData, thunkAPI) => {
    try {
      const response = await axios.post(
        `${BASE_URL}/api/v1/user/login`,
        formData,
        { withCredentials: true }
      );
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.errors?.[0]?.message ||
          error.response?.data?.message
      );
    }
  }
);

export const logOut = createAsyncThunk("auth/logout", async (_, thunkAPI) => {
  try {
    const response = await axios.post(
      `${BASE_URL}/api/v1/user/logout`,
      {},
      { withCredentials: true }
    );
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(
      error.response?.data?.errors?.[0]?.message ||
        error.response?.data?.message
    );
  }
});

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    loading: null,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      //////////////////////////////////////////////
      // Register
      //////////////////////////////////////////////
      .addCase(registerUser.pending, (state, action) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      })
      /////////////////////////////////////////////
      // Log In
      ////////////////////////////////////////////
      .addCase(logIn.pending, (state, action) => {
        state.error = null;
        state.loading = true;
      })
      .addCase(logIn.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        localStorage.setItem("user", JSON.stringify(action.payload));
      })
      .addCase(logIn.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      })
      /////////////////////////////////////////
      //Logout
      ////////////////////////////////////////
      .addCase(logOut.pending, (state, action) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(logOut.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        localStorage.removeItem("user");
      })
      .addCase(logOut.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

const { logout } = authSlice.actions;
export default authSlice.reducer;
