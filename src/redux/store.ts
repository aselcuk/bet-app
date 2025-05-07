import { configureStore } from '@reduxjs/toolkit';
import authSlice from './authSlice';
import eventsSlice from './eventsSlice';
import filtersSlice from './filtersSlice';
import betBasketSlice from './betBasketSlice';

export const store = configureStore({
  reducer: {
    auth: authSlice,
    events: eventsSlice,
    filters: filtersSlice,
    basket: betBasketSlice
  }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
