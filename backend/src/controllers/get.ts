import { Handler } from 'hono';
import { getAuth } from '@hono/clerk-auth';

export const get: Handler = async (c) => {
  const auth = getAuth(c);
  const hash = c.req.param('hash');
  const list = await c.env.URLS.get(auth?.userId, { type: 'json' });
  const url = list?.urls.find((url: Link) => url.hash === hash);

  if (!url) {
    return c.body('Redirecting...', 302, {
      Location: 'https://app.frandg.link',
      'Cache-Control': 'no-store',
    });
  }

  await c.env.URLS.put(
    auth?.userId,
    JSON.stringify({
      urls: list?.urls.map((url: Link) => (url.hash === hash ? { ...url, clicks: url.clicks + 1 } : url)),
    })
  );

  return c.body('Redirecting...', 302, {
    Location: url.destination,
    'Cache-Control': 'no-store',
  });
};
