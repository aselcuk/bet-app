import type { SportsItem } from '@/model';
import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

type GroupedSportItem = Record<string, Array<SportsItem>> | null;

type FiltersState = {
  searchText: string;
  selectedTabIndex: number;
  groupedSports: GroupedSportItem;
};

const initialState: FiltersState = {
  searchText: '',
  groupedSports: null,
  selectedTabIndex: 0
};

const filtersSlice = createSlice({
  name: 'filtersData',
  initialState,
  reducers: {
    updateSearchText: (state, action: PayloadAction<string>) => {
      state.searchText = action.payload;
    },
    updateSelectedTab: (state, action: PayloadAction<number>) => {
      state.selectedTabIndex = action.payload;
    },
    updateGroupedSports: (state, action: PayloadAction<GroupedSportItem>) => {
      state.groupedSports = action.payload;
    }
  }
});

export const { updateSearchText, updateSelectedTab, updateGroupedSports } =
  filtersSlice.actions;
export default filtersSlice.reducer;
