import { Handler } from 'hono';
import { getAuth } from '@hono/clerk-auth';
import { list } from './list';

export const post: Handler = async (c) => {
  const body = await c.req.json();
  const auth = getAuth(c);

  const { destination, hash } = body;

  if (!destination || !hash) {
    return c.json({ error: true, error_message: 'La URL de destino es obligatoria' }, 400);
  }

  const newUrl = {
    hash,
    destination,
    createdAt: new Date().toISOString(),
    clicks: 0,
  };

  try {
    await c.env.DB.prepare('INSERT INTO Links (userId, hash, destination, createdAt, clicks) VALUES (?, ?, ?, ?, ?)')
      .bind(auth?.userId, hash, destination, new Date().toISOString(), 0)
      .run();

    return c.json(newUrl, 200);
  } catch (error) {
    return c.json({ error: true, error_message: 'El identificador para acortar la url ya existe' }, 409);
  }
};
