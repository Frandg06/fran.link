import { WORKER_URL } from '@/lib/config';

export const getLinks = async () => {
  const response = await fetch(`${WORKER_URL}/api/link`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Authorization: `Bearer ${localStorage.getItem('bearerToken')}`,
    },
  });
  const data = await response.json();

  if (data.error) {
    throw new Error(data.error_message ?? 'Se ha producido un error creando el enlace');
  }

  return data;
};
