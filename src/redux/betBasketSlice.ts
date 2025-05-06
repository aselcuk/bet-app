import type { BetBasketItem } from '@/model';
import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

type BetBasketState = {
  basket: Record<string, BetBasketItem>;
};

const initialState: BetBasketState = {
  basket: {}
};

const betBasketSlice = createSlice({
  name: 'betBasketData',
  initialState,
  reducers: {
    addToBetBasket: (state, action: PayloadAction<BetBasketItem>) => {
      const basketItem = action.payload;
      state.basket[basketItem.eventId] = basketItem;
    },
    removeFromBasket: (state, action: PayloadAction<string>) => {
      const id = action.payload;
      delete state.basket[id];
    }
  }
});

export const { addToBetBasket, removeFromBasket } = betBasketSlice.actions;
export default betBasketSlice.reducer;
