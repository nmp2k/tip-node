import { Router } from "express";
import * as productController from "~/controllers/product.controller";
import { asyncErrorHandler } from "~/utils/asyncError.handler";
import { authentication } from "~/auth/authUtils";
const router = Router();
//user query
router.get(
  "/search/:keySearch",
  asyncErrorHandler(productController.searchProductByUser)
);
router.use(authentication);
router.post("/create", asyncErrorHandler(productController.createProduct));
//update
router.put("/publish/:id", asyncErrorHandler(productController.publishOne));
router.put("/unpublish/:id", asyncErrorHandler(productController.unPublishOne));
//query
router.get(
  "/draft/all",
  asyncErrorHandler(productController.getAllDraftProduct)
);
router.get(
  "/published/all",
  asyncErrorHandler(productController.getAllPublishProduct)
);
export default router;
