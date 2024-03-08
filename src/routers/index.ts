import shopSignup from "./access";
import { apiKey, permission } from "~/auth/checkAuth";
import { Router } from "express";
const router = Router();

//check apiKey
router.use(apiKey);
//check permission
router.use(permission("0000"));
router.use("/v1/api", shopSignup);
router.get("/", (req, res, next) => {
  return res.status(200).json({ msg: "hello world" });
});
export default router;
