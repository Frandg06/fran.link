import { Handler } from 'hono';

export const authMiddleware: Handler = (c, next) => {
  const authHeader = c.req.header('Authorization');

  if (!authHeader || authHeader !== c.env.AUTH_TOKEN) {
    return c.json({ message: 'Unauthorized', error: true }, 401);
  }
  return next();
};
