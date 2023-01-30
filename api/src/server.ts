import Fastify from 'fastify';
import fastifyCors from '@fastify/cors';
import { appRoutes } from './routes/routes';

const app = Fastify();
const port = 3333;
const host = '127.0.0.1';

app.register(fastifyCors);
app.register(appRoutes);

app.listen({
  port: port,
  host: host
}).then( (url) => {
  console.log(`HTTP Server running on ${url}`)
})