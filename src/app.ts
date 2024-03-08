import "dotenv/config";
import initDb from "./dbs/init.mongodb.js";
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
countConnections();
checkOverload();
//init routers
app.use("", router);
//handle error

export default app;
