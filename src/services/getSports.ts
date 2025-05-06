import api from './instance';

export const getSports = async () => {
  const response = await api.get('/sports');

  return response.data;
};
