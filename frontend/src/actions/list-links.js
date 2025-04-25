export const getLinks = async () => {
  const response = await fetch('https://frandg.link/api/link', {
    method: 'GET',
    headers: {
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
