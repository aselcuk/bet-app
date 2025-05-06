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

export const wait = (ms: number) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

export const retry = async <T>(
  fn: () => Promise<T>,
  retries = 3,
  delayMs = 2000
): Promise<T> => {
  let attempt = 0;
  while (attempt < retries) {
    try {
      return await fn();
    } catch (err: any) {
      if (err?.response?.status === 429 && attempt < retries - 1) {
        console.warn(`429 Error, retrying after ${delayMs}ms...`);
        await wait(delayMs);
        attempt++;
      } else {
        throw err;
      }
    }
  }

  throw new Error('All retries failed.');
};

export const requestWithRateLimit = async <T>(
  items: Array<T>,
  handler: (item: T) => Promise<any>,
  maxPerSecond: number,
  onSuccess?: (data: any, index: number) => void
): Promise<void> => {
  for (let i = 0; i < items.length; i += maxPerSecond) {
    const batch = items.slice(i, i + maxPerSecond);

    const promises = batch.map((item, batchIndex) =>
      retry(() => handler(item))
        .then((res) => {
          const originalIndex = i + batchIndex;
          onSuccess?.(res, originalIndex);
        })
        .catch((err) => {
          console.error('Error:', err);
        })
    );

    await Promise.allSettled(promises);
    if (i + maxPerSecond < items.length) {
      await wait(1000);
    }
  }
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
