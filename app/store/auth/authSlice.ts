import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface SignUpState {
  fullName: string;
  phoneNumber: string;
  email: string;
}

export interface AuthState {
  isAuthenticated: boolean;
  signupData: SignUpState | null;
}

const initialState: AuthState = {
  isAuthenticated: false,
  signupData: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    saveSignupUserDetails: (
      state: AuthState,
      action: PayloadAction<SignUpState>,
    ) => {
      state.signupData = action.payload;
    },
    login: state => {
      state.isAuthenticated = true;
    },
    logout: () => {
      return initialState;
    },
  },
});

export const { login, logout, saveSignupUserDetails } = authSlice.actions;

export default authSlice.reducer;
