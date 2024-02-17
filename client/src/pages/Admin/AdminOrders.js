import React, { useState, useEffect } from 'react'
import AdminMenu from '../../components/Layout/AdminPages/AdminMenu'
import axios from "axios"
import { useAuth } from '../../context/auth'
import moment from "moment"
import { Select } from 'antd'
import Layout from '../../components/Layout/Layout'

const AdminOrders = () => {
    const [status, setStatus] = useState(["Not Process", "Processing", "Shipped", "Delivered", "Cancel"])
    const [changeStatus, setChangeStatus] = useState("");
    const [orders, setOrders] = useState([]);
    const [auth, setAuth] = useAuth()

    const getOrders = async () => {
        try {
            const { data } = await axios.get(`${process.env.REACT_APP_API}/api/v1/auth/all-orders`)
            setOrders(data)
        } catch (err) {
            console.log(err)
            alert(err)
        }
    }
    useEffect(() => {
        if (auth?.token) getOrders()
    }, [auth?.token])
    return (
        <Layout title="All orders data">
            <div className='fluid-container m-3 p-3'>
                <div className='row'>
                    <div className='col-lg-3 col-md-4 col-sm-4'>
                        <AdminMenu />
                    </div>
                    <div className='col-lg-9 col-md-8 col-sm-8'>
                        <h1>All Orders</h1>
                        {
                            orders.map((o, i) => {
                                const paymentStatus = o.payment.method === "Cash On Delivery" ? "Cash on Delivery" : o.payment.success ? "Success" : "Failed";

                                return (
                                    <div key={o._id} className='border shadow' style={{ marginBottom: '20px' }}>
                                        <table className='table'>
                                            <thead>
                                                <tr>
                                                    <th scope='col'>#</th>
                                                    <th scope='col'>Status</th>
                                                    <th scope='col'>Buyer</th>
                                                    <th scope='col'>Order Date</th>
                                                    <th scope='col'>Products</th>
                                                    <th scope='col'>Payment Status</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr key={i}>
                                                    <td>{i + 1}</td>
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
    )
}

export default AdminOrders