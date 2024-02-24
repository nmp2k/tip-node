import "dotenv/config";
import express from "express";
import morgan from "morgan";
import helmet from "helmet";
import compression from "compression";
import initDb from "./dbs/init.mongodb.js";
import { countConnections, checkOverload } from "./helpers/check.connection.js";

const app = express();

//init middleware
app.use(morgan("tiny"));
app.use(helmet());
app.use(compression());

//init db
initDb();
countConnections();
checkOverload();
app.get("/", (req, res, next) => {
  return res.status(200).json({ msg: "hello world" });
});
export default app;
