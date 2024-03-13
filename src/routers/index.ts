import shopAccess from "./access";
import product from "./product";
import { apiKey, permission } from "~/auth/checkAuth";
import { Router } from "express";
import { asyncErrorHandler } from "~/utils/asyncError.handler";
const router = Router();

//check apiKey
router.use(asyncErrorHandler(apiKey));
//check permission
router.use(permission("0000"));
router.use("/v1/api/product", product);
router.use("/v1/api", shopAccess);
router.get("/", (req, res, next) => {
  return res.status(200).json({ msg: "hello world" });
});
export default router;
