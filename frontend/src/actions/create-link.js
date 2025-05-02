import { WORKER_URL } from '@/lib/config';

export const createLink = async ({ destination, hash }) => {
  const response = await fetch(`${WORKER_URL}/api/link`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Authorization: `Bearer ${localStorage.getItem('bearerToken')}`,
    },
    body: JSON.stringify({
      destination,
      hash,
    }),
  });

  const json = await response.json();

  if (json.error) {
    throw new Error(json.error_message ?? 'Se ha producido un error creando el enlace');
  }

  return json;
};
