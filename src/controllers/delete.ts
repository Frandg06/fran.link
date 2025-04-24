import { Handler } from 'hono';

export const destroy: Handler = async (c) => {
  const hash = c.req.param('hash');
  const url = await c.env.URLS.get(hash);
  if (!url) {
    return c.json({ error: true, message: '❌ URL not found' }, 400);
  }
  await c.env.URLS.delete(hash);
  return c.json({ message: ':check Link deleted!' }, 200);
};
