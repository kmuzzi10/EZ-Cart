import JWT from "jsonwebtoken";
import userModel from "../models/userModel.js";



//protected routes token based
export const requireSignin = async (req, res, next) => {
    try {
        const decode = JWT.verify(req.headers.authorization, process.env.JWT_SECRET);
        req.user = decode;
        next();
    } catch (err) {
        console.log(err)
    }
};

//admin
export const isAdmin = async (req, res, next) => {
    try{
        const user = await userModel.findById(req.user._id);
    if (user.role !== 1) {
        return res.status(404).send({
            success: false,
            message: 'Unauthorized Access'
        })
    }
    else{
        next()
    }
    }catch(err){
        console.log(err);
        res.status(401).send({
            success:false,
            message:'error in admin middleware'
        })
    }
} 