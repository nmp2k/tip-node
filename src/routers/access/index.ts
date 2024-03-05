import express, {Router} from "express";
import *  as accessController from "~/controllers/access.controller.js";
const router: Router = express.Router();
router.post("/shop/signup", accessController.signup);
export default router;
