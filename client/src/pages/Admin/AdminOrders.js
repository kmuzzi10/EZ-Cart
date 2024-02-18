import React, { useState, useEffect } from 'react';
import AdminMenu from '../../components/Layout/AdminPages/AdminMenu';
import axios from "axios";
import { useAuth } from '../../context/auth';
import moment from "moment";
import { Select, Input } from 'antd'; // Import Input component from antd
import Layout from '../../components/Layout/Layout';

const { Option } = Select;

const AdminOrders = () => {
    const [status, setStatus] = useState(["Not Process", "Processing", "Shipped", "Delivered", "Cancel"]);
    const [changeStatus, setChangeStatus] = useState("");
    const [orders, setOrders] = useState([]);
    const [auth, setAuth] = useAuth();
    const [searchQuery, setSearchQuery] = useState(""); // State to hold the search query

    const getOrders = async () => {
        try {
            const { data } = await axios.get(`${process.env.REACT_APP_API}/api/v1/auth/all-orders`);
            setOrders(data);
        } catch (err) {
            console.log(err);
            alert(err);
        }
    };

    useEffect(() => {
        if (auth?.token) getOrders();
    }, [auth?.token]);

    const handleChange = async (orderId, value) => {
        try {
            const { data } = axios.put(`${process.env.REACT_APP_API}/api/v1/auth/order-status/${orderId}`, { status: value });
            getOrders();
        } catch (err) {
            console.log(err);
            alert(err);
        }
    };

    // Function to filter orders based on search query
    const filteredOrders = orders.filter(order =>
        order.orderId.toString().toLowerCase().includes(searchQuery.toLowerCase())
    );


    return (
        <Layout title="All orders data">
            <div className='container-fluid m-3 p-3'>
                <div className='row'>
                    <div className='col-lg-3 col-md-4 col-sm-4'>
                        <AdminMenu />
                    </div>
                    <div className='col-lg-9 col-md-8 col-sm-8'>
                        <h1 className="text-center">All Orders</h1>
                        {/* Input field for search query */}
                        <Input
                            placeholder="Search by Order ID"
                            value={searchQuery}
                            onChange={e => setSearchQuery(e.target.value)}
                            style={{ marginBottom: '20px', width: '100%' }}
                        />
                        {
                            filteredOrders.map((o, i) => {
                                const paymentStatus = o.payment.method === "Cash On Delivery" ? "Cash on Delivery" : o.payment.success ? "Success" : "Failed";
                                const buyerName = o?.buyer?.name || 'N/A'; // Handle buyer name if undefined or null
                                const buyerAddress = o?.buyer?.address || 'N/A'; // Handle buyer address if undefined or null

                                return (
                                    <div key={o._id} className='border shadow mb-3'>
                                        <table className='table'>
                                            <thead>
                                                <tr>
                                                    <th scope='col'>#</th>
                                                    <th scope='col'>OrderID</th>
                                                    <th scope='col'>Status</th>
                                                    <th scope='col'>Buyer</th>
                                                    <th scope='col'>Buyer Address</th>
                                                    <th scope='col'>Order Date</th>
                                                    <th scope='col'>Products</th>
                                                    <th scope='col'>Payment Status</th>
                                                    <th scope='col'>Total Price</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr key={i}>
                                                    <td>{i + 1}</td>
                                                    <td>{o.orderId}</td>
                                                    <td>
                                                        <Select bordered={false} onChange={value => handleChange(o._id, value)} defaultValue={o?.status}>
                                                            {status.map((s, i) => (
                                                                <Option key={i} value={s}>
                                                                    {s}
                                                                </Option>
                                                            ))}
                                                        </Select>
                                                    </td>
                                                    <td>{buyerName}</td>
                                                    <td>{buyerAddress}</td>
                                                    <td>{moment(o.createdAt).fromNow()}</td>
                                                    <td>
                                                        {/* Mapping through products to display their names */}
                                                        {o?.products.map((product, index) => (
                                                            <div key={index}>{product.name}</div>
                                                        ))}
                                                    </td>
                                                    <td>{paymentStatus}</td>
                                                    <td>{o.totalPrice}</td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default AdminOrders;
