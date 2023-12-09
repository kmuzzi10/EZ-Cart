import express from "express";
import { isAdmin, requireSignin } from "../middlewares/authMiddleware.js";
import { createProductController } from "../controllers/productController.js";


const router = express.Router();

//create products

router.post('/create-product', requireSignin, isAdmin, createProductController)



export default router