import productModel from "../models/productModel"

export const createProductController =async (req,res)=>{
    try {
        const products = productModel
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success:false,
            message:'Error in creating product',
            error
        })
    }
}