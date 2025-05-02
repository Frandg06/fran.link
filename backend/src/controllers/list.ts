import { Handler } from 'hono';
import { getAuth } from '@hono/clerk-auth';

export const list: Handler = async (c) => {
  const auth = getAuth(c);
  const { results } = await c.env.DB.prepare('SELECT * from Links WHERE userId = ?').bind(auth?.userId).all();

  return c.json(results ?? [], 200);
};
