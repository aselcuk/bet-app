import type { EventItem, SportsItem } from '@/model';
import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

type GroupedSportItem = Record<string, Array<SportsItem>> | null;

type EventsState = {
  selectedTabIndex: number;
  events: Array<Array<EventItem>>;
  groupedSports: GroupedSportItem;
};

const initialState: EventsState = {
  events: [],
  groupedSports: null,
  selectedTabIndex: 0
};

const eventsSlice = createSlice({
  name: 'eventsData',
  initialState,
  reducers: {
    updateEvents: (state, action: PayloadAction<Array<Array<EventItem>>>) => {
      state.events = action.payload;
    },
    updateSelectedTab: (state, action: PayloadAction<number>) => {
      state.selectedTabIndex = action.payload;
    },
    updateGroupedSports: (state, action: PayloadAction<GroupedSportItem>) => {
      state.groupedSports = action.payload;
    }
  }
});

export const { updateEvents, updateSelectedTab, updateGroupedSports } =
  eventsSlice.actions;
export default eventsSlice.reducer;
