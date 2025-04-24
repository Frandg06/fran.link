import { Handler } from 'hono';

export const get: Handler = async (c) => {
  const hash = c.req.param('hash');
  const url = await c.env.URLS.get(hash);
  if (!url) {
    return c.json({ error: true, message: '❌ URL not found' }, 400);
  }
  const validUrlLocation = url.startsWith('http') ? url : `https://${url}`;

  return c.body('Redirecting...', 302, {
    Location: validUrlLocation,
    'Cache-Control': 'no-store',
  });
};
