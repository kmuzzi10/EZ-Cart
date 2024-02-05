import React, { useState, useEffect } from "react";
import Layout from "./../components/Layout/Layout";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import Snackbar from '@mui/material/Snackbar';
import { useAuth } from "../context/auth";

const ProductDetails = () => {
    const [auth, setAuth] = useAuth(); // Auth context
    const params = useParams();
    const navigate = useNavigate();
    const [product, setProduct] = useState({});
    const [relatedProducts, setRelatedProducts] = useState([]);
    const [openSnackbar, setOpenSnackbar] = useState(false);

    useEffect(() => {
        if (params?.slug) getProduct();
    }, [params?.slug]);

    const getProduct = async () => {
        try {
            const { data } = await axios.get(
                `${process.env.REACT_APP_API}/api/v1/product/get-product/${params.slug}`
            );
            if (data && data.product) {
                setProduct(data.product);
                if (data.product._id) {
                    getSimilarProduct(data.product._id, data.product.category._id);
                }
            } else {
                console.log("Product not found");
            }
        } catch (error) {
            console.log("Error fetching product:", error);
        }
    };

    const getSimilarProduct = async (pid, cid) => {
        try {
            const { data } = await axios.get(
                `${process.env.REACT_APP_API}/api/v1/product/related-product/${pid}/${cid}`
            );
            setRelatedProducts(data?.products);
        } catch (error) {
            console.log(error);
        }
    };

    const addToCart = async (productId) => {
        try {
            if (!auth.token) {
                alert('Please login to add items to your cart'); // Display alert if not logged in
                navigate('/login')
                return;
            }
            await axios.post(`${process.env.REACT_APP_API}/api/v1/cart/add-to-cart`, {
                userId: auth.user._id, // Assuming you have access to auth context
                productId: productId,
                quantity: 1 // Default quantity is set to 1, can be adjusted as needed
            });
            setOpenSnackbar(true); // Opening Snackbar after adding product to cart
        } catch (error) {
            console.error(error); // Logging errors, if any
        }
    };

    return (
        <Layout>
            <div className="container mt-2">
                <div className="row">
                    <div className="col-md-6">
                        <img
                            src={`${process.env.REACT_APP_API}/api/v1/product/product-photo/${product._id}`}
                            className="card-img-top"
                            alt={product.name}
                        />
                    </div>
                    <div style={{ fontFamily: 'cursive' }} className="col-md-6">
                        <h1  className="text-center">Product Details</h1>
                        <h6>Name: {product.name}</h6>
                        <h6>Description: {product.description}</h6>
                        <h6>Price:$ {product.price}</h6>
                        <h6>Category: {product?.category?.name}</h6>
                        <button className='btn btn-secondary' onClick={() => addToCart(product._id)}>
                            <ShoppingCartIcon /> Add to Cart
                        </button>
                    </div>
                </div>
                <hr />
                <div className="row">
                    <div className="col">
                        <h2 style={{ fontFamily: 'cursive' }} className="text-center">Similar Products</h2>
                        <div  className="row row-cols-1 row-cols-md-3 g-4">
                            {relatedProducts.length < 1 && (
                                <p style={{ fontFamily: 'cursive' }} className="text-center">No Similar Products found</p>
                            )}
                            {relatedProducts.map((p) => (
                                <div key={p._id} className="col">
                                    <div className="card h-100">
                                        <img
                                            src={`${process.env.REACT_APP_API}/api/v1/product/product-photo/${p._id}`}
                                            className="card-img-top"
                                            alt={p.name}
                                        />
                                        <div style={{ fontFamily: 'cursive' }} className="card-body d-flex flex-column justify-content-between">
                                            <h5 className="card-title">{p.name}</h5>
                                            <p className="card-text">{p.description.substring(0, 30)}...</p>
                                            <p className="card-text">${p.price}</p>
                                            <div className="d-flex justify-content-between">
                                                <button className="btn btn-primary" onClick={() => navigate(`/product/${p.slug}`)}>More Details</button>
                                                <button className="btn btn-secondary" onClick={() => addToCart(p._id)}><ShoppingCartIcon /> Add to Cart</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
            <Snackbar
                open={openSnackbar}
                autoHideDuration={3000} // Adjust duration as needed
                onClose={() => setOpenSnackbar(false)}
                message="Item added to the cart successfully"
            />
        </Layout>
    );
};

export default ProductDetails;
