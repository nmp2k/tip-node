import app from "./src/app.js";
import config from "./src/configs/config.mongodb.js";
const {
  app: { port },
} = config;
const server = app.listen(port, () => {
  console.log("Server is running on port: " + port);
});
