export const createLink = async (data) => {
  const response = await fetch('https://frandg.link/api/link', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Authorization: data.authToken,
    },
    body: JSON.stringify({
      destination: data.destination,
      hash: data.hash,
    }),
  });

  const json = await response.json();

  if (json.error) {
    throw new Error(json.error_message ?? 'Se ha producido un error creando el enlace');
  }

  return json;
};
