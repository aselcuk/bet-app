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
  handler: (item: T, signal?: AbortSignal) => Promise<any>,
  maxPerSecond: number,
  onSuccess?: (data: any, index: number) => void,
  signal?: AbortSignal
): Promise<void> => {
  for (let i = 0; i < items.length; i += maxPerSecond) {
    if (signal?.aborted) throw new DOMException('Aborted', 'AbortError');

    const batch = items.slice(i, i + maxPerSecond);

    const promises = batch.map((item, batchIndex) =>
      retry(() => handler(item, signal))
        .then((res) => {
          const originalIndex = i + batchIndex;
          onSuccess?.(res, originalIndex);
        })
        .catch((err) => {
          if (err.name === 'AbortError') {
            return;
          }

          console.error('Error:', err);
        })
    );

    await Promise.allSettled(promises);
    if (i + maxPerSecond < items.length) {
      await wait(1000);
    }
  }
};
