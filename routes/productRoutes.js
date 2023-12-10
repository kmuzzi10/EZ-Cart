import express from "express";
import { isAdmin, requireSignin } from "../middlewares/authMiddleware.js";
import { createProductController, getProductController, getSingleProductController } from "../controllers/productController.js";
import formidable from "express-formidable";


const router = express.Router();

//create products

router.post('/create-product', (req, res, next) => {
    console.log("Reached the create-product route");
    next();
}, requireSignin, isAdmin, formidable(), createProductController)

//get product

router.get('/get-product', (req, res, next) => {
    console.log("Reached the get-product route");
    next();
}, getProductController)

//get single product
router.get('/get-product/:slug', (req, res, next) => {
    console.log("Reached the get-Single Product route");
    next();
}, getSingleProductController)



export default router