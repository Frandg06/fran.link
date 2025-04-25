import { Handler } from 'hono';

export const list: Handler = async (c) => {
  const { keys } = await c.env.URLS.list();

  const allKeys = await Promise.all(keys.map((key: Link) => c.env.URLS.get(key.name, { type: 'json' })));

  return c.json(allKeys, 200);
};
