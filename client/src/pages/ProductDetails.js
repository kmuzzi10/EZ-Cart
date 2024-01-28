import React, { useState, useEffect } from 'react';
import Layout from '../components/Layout/Layout';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { FaSpinner } from 'react-icons/fa'; // Importing the spinner icon
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

const ProductDetails = () => {
    const params = useParams();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const getProduct = async () => {
            try {
                const { data } = await axios.get(`${process.env.REACT_APP_API}/api/v1/product/get-product/${params.slug}`);
                setProduct(data?.product);
                setLoading(false);
            } catch (error) {
                console.log(error);
            }
        };

        if (params?.slug) getProduct();
    }, [params?.slug]);

    if (loading) {
        // Return loading indicator with spinner while product is being fetched
        return (
            <Layout>
                <div className='container'>
                    <div className='row'>
                        <div className='col text-center mt-5'>
                            <FaSpinner className="spinner" /> {/* Spinner icon */}
                            <h2>Loading...</h2>
                        </div>
                    </div>
                </div>
            </Layout>
        );
    }

    return (
        <Layout>
            <div className='container'>
                <div className='row'>
                    <div className='col-lg-6 col-md-6 col-sm-6 mt-3'>
                        <img src={`${process.env.REACT_APP_API}/api/v1/product/product-photo/${product._id}`} className="card-img-top" alt={product.name} />
                    </div>
                    <div className='col-lg-6 col-md-6 col-sm-6'>
                        <h1 className='text-center'>Product Details</h1>
                        <h4>Name : {product.name}</h4>
                        <h4>Description : {product.description}</h4>
                        <h4>Price : {product.price}$</h4>
                        {product.category && <h4>Category : {product.category.name}</h4>}
                        <button className='btn btn-secondary'><ShoppingCartIcon /> Add to Cart</button>
                    </div>
                </div>
                <div className='row'>
                    Similar products
                </div>
            </div>
        </Layout>
    );
};

export default ProductDetails;
