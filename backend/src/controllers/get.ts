import { Handler } from 'hono';

export const get: Handler = async (c) => {
  const hash = c.req.param('hash');
  const url = await c.env.URLS.get(hash, { type: 'json' });

  if (!url) {
    return c.body('Redirecting...', 302, {
      Location: 'https://app.frandg.link',
      'Cache-Control': 'no-store',
    });
  }

  await c.env.URLS.put(hash, JSON.stringify({ ...url, clicks: url.clicks + 1 }));

  const validUrlLocation = url.destination.startsWith('http') ? url : `https://${url.destination}`;

  return c.body('Redirecting...', 302, {
    Location: validUrlLocation,
    'Cache-Control': 'no-store',
  });
};
