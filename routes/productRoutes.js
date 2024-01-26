import express from "express";
import { isAdmin, requireSignin } from "../middlewares/authMiddleware.js";
import { createProductController, deleteProductController, getProductController, getSingleProductController, productPhotoController, updateProductController } from "../controllers/productController.js";
import formidable from "express-formidable";



const router = express.Router();

//create products

router.post('/create-product', (req, res, next) => {
    console.log("Reached the create-product route");
    next();
}, requireSignin, isAdmin, formidable(), createProductController)

//create products

router.put('/update-product/:pid', (req, res, next) => {
    console.log("Reached the update-product route");
    next();
}, requireSignin, isAdmin, formidable(), updateProductController)

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

//get photo

router.get('/product-photo/:pid', (req, res, next) => {
    console.log("Reached the get-photo Product route");
    next();
}, productPhotoController)


//delete product

router.delete('/delete-product/:pid', (req, res, next) => {
    console.log("Reached the Delete Product route");
    next();
}, deleteProductController)


export default router