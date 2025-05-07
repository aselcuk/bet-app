import api from './instance';

export const getEvents = async (sport: string, signal?: AbortSignal) => {
  const response = await api.get(`/sports/${sport}/events`, { signal });

  return response.data;
};
