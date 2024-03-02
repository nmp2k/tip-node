import "dotenv/config";
import express from "express";
import morgan from "morgan";
import helmet from "helmet";
import compression from "compression";
import initDb from "./dbs/init.mongodb.js";
import { countConnections, checkOverload } from "./helpers/check.connection.js";
import router from "./routers/index.js";

const app = express();

//init middleware
app.use(morgan("tiny"));
app.use(helmet());
app.use(compression());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//init db
initDb();
countConnections();
checkOverload();
//init routers
app.use("", router);
export default app;
