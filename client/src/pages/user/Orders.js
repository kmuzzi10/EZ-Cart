import React, { useState, useEffect } from 'react';
import Layout from '../../components/Layout/Layout';
import UserMenu from '../../components/Layout/UserPages/UserMenu';
import axios from "axios";
import { useAuth } from '../../context/auth';
import moment from "moment";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Orders = () => {
    const [orders, setOrders] = useState([]);
    const [auth, setAuth] = useAuth();

    const getOrders = async () => {
        try {
            const { data } = await axios.get(`${process.env.REACT_APP_API}/api/v1/auth/orders`);
            // Sort orders by createdAt in descending order (latest first)
            data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
            setOrders(data);
        } catch (err) {
            console.log(err);
            toast.error(err);
        }
    };

    const cancelOrder = async (orderId) => {
        try {
            let answer = window.prompt('Are you sure want to Cancel this Order if cancel then write yes');
            if (!answer) return;
            if (answer == 'yes') {
                await axios.put(`${process.env.REACT_APP_API}/api/v1/auth/order-status-user/${orderId}`, { status: "Cancelled" });
                // Update the UI to reflect the cancelled status
                setOrders(prevOrders => prevOrders.map(order => order._id === orderId ? { ...order, status: "Cancelled" } : order));
            }

        } catch (err) {
            console.log(err);
            toast.error("Failed to cancel the order.");
        }
    };

    useEffect(() => {
        if (auth?.token) getOrders();
    }, [auth?.token]);

    return (
        <Layout title={'orders'}>
            <div className='container-fluid m-3 p-3'>
                <div className='row'>
                    <div className='col-lg-3 col-md-4 col-sm-12 mb-3'> {/* Adjusted column sizes for responsiveness */}
                        <UserMenu />
                    </div>
                    <div className='col-lg-9 col-md-8 col-sm-12'>
                        <h1 className='text-center'>All orders</h1>
                        {orders.map((o, i) => {
                            const paymentStatus = o.payment.method === "Cash On Delivery" ? "Cash on Delivery" : o.payment.success ? "Success" : "Failed";

                            return (
                                <div key={o._id} className='border shadow mb-3'>
                                    <table className='table'>
                                        <thead>
                                            <tr>
                                                <th scope='col'>#</th>
                                                <th scope='col'>OrderID</th>
                                                <th scope='col'>Status</th>
                                                <th scope='col'>Buyer</th>
                                                <th scope='col'>Order Date</th>
                                                <th scope='col'>Products</th>
                                                <th scope='col'>Payment Status</th>
                                                <th scope='col'>Actions</th> {/* Add Actions column */}
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr key={i}>
                                                <td>{i + 1}</td>
                                                <td>{o.orderId}</td>
                                                <td>{o?.status}</td>
                                                <td>{o?.buyer.name}</td>
                                                <td>{moment(o.createdAt).fromNow()}</td>
                                                <td>
                                                    {/* Mapping through products to display their names */}
                                                    {o?.products.map((product, index) => (
                                                        <div key={index}>{product.name}</div>
                                                    ))}
                                                </td>
                                                <td>{paymentStatus}</td>
                                                <td>
                                                    {o.status !== "Cancelled" && ( // Display cancel button if order status is not already cancelled
                                                        <button onClick={() => cancelOrder(o._id)} className="btn btn-danger">Cancel</button>
                                                    )}
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
            <ToastContainer />
        </Layout>
    );
};

export default Orders;
