import { Handler } from 'hono';
export const get: Handler = async (c) => {
  const hash = c.req.param('hash');

  const results = await c.env.DB.prepare('SELECT * from Links WHERE hash = ?').bind(hash).first();

  if (!results) {
    return c.body('Redirecting...', 302, {
      Location: 'https://app.frandg.link',
      'Cache-Control': 'no-store',
    });
  }

  await c.env.DB.prepare('UPDATE Links SET clicks = ? WHERE hash = ?')
    .bind(results.clicks + 1, hash)
    .run();

  return c.body('Redirecting...', 302, {
    Location: results.destination,
    'Cache-Control': 'no-store',
  });
};
