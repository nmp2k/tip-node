import app from "~/app";
import config from "~/configs/config.mongodb";
const {
  app: { host, port },
} = config;
const server = app.listen(port, () => {
  console.log(`Server is running on : http://${host}:${port}/`);
});
