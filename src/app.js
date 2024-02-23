import express from "express";
import morgan from "morgan";
import helmet from "helmet";
import compression from "compression";
const app = express();
// init middlewares
app.use(helmet());
app.use(compression());
app.use(morgan("tiny"));
// init db
// init routes
// init handling errors
app.get("/", (req, res, next) => {
  return res.status(200).json({ msg: "hello world" });
});
export { app };
