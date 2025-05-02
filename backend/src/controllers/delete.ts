import { Handler } from 'hono';
import { getAuth } from '@hono/clerk-auth';

export const destroy: Handler = async (c) => {
  const auth = getAuth(c);
  const hash = c.req.param('hash');

  const result = await c.env.DB.prepare('DELETE FROM Links WHERE userId = ? AND hash = ?')
    .bind(auth?.userId, hash)
    .run();

  if (!result.success) {
    return c.json({ error: true, error_message: 'La url no se ha encontrado' }, 400);
  }

  return c.json({ message: ':check Link deleted!' }, 200);
};
