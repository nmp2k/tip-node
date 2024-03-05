import app from "~/app.js";
import config from "~/configs/config.mongodb.js";
const {
  app: { host, port },
} = config;
const server = app.listen(port, () => {
  console.log(`Server is running on : http://${host}:${port}/`);
});
