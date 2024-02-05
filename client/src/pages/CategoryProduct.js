import React, { useEffect, useState } from 'react';
import Layout from '../components/Layout/Layout';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import Snackbar from '@mui/material/Snackbar';
import { useAuth } from "../context/auth";

const CategoryProduct = () => {
    const [auth, setAuth] = useAuth(); // Auth context
    const [products, setProducts] = useState([]);
    const [category, setCategory] = useState([]);
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const params = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        if (params?.slug) getProductsByCat();
    }, [params?.slug]);

    const getProductsByCat = async () => {
        const { data } = await axios.get(`${process.env.REACT_APP_API}/api/v1/product/product-category/${params.slug}`);
        setProducts(data?.products);
        setCategory(data?.category);
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
            <div className='container mt-3'>
                <h2 className='text-center'>Category - {category?.name}</h2>
                <h3 className='text-center'>{products?.length} result found</h3>
                <div className='row justify-content-center'>
                    {products?.map(p => (
                        <div key={p._id} className='col-lg-4 col-md-4 col-sm-6 mb-4'>
                            <div className="card">
                                <img src={`${process.env.REACT_APP_API}/api/v1/product/product-photo/${p._id}`} className="card-img-top img-fluid" alt={p.name} />
                                <div style={{ fontFamily: 'cursive' }} className="card-body">
                                    <h5 className="card-title">{p.name}</h5>
                                    <p className="card-text">{p.description.substring(0, 50)}...</p>
                                    <p className="card-text">$ {p.price}</p>
                                    <div className="d-flex justify-content-between">
                                        <button className='btn btn-primary' onClick={() => navigate(`/product/${p.slug}`)}>More Details</button>
                                        <button className='btn btn-secondary' onClick={() => addToCart(p._id)}><ShoppingCartIcon /> Add to Cart</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
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

export default CategoryProduct;
