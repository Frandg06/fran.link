import { Handler } from 'hono';

export const post: Handler = async (c) => {
  const body = await c.req.json();
  const { destination, hash } = body;

  if (!destination) {
    return c.json({ error: true, error_message: 'La URL de destino es obligatoria' }, 400);
  }

  const newHash = hash || Math.random().toString(36).slice(2, 10);
  const exists = await c.env.URLS.get(newHash);

  if (exists) {
    return c.json({ error: true, error_message: 'El identificador para acortar la url ya existe' }, 409);
  }

  const newUrl = {
    hash: newHash,
    destination,
    createdAt: new Date().toISOString(),
    clicks: 0,
  };

  await c.env.URLS.put(newHash, JSON.stringify(newUrl));
  return c.json(newUrl, 200);
};
