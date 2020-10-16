import http from 'http';
import app from './app';
import { config } from './config';
import { createServer } from 'graphql-transport-ws';
import { execute, subscribe } from 'graphql';
import { schema } from './schema/schema';

(async () => {
  const server = http.createServer(app.callback());

  const wsConfig = {
    server,
    path: '/ws',
  };

  server.listen(config.PORT, () => {
    console.log(`server running at http://localhost:${config.PORT}`);

    createServer(
      {
        schema,
        execute,
        subscribe,
      },
      wsConfig,
    );
  });
})();
