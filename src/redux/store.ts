import { configureStore } from '@reduxjs/toolkit';
import eventsSlice from './eventsSlice';
import betBasketSlice from './betBasketSlice';

export const store = configureStore({
  reducer: {
    events: eventsSlice,
    basket: betBasketSlice
  }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
