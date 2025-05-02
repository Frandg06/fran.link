import { Handler } from 'hono';
import { getAuth } from '@hono/clerk-auth';

export const post: Handler = async (c) => {
  const body = await c.req.json();
  const auth = getAuth(c);

  const { destination, hash } = body;

  if (!destination) {
    return c.json({ error: true, error_message: 'La URL de destino es obligatoria' }, 400);
  }

  const newHash = hash || Math.random().toString(36).slice(2, 10);
  const list = await c.env.URLS.get(auth?.userId, { type: 'json' });

  if (list?.urls.find((url: Link) => url.hash === newHash)) {
    return c.json({ error: true, error_message: 'El identificador para acortar la url ya existe' }, 409);
  }

  const newUrl = {
    hash: newHash,
    destination,
    createdAt: new Date().toISOString(),
    clicks: 0,
  };

  await c.env.URLS.put(auth?.userId, JSON.stringify({ urls: [...(list?.urls ?? []), newUrl] }));
  return c.json(newUrl, 200);
};
