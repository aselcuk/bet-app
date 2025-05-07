import type { BetBasketItem, SportsItem } from '@/model';

export const getGroupedSportsMap = (sports: Array<SportsItem>) => {
  const map: Record<string, Array<SportsItem>> = {};

  for (const sport of sports) {
    const { group } = sport;

    if (!map[group]) {
      map[group] = [];
    }

    map[group].push(sport);
  }

  return map;
};

export const isSelectedBasketItem = (
  id: string,
  bookmakerName: string,
  marketName: string,
  outcomeName: string,
  basket: Record<string, BetBasketItem>
) => {
  const item = basket[id];
  if (!item) {
    return false;
  }

  return (
    item.bookmakerName === bookmakerName &&
    item.marketName === marketName &&
    item.outcome.name === outcomeName
  );
};

export const isSelectedEventItem = (
  id: string,
  basket: Record<string, BetBasketItem>
) => {
  return !!basket[id];
};
