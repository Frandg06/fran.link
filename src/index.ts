import { Hono } from 'hono';
import { authMiddleware } from './middleware/auth';
import { get } from './controllers/get';
import { list } from './controllers/list';
import { post } from './controllers/create';
import { update } from './controllers/update';
import { destroy } from './controllers/delete';
import { cors } from 'hono/cors';

const app = new Hono<{ Bindings: CloudflareBindings }>();
app.use(
  cors({
    origin: ['http://localhost', 'http://127.0.0.1', 'https://frandg.link', 'https://www.frandg.link'],
    allowMethods: ['POST', 'GET', 'OPTIONS', 'PATCH', 'DELETE'],
    maxAge: 600,
    credentials: true,
  })
);
app.get('/:hash', get);
app.get('/api/link', authMiddleware, list);
app.post('/api/link', authMiddleware, post);
app.patch('/api/link/:hash', authMiddleware, update);
app.delete('/api/link/:hash', authMiddleware, destroy);

export default app;
