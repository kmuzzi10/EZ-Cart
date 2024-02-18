import express from "express";
import {
    registerController,
    loginController,
    testController,
    forgotPasswordController,
    updateProfileController,
    getOrderController,
    getAllOrderController,
    updateOrderController,
    getUserController
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


//get user

router.get("/get-user", requireSignin, isAdmin, getUserController)

//update profile for user
router.put("/profile", requireSignin, updateProfileController)


//orders
router.get("/orders", requireSignin, getOrderController)

//all orders
router.get("/all-orders", requireSignin, isAdmin, getAllOrderController)

//order update

router.put("/order-status/:orderId", requireSignin, isAdmin, updateOrderController)

export default router;