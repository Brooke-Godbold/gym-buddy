import http from "http";

import { app } from "./app.js";
import { connectDatabase } from "./mongo/connection.js";

const PORT = process.env.PORT || 8001;

const server = http.createServer(app);

server.listen(PORT, async () => {
  await connectDatabase();

  console.log(`Listening on port ${PORT}...`);
});
