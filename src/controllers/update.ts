import { Handler } from 'hono';

export const update: Handler = async (c) => {
  const id = c.req.param('hash');
  const body = await c.req.json();
  const { destination } = body;

  const url = await c.env.URLS.get(id);

  if (!url) {
    return c.json({ error: true, message: '❌ URL not found' }, 400);
  }
  await c.env.URLS.put(
    id,
    JSON.stringify({
      ...url,
      destination,
    })
  );
  return c.json({ message: ':check Link updated!' }, 200);
};
