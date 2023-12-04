import express from "express";
import {
    registerController,
    loginController,
    testController,
    forgotPasswordController
}
    from "../controllers/authController.js";
import { isAdmin, requireSignin } from "../middlewares/authMiddleware.js";

//router object

const router = express.Router();

//routing
router.post("/register", registerController);

//login

router.post('/login', loginController)

//forgot password

router.post('/forgot-password', forgotPasswordController)

//test route
router.get('/test', requireSignin, isAdmin, testController)

//protected route

router.get("/user-auth", requireSignin, (req, res) => {
    res.status(200).send({ ok: true })
})

export default router;