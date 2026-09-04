import { createServer } from 'node:http';
import Database from './database/Database.js';
import { createApp } from './app.js';

const PORT = process.env.PORT || 3000;

async function startServer() {
  const database = new Database();
  await database.connect();
  const db = database.getDb();

  const router = await createApp(db);

  const server = createServer(async (req, res) => {
    await router.handle(req, res);
  });

  server.listen(PORT, () => {
    console.log(`Servidor rodando na porta https://localhost:${PORT}`);
  });

  process.on('SIGINT', async () => {
    await database.disconnect();
    server.close(() => {
      console.log('Servidor HTTP fechado.');
      process.exit(0);
    });
  });
}

startServer().catch(console.error);
