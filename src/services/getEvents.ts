import api from './instance';

export const getEvents = async (sport: string) => {
  const response = await api.get(`/sports/${sport}/events`);

  return response.data;
};
