import { useAuth } from '@clerk/clerk-react';
import { WORKER_URL } from '@/lib/config';

export const useGetLinks = () => {
  const { getToken } = useAuth();

  const getLinks = async () => {
    const token = await getToken();
    const response = await fetch(`${WORKER_URL}/api/link`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
    });
    const data = await response.json();

    if (data.error) {
      throw new Error(data.error_message ?? 'Se ha producido un error creando el enlace');
    }

    return data;
  };

  return getLinks;
};
