import * as accessController from "~/controllers/access.controller";
import { Router } from "express";
import { asyncErrorHandler } from "~/utils/asyncError.handler";
import { authentication } from "~/auth/authUtils";
const router = Router();
router.post("/shop/signup", asyncErrorHandler(accessController.signup));
router.post("/shop/login", asyncErrorHandler(accessController.login));
router.use(authentication);
router.post("/shop/logout", asyncErrorHandler(accessController.logout));
export default router;
