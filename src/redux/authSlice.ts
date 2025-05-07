import type { User } from '@/model';
import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

type AuthState = {
  user: User | null;
  loading: boolean;
};

const initialState: AuthState = {
  user: null,
  loading: false
};

const authSlice = createSlice({
  name: 'authData',
  initialState,
  reducers: {
    setUser(state, action: PayloadAction<User | null>) {
      state.user = action.payload;
    },
    setAuthLoading(state, action: PayloadAction<boolean>) {
      state.loading = action.payload;
    },
    logout(state) {
      state.user = null;
    }
  }
});

export const { logout, setAuthLoading, setUser } = authSlice.actions;
export default authSlice.reducer;
