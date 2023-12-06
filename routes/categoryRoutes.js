import express from "express";
import { isAdmin, requireSignin } from "../middlewares/authMiddleware.js";
import { createCategoryController } from "../controllers/categoryController.js";

const router = express.Router();

//routes
router.post('/create-category', (req, res, next) => {
    console.log("Reached the create-category route");
    next();
}, requireSignin, isAdmin, createCategoryController);



export default router;