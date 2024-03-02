import express from "express";
import shopSignup from "./access/index.js";
const router = express.Router();
router.use("/v1/api", shopSignup);
router.get("/", (req, res, next) => {
  return res.status(200).json({ msg: "hello world" });
});
export default router;
