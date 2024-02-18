import productModel from "../models/productModel.js"
import categoryModel from "../models/categoryModel.js"
import Order from "../models/orderModel.js"
import Cart from "../models/cartModel.js"
import fs from "fs"
import slugify from "slugify"
import braintree from "braintree"
import dotenv from "dotenv"


dotenv.config()




//payment gateway
var gateway = new braintree.BraintreeGateway({
    environment: braintree.Environment.Sandbox,
    merchantId: process.env.BRAINTREE_MERCHANT_ID,
    publicKey: process.env.BRAINTREE_PUBLIC_KEY,
    privateKey: process.env.BRAINTREE_PRIVATE_KEY,
});


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
        if (photo && photo.size > 205800000000000000) {
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

//product photo controller

export const productPhotoController = async (req, res) => {
    try {
        console.log('Reached product photo controller');
        const product = await productModel.findById(req.params.pid).select("photo");
        if (!product || !product.photo) {
            return res.status(404).send({
                message: "No product photo found"
            });
        }
        res.set("Content-type", product.photo.contentType);
        res.status(200).send(product.photo.data);
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: 'Error in getting product photo',
            error
        });
    }
};


export const deleteProductController = async (req, res) => {
    try {
        const product = await productModel.findByIdAndDelete(req.params.pid).select("-photo")
        res.status(200).send({
            success: true,
            message: 'product deleted successfully'
        })
        if (!product) {
            res.status(404).send({
                success: false,
                message: 'product not found'
            })
        }
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: 'Error in deleting product photo',
            error
        })
    }
}


//update product controller
export const updateProductController = async (req, res) => {
    try {
        console.log('Reached in update product controller')
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
        if (photo && photo.size > 2058000000000000) {
            return res.status(500).send({
                success: false,
                message: 'Photo is required and it should be less than 200mb'
            })
        }

        const products = await productModel.findByIdAndUpdate(req.params.pid,
            { ...req.fields, slug: slugify(name) },
            { new: true }
        )
        if (photo) {
            products.photo.data = fs.readFileSync(photo.path)
            products.photo.contentType = photo.type

        }
        await products.save()
        res.status(201).send({
            success: true,
            mesage: 'Product updated successfully',
            products
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: 'Error in updating product photo',
            error
        })
    }
}


//filter controller

export const productFiltersController = async (req, res) => {
    try {
        const { checked, radio } = req.body;
        let args = {};
        if (checked.length > 0) args.category = checked;
        if (radio.length) args.price = { $gte: radio[0], $lte: radio[1] };
        const products = await productModel.find(args);
        res.status(200).send({
            success: true,
            products,
        })
    } catch (err) {
        console.log(err);
        res.status(400).send({
            success: false,
            message: 'error while filtering products',
            err
        })
    }
}



//product count controller

export const productCountController = async (req, res) => {
    try {
        const total = await productModel.find({}).estimatedDocumentCount();
        res.status(200).send({
            success: true,
            total,
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: 'Error in product count',
            error
        })
    }
}


//product list controller based on page
export const productListController = async (req, res) => {
    try {
        const perPage = 9;
        const page = req.params.page ? req.params.page : 1;
        const products = await productModel
            .find({})
            .select("-photo")
            .skip((page - 1) * perPage)
            .limit(perPage)
            .sort({ createdAt: -1 });
        res.status(200).send({
            success: true,
            products,
        });
    } catch (error) {
        console.log(error);
        res.status(400).send({
            success: false,
            message: "error in per page ctrl",
            error,
        });
    }
};



//search product controller

export const searchProductController = async (req, res) => {
    try {
        const { keyword } = req.params;
        const results = await productModel.find({
            $or: [
                { name: { $regex: keyword, $options: "i" } },
                { description: { $regex: keyword, $options: "i" } }
            ]
        }).select('-photo');
        res.json(results);
    } catch (err) {
        console.log(err);
        res.status(404).send({
            success: false,
            message: 'error in search product controller',
            err
        });
    }
};



//related product controller
export const relatedProductController = async (req, res) => {
    try {
        const { pid, cid } = req.params;
        const products = await productModel.find({
            category: cid,
            _id: { $ne: pid }
        }).select("-photo").limit(5).populate("category");
        res.status(200).send({
            success: true,
            products
        })
    } catch (err) {
        console.log(err)
        res.status(400).send({
            success: false,
            message: 'error in related product api',
            err
        })
    }
}


// productCatgoryController

export const productCatgoryController = async (req, res) => {
    try {
        const category = await categoryModel.findOne({ slug: req.params.slug })
        const products = await productModel.find({ category }).populate('category')
        res.status(200).send({
            success: true,
            category,
            products
        })

    } catch (err) {
        console.log(err);
        re.status(400).send({
            success: false,
            message: 'error in gettin product based category',
            err
        })
    }
}


//payment gateway token controller

export const braintreeTokenController = async (req, res) => {
    try {
        gateway.clientToken.generate({}, (err, response) => {
            if (err) {
                res.status(500).send(err)
            } else {
                res.send(response)
            }
        })
    } catch (error) {
        console.log(error)
    }


}


//payment 


export const braintreePaymentController = async (req, res) => {
    try {
        const { cart, nonce, paymentMethod } = req.body;
        let total = 0;

        // Calculate total amount
        for (const item of cart) {
            let product = null;
            if (typeof item.productId === 'string') {
                product = await productModel.findById(item.productId);
            } else {
                product = item.productId;
            }
            if (product) {
                total += product.price * item.quantity;
            } else {
                console.error('Invalid product:', item.productId);
            }
        }

        if (paymentMethod === 'braintree') {
            // Make payment transaction with Braintree
            gateway.transaction.sale({
                amount: total,
                paymentMethodNonce: nonce,
                options: {
                    submitForSettlement: true
                }
            },
                async function (error, result) {
                    if (result) {
                        // Create order if payment is successful
                        try {
                            const order = new Order({
                                products: cart.map(item => item.productId), // Assuming cart contains product objects
                                payment: result,
                                buyer: req.user._id,
                                status: "Not Process", // Set initial status
                                totalPrice: total
                            });

                            await order.save();

                            // Remove items from cart after successful order creation
                            await Cart.deleteMany({ userId: req.user._id });

                            res.json({ ok: true, order });
                        } catch (err) {
                            res.status(500).send(err);
                        }
                    } else {
                        res.status(500).send(error);
                    }
                });
        } else if (paymentMethod === 'cod') {
            // Create order for cash on delivery
            const order = new Order({
                products: cart.map(item => item.productId),
                payment: { method: 'Cash On Delivery' },
                buyer: req.user._id,
                status: "Not Process",
                totalPrice: total
            });

            try {
                await order.save();
                // Remove items from cart after successful order creation
                await Cart.deleteMany({ userId: req.user._id });

                res.json({ ok: true, order });
            } catch (err) {
                res.status(500).send(err);
            }
        } else {
            res.status(400).send('Invalid payment method');
        }
    } catch (error) {
        console.log(error);
        res.status(500).send(error); // Handle other errors
    }
};



