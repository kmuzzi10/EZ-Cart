import React, { useEffect, useState } from 'react';
import Layout from '../components/Layout/Layout';
import { useCart } from '../context/cart';
import { useAuth } from '../context/auth';
import { useNavigate } from 'react-router-dom';
import DropIn from "braintree-web-drop-in-react";
import axios from 'axios';
import CircularProgress from '@mui/material/CircularProgress';




const CartPage = () => {
    const [auth, setAuth] = useAuth();
    const [cart, setCart] = useCart();
    const [clientToken, setClientToken] = useState("");
    const [instance, setInstance] = useState("");
    const [loader, setLoader] = useState(false);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const [paymentMethod, setPaymentMethod] = useState('braintree');

    const removeCartItem = async (productId) => {
        try {
            setLoading(true);
            await axios.delete(`${process.env.REACT_APP_API}/api/v1/cart/remove-from-cart/${productId}`);
            const updatedCart = cart.filter(item => item._id !== productId);
            setCart(updatedCart);
            window.location.reload(); // This will cause the entire page to reload, consider other options for updating the cart
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const updateQuantity = async (productId, newQuantity) => {
        try {
            setLoading(true);
            const updatedCart = cart.map(item => {
                if (item._id === productId) {
                    return { ...item, quantity: newQuantity };
                }
                return item;
            });
            setCart(updatedCart);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const totalPrice = () => {
        let total = 0;
        cart.forEach(item => {
            total += item.productId.price * item.quantity;
        });
        return total;
    };

    useEffect(() => {
        const fetchCartItems = async () => {
            try {
                const { data } = await axios.get(`${process.env.REACT_APP_API}/api/v1/cart/cart-items`);
                const mergedCart = mergeCartItems(data.cartItems);
                setCart(mergedCart);
            } catch (error) {
                console.error(error);
            }
        };
        fetchCartItems();
    }, [setCart, auth.token]);

    const mergeCartItems = (cartItems) => {
        const mergedCart = [];
        cartItems.forEach(item => {
            const existingItem = mergedCart.find(mergedItem => mergedItem.productId._id === item.productId._id);
            if (existingItem) {
                existingItem.quantity += 1;
            } else {
                mergedCart.push({ ...item, quantity: 1 });
            }
        });
        return mergedCart;
    };

    //handle payment

    const handlePayment = async () => {
        try {
            if (paymentMethod === 'braintree') {
                setLoader(true)
                const { nonce } = await instance.requestPaymentMethod();
                const paymentData = {
                    nonce,
                    paymentMethod,
                    cart: cart.map(item => ({
                        productId: item.productId._id,
                        quantity: item.quantity
                    }))
                };
                const { data } = await axios.post(`${process.env.REACT_APP_API}/api/v1/product/braintree/payment`, paymentData);
                setLoader(false)
                navigate('/dashboard/user/orders')
                alert("payment successfull")
            } else if (paymentMethod === 'cod') {
    const orderData = {
        paymentMethod: 'cod',
        cart: cart.map(item => ({
            productId: item.productId._id,
            quantity: item.quantity
        }))
    };
    const { data } = await axios.post(`${process.env.REACT_APP_API}/api/v1/product/braintree/payment`, orderData);
    // If the order is successfully placed, navigate to orders page and remove items from cart
    if (data.ok) {
        navigate('/dashboard/user/orders');
        setCart([]);
        alert("Order placed successfully");
    }
}
        } catch (error) {
    console.log(error);
    setLoader(false)
}
    }


const getToken = async () => {
    try {
        const { data } = await axios.get(`${process.env.REACT_APP_API}/api/v1/product/braintree/token`)
        setClientToken(data?.clientToken)
    } catch (error) {
        console.log(error)
    }
}

useEffect(() => {
    getToken()
}, [auth?.token])

return (
    <Layout>
        <div className='container cart-container'>
            <div className='row'>
                <div className='col-lg-12 col-md-12 col-sm-12'>
                    {!auth.token && (
                        <h1 className='text-center bg-light p-2 mt-4'>Hello <br /> Please login to start shopping</h1>
                    )}
                    {auth.token && (
                        <>
                            <h1 className='text-center bg-light p-2 mt-4'>{`Hello ${auth?.user.name}`}</h1>
                            <h4 className='text-center mt-2'>
                                {cart?.length ? `You have ${cart.length} item${cart.length > 1 ? 's' : ''} in your cart` : 'Your cart is empty'}
                            </h4>
                        </>
                    )}
                </div>
            </div>
            {auth.token && (
                <div className='row'>
                    <div className='col-lg-8 col-md-8 col-sm-9'>
                        {cart?.map(p => (
                            <div key={p._id} className='row mb-3 card flex-row'>
                                <div className='col-md-4'>
                                    <img src={`${process.env.REACT_APP_API}/api/v1/product/product-photo/${p.productId._id}`} className="card-img-top img-fluid" alt={p.productId.name} width={'100px'} height={'100px'} />
                                </div>
                                <div className='col-md-8 mt-3'>
                                    <h6>{p.productId.name}</h6>
                                    <h6>{p.productId.description}</h6>
                                    <h6>Price: ${p.productId.price}</h6>
                                    <div className="quantity-control">
                                        <button className='btn btn-sm btn-secondary mr-2' onClick={() => updateQuantity(p._id, p.quantity - 1)} disabled={loading || p.quantity <= 1}>-</button>
                                        <span className="quantity">{p.quantity}</span>
                                        <button className='btn btn-sm btn-secondary ml-2' onClick={() => updateQuantity(p._id, p.quantity + 1)} disabled={loading}>+</button>
                                    </div>
                                    <button className='btn btn-danger mt-2' onClick={() => removeCartItem(p.productId._id)} disabled={loading}>Remove</button>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className='col-lg-4 col-md-4 col-sm-3 text-center'>
                        <h2>Cart Summary</h2>
                        <p>Total | Checkout | Payment</p>
                        <hr />
                        <h4>Total: ${totalPrice()}</h4>
                        <div className='payment-options'>
                            <button className={`btn ${paymentMethod === 'braintree' ? 'btn-primary' : 'btn-outline-secondary'}`} onClick={() => setPaymentMethod('braintree')}>Pay with Card</button>
                            <button className={`btn ${paymentMethod === 'cod' ? 'btn-primary' : 'btn-outline-secondary'}`} onClick={() => setPaymentMethod('cod')}>Cash on Delivery</button>
                        </div>
                        {auth?.user?.address ? (
                            <>
                                <div className='mb-3'>
                                    <h4>Current Address</h4>
                                    <h5>{auth?.user?.address}</h5>
                                    <button className='btn btn-outline-warning' onClick={() => navigate('/dashboard/user/profile')}>
                                        Update Address
                                    </button>
                                    <div className='mt-2'>
                                        {!clientToken || !cart?.length ? ("") : (
                                            <>
                                                {paymentMethod === 'braintree' && (
                                                    <DropIn
                                                        options={{
                                                            authorization: clientToken,
                                                            paypal: {
                                                                flow: 'vault'
                                                            }
                                                        }}
                                                        onInstance={instance => setInstance(instance)}
                                                    />
                                                )}
                                                <button className='btn btn-primary' onClick={handlePayment}
                                                    disabled={paymentMethod === 'braintree' && (!instance || !auth?.user.address)}
                                                >{loader ? <CircularProgress /> : "Make Payment"}</button>
                                            </>
                                        )}

                                    </div>
                                </div>
                            </>
                        ) : (
                            <div className='mb-3'>
                                <button className='btn btn-outline-warning' onClick={() => navigate('/dashboard/user/profile')}>
                                    Update Address
                                </button>
                            </div>
                        )}
                    </div>

                </div>
            )}
        </div>
    </Layout>
);
};

export default CartPage;
