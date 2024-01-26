import React, { useState, useEffect } from 'react'
import AdminMenu from '../../components/Layout/AdminPages/AdminMenu'
import Layout from '../../components/Layout/Layout'
import axios from "axios"
import { Link } from "react-router-dom"
//import ends

const Products = () => {

    const [products, setProducts] = useState([])

    //get all products
    const getAllProducts = async () => {
        try {
            const { data } = await axios.get(`${process.env.REACT_APP_API}/api/v1/product/get-product`)
            setProducts(data.products)
        } catch (error) {
            console.log(error)
            alert('Something Went Wrong')
        }
    }

    //life cycle
    useEffect(() => {
        getAllProducts()
    }, [])

    return (
        <Layout>
            <div className='fluid-container m-3 p-3'>
                <div className='row'>
                    <div className='col-lg-3 col-md-3 col-sm-4'>
                        <AdminMenu />
                    </div>
                    <div className='col-lg-9 col-md-9 col-sm-8'>
                        <h1 className='text-center'>All Products List</h1>
                        <div className='d-flex'>
                            {products?.map(p => (
                                <Link to={`/dashboard/admin/product/${p.slug}`} key={p._id} className='product-link'>
                                    <div className="card m-3" style={{ width: '18rem' }}>
                                        <img src={`${process.env.REACT_APP_API}/api/v1/product/product-photo/${p._id}`} className="card-img-top" alt={p.name} />
                                        <div className="card-body">
                                            <h5 className="card-title">{p.name}</h5>
                                            <p className="card-text">{p.description}.</p>
                                            
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>

                </div>
            </div>
        </Layout>
    )
}

export default Products