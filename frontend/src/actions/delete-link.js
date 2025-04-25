import { WORKER_URL } from '@/lib/config';

export const deleteLink = async ({ hash, authToken }) => {
  const response = await fetch(`${WORKER_URL}/api/link/${hash}`, {
    method: 'DELETE',
    headers: {
      Accept: 'application/json',
      Authorization: authToken,
    },
  });

  const data = await response.json();

  if (data.error) {
    throw new Error(data.error_message ?? 'Se ha producido un error eliminando el enlace');
  }

  return data;
};
