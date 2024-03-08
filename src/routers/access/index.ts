import * as accessController from "~/controllers/access.controller";
import { Router } from "express";
const router = Router();
router.post("/shop/signup", accessController.signup);
export default router;
