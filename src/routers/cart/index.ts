import { Router } from "express";
import { asyncErrorHandler } from "~/utils/asyncError.handler";
import * as cartController from "~/controllers/cart.controller";
import { authentication } from "~/auth/authUtils";
const router = Router();

router.use(authentication);
router.post("/update", asyncErrorHandler(cartController.createUserCart));
router.patch(
  "/updateCartItem",
  asyncErrorHandler(cartController.updateCartItem)
);
router.get("", asyncErrorHandler(cartController.getUserCart));
router.delete("/delete", asyncErrorHandler(cartController.deleteCartItem));
export default router;
