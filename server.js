import { app } from "./src/app.js";
const PORT = 8888;
const server = app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});

// close server
process.on("SIGINT", () => {
  server.close(() => {
    console.log("Server closed");
  });
});
