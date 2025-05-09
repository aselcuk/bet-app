import type { EventItem } from '@/model';
import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

type EventsState = {
  events: Array<Array<EventItem>>;
  filteredEvents: Array<Array<EventItem>>;
};

const initialState: EventsState = {
  events: [],
  filteredEvents: []
};

const eventsSlice = createSlice({
  name: 'eventsData',
  initialState,
  reducers: {
    updateEvents: (state, action: PayloadAction<Array<Array<EventItem>>>) => {
      state.events = action.payload;
    },
    updateFilteredEvents: (
      state,
      action: PayloadAction<Array<Array<EventItem>>>
    ) => {
      state.filteredEvents = action.payload;
    },
    clearEvents: (state) => {
      state.events = [];
      state.filteredEvents = [];
    }
  }
});

export const { updateEvents, updateFilteredEvents, clearEvents } =
  eventsSlice.actions;
export default eventsSlice.reducer;
