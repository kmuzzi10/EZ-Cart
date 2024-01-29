import express from "express";
import { isAdmin, requireSignin } from "../middlewares/authMiddleware.js";
import { createProductController, deleteProductController, searchProductController, getProductController, getSingleProductController, productPhotoController, updateProductController, productFiltersController, productCountController, productListController, relatedProductController } from "../controllers/productController.js";
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


//filter product

router.post('/product-filters', (req, res, next) => {
    console.log("Reached the Product filter route");
    next();
}, productFiltersController)


//count product

router.get('/product-count', (req, res, next) => {
    console.log("Reached the Product count route");
    next();
}, productCountController)


//product per page

router.get('/product-list/:page', (req, res, next) => {
    console.log("Reached the Product list route");
    next();
}, productListController)

//serach product

router.get('/search/:keyword', (req, res, next) => {
    console.log("Reached the search Product route");
    next();
}, searchProductController)

//related product api
router.get('/related-product/:pid/:cid', (req, res, next) => {
    console.log("Reached the related Product route");
    next();
}, relatedProductController)


export default router