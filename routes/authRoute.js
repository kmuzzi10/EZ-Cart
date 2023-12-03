import express from "express";
import {
    registerController,
    loginController,
    testController
}
    from "../controllers/authController.js";
import { isAdmin, requireSignin } from "../middlewares/authMiddleware.js";

//router object

const router = express.Router();

//routing
router.post("/register", registerController);

//login

router.post('/login', loginController)



//test route
router.get('/test', requireSignin, isAdmin, testController)

//protected route

router.get("/user-auth", requireSignin, (req, res) => {
    res.status(200).send({ ok: true })
})

export default router;