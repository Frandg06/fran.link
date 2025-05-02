import { Handler } from 'hono';
import { getAuth } from '@hono/clerk-auth';

export const list: Handler = async (c) => {
  const auth = getAuth(c);
  console.log(auth);
  const list = await c.env.URLS.get(auth?.userId, { type: 'json' });
  return c.json(list?.urls ?? [], 200);
};
