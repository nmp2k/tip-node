import * as accessController from "~/controllers/access.controller";
import { Router } from "express";
import { asyncErrorHandler } from "~/utils/asyncError.handler";
import { authentication } from "~/auth/authUtils";
const router = Router();
router.post("/signup", asyncErrorHandler(accessController.signup));
router.post("/login", asyncErrorHandler(accessController.login));
router.use(authentication);
router.post("/logout", asyncErrorHandler(accessController.logout));
router.post(
  "/refreshToken",
  asyncErrorHandler(accessController.handleXrfToken)
);
export default router;
