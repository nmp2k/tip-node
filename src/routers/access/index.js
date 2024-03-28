import express from "express";
import accessController from "../../controllers/access.controller.js";
const router = express.Router();
router.post("/shop/signup", accessController.signup);
export default router;
