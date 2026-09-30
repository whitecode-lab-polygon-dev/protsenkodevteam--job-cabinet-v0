import { buildServer } from './server.js';

const port = Number(process.env.PORT ?? 3001);
const app = buildServer({ logger: true });

app.listen({ port, host: '0.0.0.0' }).catch((error: unknown) => {
  app.log.error(error);
  process.exit(1);
});
