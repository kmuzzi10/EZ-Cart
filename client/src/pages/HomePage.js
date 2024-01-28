import React, { useState, useEffect } from 'react'
import Layout from '../components/Layout/Layout'
import { useAuth } from '../context/auth'
import axios from 'axios'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { Checkbox, Radio } from 'antd';
import { Prices } from '../components/Prices';

const HomePage = () => {
  const [auth, setAuth] = useAuth();
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [checked, setChecked] = useState([]);
  const [radio, setRadio] = useState([]);

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
  //filter for category
  const handleFilter = (value, id) => {
    let all = [...checked];
    if (value) {
      all.push(id);
    } else {
      all = all.filter(c => c !== id);
    };
    setChecked(all)
  };
  useEffect(() => {
    if (!checked.length || !radio.length) getAllCategory();

  }, [checked.length, radio.length])


  //filter product function

  const filterProduct = async () => {
    try {
      const { data } = await axios.post(`${process.env.REACT_APP_API}/api/v1/product/product-filters`, { checked, radio })
      setProducts(data?.products)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    if (checked.length || radio.length) filterProduct()
  }, [checked, radio])


  return (
    <Layout title='All Products - Best Offers!'>
      <div className='fluid-container mt-3'>
        <div className='row'>
          <div className='col-lg-2 col-md-2 col-sm-2 text-center'>
            <h4>Filters by Category</h4>
            <div className='d-flex flex-column'>
              {categories?.map(c => (
                <Checkbox key={c._id} onChange={(e) => handleFilter(e.target.checked, c._id)}>
                  {c.name}
                </Checkbox>
              ))}
            </div>
            {/*price filter*/}
            <h4 style={{ textAlign: 'left' }}>Filters by Prices</h4>
            <div style={{ textAlign: 'left' }} className='d-flex flex-column'>
              <Radio.Group onChange={e => setRadio(e.target.value)}>
                {Prices?.map(p => (
                  <div key={p._id}>
                    <Radio value={p.array}>{p.name}</Radio>
                  </div>
                ))}
              </Radio.Group>
            </div>
            <div style={{ textAlign: 'left' }} className='d-flex flex-column'>
              <button className='btn btn-danger mt-3' onClick={() => window.location.reload()}>RESET FILTERS</button>
            </div>
          </div>

          <div className='col-lg-10 col-md-10 col-sm-10 text-center'>
            <h1>All products</h1>
            <div className='d-flex flex-wrap'>
              {products?.map(p => (

                <div className="card m-3" style={{ width: '18rem' }}>
                  <img src={`${process.env.REACT_APP_API}/api/v1/product/product-photo/${p._id}`} className="card-img-top" alt={p.name} />
                  <div className="card-body">
                    <h5 className="card-title">{p.name}</h5>
                    <p className="card-text">{p.description.substring(0, 30)}.</p>
                    <p className="card-text">$ {p.price}</p>
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