import { Router } from "express";
import { asyncErrorHandler } from "~/utils/asyncError.handler";
import * as discountController from "~/controllers/discount.controller";
import { authentication } from "~/auth/authUtils";
const router = Router();

router.get(
  "/get-all-products/:discountCode",
  asyncErrorHandler(discountController.getAllProductsWithDiscount)
);
router.use(authentication);
router.post("/create", asyncErrorHandler(discountController.createDiscount));
router.patch(
  "/update/:discountId",
  asyncErrorHandler(discountController.updateDiscount)
);
router.get(
  "/get-all",
  asyncErrorHandler(discountController.getAllDiscountsByShop)
);
router.delete(
  "/delete/:discountId",
  asyncErrorHandler(discountController.createDiscount)
);
export default router;
