import "dotenv/config";
import initDb from "./configs/config.mongodb";
import { initRedis } from "./configs/config.redis";
import { countConnections, checkOverload } from "./helpers/check.connection";
import router from "./routers";
import express from "express";
import morgan from "morgan";
import helmet from "helmet";
import compression from "compression";
const app = express();
//init middleware
app.use(morgan("tiny"));
app.use(helmet());
app.use(compression());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//init db
initDb();
//init redis
initRedis();
countConnections();
checkOverload();
//init routers
app.use("", router);
// elegant catching error through response
app.use((err, req, res, next) => {
  const statusCode = Number(err.status) || 500;
  return res.status(statusCode).json({
    status: "error",
    code: statusCode,
    message: err.message || "Internal Server Error",
  });
});
export default app;
