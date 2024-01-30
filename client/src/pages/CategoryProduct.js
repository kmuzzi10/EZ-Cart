import React, { useEffect, useState } from 'react'
import Layout from '../components/Layout/Layout'
import axios from "axios"
import { useParams } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';


const CategoryProduct = () => {
    const [products, setProducts] = useState([])
    const [category, setCategory] = useState([])
    const params = useParams();
    const navigate = useNavigate()

    useEffect(() => {
        if (params?.slug) getProductsByCat()
    }, [params?.slug])

    const getProductsByCat = async () => {
        const { data } = await axios.get(`${process.env.REACT_APP_API}/api/v1/product/product-category/${params.slug}`)
        setProducts(data?.products)
        setCategory(data?.category)
    }

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
                                        <button className='btn btn-secondary'><ShoppingCartIcon /> Add to Cart</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </Layout>
    )
}

export default CategoryProduct