export type User = {
  uid: string;
  email: string | null;
  displayName?: string | null;
};

export type SportsItem = {
  key: string;
  active: boolean;
  group: string;
  description: string;
  title: string;
  has_outrights: boolean;
};

export type EventItem = {
  id: string;
  sport_key: string;
  sport_title: string;
  commence_time: string;
  home_team: string;
  away_team: string;
};

export type OutcomeItem = {
  name: string;
  price: number;
};

export type MarketItem = {
  key: string;
  last_update: string;
  outcomes: Array<OutcomeItem>;
};

export type BookmakerItem = {
  key: string;
  title: string;
  markets: Array<MarketItem>;
};

export type EventDetailItem = EventItem & {
  bookmakers: Array<BookmakerItem>;
};

export type BetBasketItem = Omit<EventItem, 'sport_key' | 'id'> & {
  eventId: string;
  bookmakerName: string;
  marketName: string;
  outcome: OutcomeItem;
};
