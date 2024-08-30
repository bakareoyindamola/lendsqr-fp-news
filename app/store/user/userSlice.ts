import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface UserState {
  isNewUser: boolean;
  displayName: string;
  photoURL: string | null;
  email: string | null;
  email_verified: boolean;
  username: string | null;
}

const initialState: UserState = {
  isNewUser: true,
  displayName: '',
  photoURL: null,
  email: null,
  email_verified: false,
  username: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    saveUserDetails: (state: UserState, action: PayloadAction<UserState>) => {
      return { ...state, ...action.payload };
    },
  },
});

export const { saveUserDetails } = userSlice.actions;

export default userSlice.reducer;
