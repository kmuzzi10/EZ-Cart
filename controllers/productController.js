import productModel from "../models/productModel.js"
import fs from "fs"
import slugify from "slugify"


//create product Controller
export const createProductController = async (req, res) => {
    try {
        console.log('Reached in create product controller')
        const { name, slug, description, price, category, quantity, shipping } = req.fields
        const { photo } = req.files

        //validation
        if (!name) {
            return res.status(500).send({
                success: false,
                message: 'Name is required'
            })
        }
        if (!description) {
            return res.status(500).send({
                success: false,
                message: 'Description is required'
            })
        }
        if (!price) {
            return res.status(500).send({
                success: false,
                message: 'Price is required'
            })
        }
        if (!category) {
            return res.status(500).send({
                success: false,
                message: 'Category is required'
            })
        }
        if (!quantity) {
            return res.status(500).send({
                success: false,
                message: 'Quantity is required'
            })
        }
        if (photo && photo.size > 205800) {
            return res.status(500).send({
                success: false,
                message: 'Photo is required and it should be less than 200mb'
            })
        }

        const products = new productModel({ ...req.fields, slug: slugify(name) })
        if (photo) {
            products.photo.data = fs.readFileSync(photo.path)
            products.photo.contentType = photo.type

        }
        await products.save()
        res.status(201).send({
            success: true,
            mesage: 'Product created successfully',
            products
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: 'Error in creating product',
            error
        })
    }
}

//get product controller

export const getProductController = async (req, res) => {
    try {
        console.log('Reached in get product controller')
        const products = await productModel.find({}).populate('category').select("-photo").limit(12).sort({ createdAt: -1 })
        res.status(200).send({
            success: true,
            totalCount: products.length,
            message: 'Get all products',
            products

        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: 'Error in getting product',
            error
        })
    }
}

//get single product controller

export const getSingleProductController = async (req, res) => {
    try {
        console.log('Reached in get single product controller')
        const product = await productModel.findOne({ slug: req.params.slug }).select("-photo").populate('category')
        res.status(200).send({
            success: true,
            message: 'fetched single product',
            product
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: 'Error in getting product',
            error
        })
    }
}