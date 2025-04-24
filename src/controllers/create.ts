import { Handler } from 'hono';

export const post: Handler = async (c) => {
  const body = await c.req.json();
  const { destination, hash } = body;

  if (!destination) {
    return c.json({ error: true, message: '❌ No destination provided' }, 400);
  }

  const newHash = hash || Math.random().toString(36).slice(2, 10);
  const exists = await c.env.URLS.get(newHash);

  if (exists) {
    return c.json({ error: true, message: '❌ Hash already exists' }, 409);
  }
  await c.env.URLS.put(newHash, destination);
  return c.json({ message: ':check Link created!' }, 200);
};
