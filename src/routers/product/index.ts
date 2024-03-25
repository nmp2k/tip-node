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
router.get("/:productId", asyncErrorHandler(productController.findProductById));
router.get("/", asyncErrorHandler(productController.findAllProductForUser));
//authentication
router.use(authentication);

router.post("/create", asyncErrorHandler(productController.createProduct));
//update
router.post("/publish/:id", asyncErrorHandler(productController.publishOne));
router.post(
  "/unpublish/:id",
  asyncErrorHandler(productController.unPublishOne)
);
//partial update
router.patch("/update/:id", asyncErrorHandler(productController.partialUpdate));
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
