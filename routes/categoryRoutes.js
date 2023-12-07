import express from "express";
import { isAdmin, requireSignin } from "../middlewares/authMiddleware.js";
import { createCategoryController, deleteCategoryController, getCategoryController, singleCategoryController, updateCategoryController } from "../controllers/categoryController.js";

const router = express.Router();

//routes
//create category
router.post('/create-category', (req, res, next) => {
    console.log("Reached the create-category route");
    next();
}, requireSignin, isAdmin, createCategoryController);

//update category
router.put('/update-category/:id', (req, res, next) => {
    console.log("Reached the update-category route");
    next();
}, requireSignin, isAdmin, updateCategoryController)

//get category

router.get('/get-category', (req, res, next) => {
    console.log("Reached the get-category route");
    next();
}, getCategoryController)
export default router;

//single category
router.get('/single-category/:slug', (req, res, next) => {
    console.log("Reached the get-category route");
    next();
}, singleCategoryController)


//delete
router.delete('/delete-category/:id', (req, res, next) => {
    console.log("Reached the delete-category route");
    next();
}, requireSignin, isAdmin, deleteCategoryController)