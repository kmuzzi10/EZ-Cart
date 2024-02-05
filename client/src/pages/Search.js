import React, { useState } from 'react';
import Layout from '../components/Layout/Layout';
import { useNavigate } from 'react-router-dom';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import axios from 'axios'; // Import Axios for HTTP requests
import { useCart } from '../context/cart'; // Importing cart context
import { useSearch } from '../context/search';
import { useAuth } from '../context/auth';
import Snackbar from '@mui/material/Snackbar'; // Importing Snackbar component from Material-UI

const Search = () => {
    const [values] = useSearch();
    const navigate = useNavigate();
    const [cart, setCart] = useCart(); // Cart context
    const [auth, setAuth] = useAuth(); // Auth context
    const [openSnackbar, setOpenSnackbar] = useState(false); // State for Snackbar

    // Function to add product to cart
    const addToCart = async (productId) => {
        try {
            if (!auth.token) {
                alert('Please login to add items to your cart'); // Display alert if not logged in
                navigate('/login')
                return;
            }
            await axios.post(`${process.env.REACT_APP_API}/api/v1/cart/add-to-cart`, {
                userId: auth.user._id, // Assuming you have access to the authenticated user
                productId: productId,
                quantity: 1 // Default quantity is set to 1, can be adjusted as needed
            });
            setOpenSnackbar(true); // Open Snackbar after adding product to cart
        } catch (error) {
            console.error(error);
        }
    };

    // Function to close Snackbar
    const handleCloseSnackbar = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpenSnackbar(false);
    };

    return (
        <Layout title={'Search Results'}>
            <div className='container'>
                <div className='text-center'>
                    <h1 style={{ fontFamily: 'cursive' }}>Search Results</h1>
                    <h6 style={{ fontFamily: 'cursive' }}>{values?.results.length < 1 ? 'No Products Found' : `Found ${values?.results.length} Results`}</h6>
                    <div className='row justify-content-center mt-4'>
                        {values?.results.map(p => (
                            <div key={p._id} className='col-lg-4 col-md-4 col-sm-6 mb-4'>
                                <div className="card" style={{ height: '100%' }}>
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
            </div>
            {/* Snackbar for showing success message */}
            <Snackbar
                open={openSnackbar}
                autoHideDuration={3000}
                onClose={handleCloseSnackbar}
                message="Item added to the cart successfully"
            />
        </Layout>
    );
}

export default Search;
