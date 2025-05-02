import { Hono } from 'hono';
import { authMiddleware } from './middleware/auth';
import { get } from './controllers/get';
import { list } from './controllers/list';
import { post } from './controllers/create';
import { destroy } from './controllers/delete';
import { cors } from 'hono/cors';
import { clerkMiddleware } from '@hono/clerk-auth';

const app = new Hono<{ Bindings: CloudflareBindings }>();
app.use(
  cors({
    origin: [
      'http://localhost:5173',
      'http://localhost:5174',
      'http://127.0.0.1:5173',
      'http://127.0.0.1:5174',
      'https://frandg.link',
      'https://www.frandg.link',
      'https://app.frandg.link',
      'https://fran-link.vercel.app',
    ],
    allowHeaders: ['Content-Type', 'Authorization', 'Accept', 'Location'],
    exposeHeaders: ['Location'],
    allowMethods: ['POST', 'GET', 'OPTIONS', 'PATCH', 'DELETE'],
    maxAge: 600,
    credentials: true,
  })
);

app.get('/:hash', get);
app.use('/api/*', clerkMiddleware());
app.get('/api/link', authMiddleware, list);
app.post('/api/link', authMiddleware, post);
app.delete('/api/link/:hash', authMiddleware, destroy);
app.get('*', function (c) {
  return c.body('Redirecting...', 302, {
    Location: 'https://app.frandg.link',
    'Cache-Control': 'no-store',
  });
});
export default app;
