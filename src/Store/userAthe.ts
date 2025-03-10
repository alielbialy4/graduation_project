import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

interface User {
  name: string;
  company_name: string;
  email: string;
  image: string;
  id: string;
  verified_at: string;
}

interface AuthState {
  user: User;
  isLogIn: boolean;
  isLoading: boolean;
  isAuthChecked: boolean;
}

const initialState: AuthState = {
  user: {
    name: "",
    email: "",
    image: "",
    company_name: "",
    id: "",
    verified_at: "",
  },
  isLogIn: false,
  isLoading: false,
  isAuthChecked: true, // Start as true to show loader until check completes
};

export const fetchUserProfile = createAsyncThunk(
  "auth/fetchUserProfile",
  async (token: string, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/user/profile/edit`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response?.data?.result?.data;
    } catch (error) {
      return rejectWithValue(`Failed to fetch user profile data: ${error}`);
    }
  }
);

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
    },
    setIsLogIn: (state, action: PayloadAction<boolean>) => {
      state.isLogIn = action.payload;
    },
    setIsAuthChecked: (state, action: PayloadAction<boolean>) => {
      state.isAuthChecked = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserProfile.pending, (state) => {
        state.isLoading = true;
        state.isAuthChecked = true; // Keep true during fetch
      })
      .addCase(
        fetchUserProfile.fulfilled,
        (state, action: PayloadAction<User>) => {
          state.user = action.payload;
          state.isLogIn = true;
          state.isLoading = false;
          state.isAuthChecked = false; // Check complete
        }
      )
      .addCase(fetchUserProfile.rejected, (state) => {
        state.isLogIn = false;
        state.isLoading = false;
        state.isAuthChecked = false; // Check complete
      });
  },
});

export const { setUser, setIsLogIn, setIsAuthChecked } = authSlice.actions;
export default authSlice.reducer;
