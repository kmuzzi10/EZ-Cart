import express from "express";
import {
    registerController,
    loginController,
    testController,
    forgotPasswordController,
    updateProfileController,
    getOrderController,
    getAllOrderController
}
    from "../controllers/authController.js";
import { isAdmin, requireSignin } from "../middlewares/authMiddleware.js";

//router object

const router = express.Router();

//routing
router.post("/register", registerController);
///api/v1/auth/register
//login

router.post('/login', loginController)

//forgot password

router.post('/forgot-password', forgotPasswordController)

//test route
router.get('/test', requireSignin, isAdmin, testController)

//protected route for user

router.get("/user-auth", requireSignin, (req, res) => {
    res.status(200).send({ ok: true })
})
//protected route for admin

router.get("/admin-auth", requireSignin, isAdmin, (req, res) => {
    console.log("Admin authentication endpoint accessed.");
    res.status(200).send({ ok: true });
});


//update profile for user
router.put("/profile", requireSignin, updateProfileController)


//orders
router.get("/orders", requireSignin, getOrderController)

//all orders
router.get("/all-orders", requireSignin, isAdmin, getAllOrderController)

export default router;