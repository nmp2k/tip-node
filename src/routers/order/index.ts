import { Router } from "express";
import * as orderController from "~/controllers/order.controller";
import { asyncErrorHandler } from "~/utils/asyncError.handler";
import { authentication } from "~/auth/authUtils";
const router = Router();

router.post("/create/:userId", asyncErrorHandler(orderController.createOrder));
router.get("/:id", asyncErrorHandler(orderController.getOne));
export default router;
