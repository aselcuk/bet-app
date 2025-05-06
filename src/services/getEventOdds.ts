import api from './instance';

export const getEventOdds = async (id: string, sport: string) => {
  const response = await api.get(
    `/sports/${sport}/events/${id}/odds?markets=h2h,spreads,totals&regions=us`
  );

  return response.data;
};
