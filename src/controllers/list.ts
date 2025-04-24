import { Handler } from 'hono';

export const list: Handler = async (c) => {
  const { keys } = await c.env.URLS.list();

  const allKeys = await Promise.all(
    keys.map(async (key: Link) => {
      return {
        hash: key.name,
        destination: await c.env.URLS.get(key.name),
      };
    })
  );

  return c.json(allKeys, 200);
};
