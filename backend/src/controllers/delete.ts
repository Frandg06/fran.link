import { Handler } from 'hono';
import { getAuth } from '@hono/clerk-auth';

export const destroy: Handler = async (c) => {
  const auth = getAuth(c);
  const hash = c.req.param('hash');
  const list = await c.env.URLS.get(auth?.userId, { type: 'json' });
  if (!list?.urls.find((url: Link) => url.hash === hash)) {
    return c.json({ error: true, error_message: 'La url no se ha encontrado' }, 400);
  }
  await c.env.URLS.put(auth?.userId, JSON.stringify({ urls: list.urls.filter((url: Link) => url.hash !== hash) }));
  return c.json({ message: ':check Link deleted!' }, 200);
};
