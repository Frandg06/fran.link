import { Handler } from 'hono';
import { getAuth } from '@hono/clerk-auth';

export const authMiddleware: Handler = (c, next) => {
  const auth = getAuth(c);

  if (!auth?.userId) {
    return c.json({ message: 'Unauthorized', error: true }, 401);
  }

  return next();
};
