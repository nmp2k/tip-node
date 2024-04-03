import { Router } from "express";
import * as inventoryController from "~/controllers/inventory.controller";
import { asyncErrorHandler } from "~/utils/asyncError.handler";
import { authentication } from "~/auth/authUtils";

const router = Router();

router.use(authentication);
//update

router.post("/stock/add/:id", asyncErrorHandler(inventoryController.addStock));
router.post(
  "/stock/reduce/:id",
  asyncErrorHandler(inventoryController.addStock)
);
router.post("/stock/set/:id", asyncErrorHandler(inventoryController.addStock));
export default router;
