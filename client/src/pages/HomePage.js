import React, { useState, useEffect } from 'react'
import Layout from '../components/Layout/Layout'
import { useAuth } from '../context/auth'
import axios from 'axios'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { Checkbox } from 'antd';

const HomePage = () => {
  const [auth, setAuth] = useAuth();
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);

  //get products

  const getAllProducts = async () => {
    try {
      const { data } = await axios.get(`${process.env.REACT_APP_API}/api/v1/product/get-product`);
      setProducts(data.products);
    } catch (err) {
      if (err.response) {
        // Server responded with a status other than 200 range
        console.log(err.response.data);
        console.log(err.response.status);
        console.log(err.response.headers);
      } else if (err.request) {
        // Request was made but no response received
        console.log(err.request);
      } else {
        // Something else happened in making the request
        console.log('Error', err.message);
      }
      alert("Something went wrong getting products");
    }
  };


  useEffect(() => {
    getAllProducts()
  }, [])

  //get All categories
  const getAllCategory = async () => {
    try {
      const { data } = await axios.get(`${process.env.REACT_APP_API}/api/v1/category/get-category`);
      if (data?.success) {
        setCategories(data?.category)
      }
    } catch (err) {
      console.log(err)
      alert('Something went wrong in getting categories')
    }
  }

  useEffect(() => {
    getAllCategory()
  }, [])

  return (
    <Layout title='All Products - Best Offers!'>
      <div className='fluid-container mt-3'>
        <div className='row'>
          <div className='col-lg-3 col-md-3 col-sm-3 text-center'>
            <h4>Filters by category</h4>
            <div className='d-flex flex-column ml-3'>
              {categories?.map(c => (
                <Checkbox key={c._id} onChange={(e) => console.log(e)}>
                  {c.name}
                </Checkbox>
              ))}
            </div>
          </div>
          <div className='col-lg-9 col-md-9 col-sm-9 text-center'>
            <h1>All products</h1>
            <div className='d-flex flex-wrap'>
              {products?.map(p => (

                <div className="card m-3" style={{ width: '18rem' }}>
                  <img src={`${process.env.REACT_APP_API}/api/v1/product/product-photo/${p._id}`} className="card-img-top" alt={p.name} />
                  <div className="card-body">
                    <h5 className="card-title">{p.name}</h5>
                    <p className="card-text">{p.description}.</p>
                    <button className='btn btn-primary lh-1'>More Details</button>
                    <button className='btn btn-secondary mt-3'>Add to Cart<ShoppingCartIcon /></button>
                  </div>
                </div>

              ))}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default HomePage