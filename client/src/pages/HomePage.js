import React, { useState, useEffect } from 'react';
import Layout from '../components/Layout/Layout';
import { useAuth } from '../context/auth';
import axios from 'axios';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { Checkbox, Radio } from 'antd';
import { Prices } from '../components/Prices';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/cart';
import Snackbar from '@mui/material/Snackbar';



const HomePage = () => {
  const [auth, setAuth] = useAuth();
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [checked, setChecked] = useState([]);
  const [radio, setRadio] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [cart, setCart] = useCart()
  const [open, setOpen] = useState(false);

  // Get all categories
  const getAllCategory = async () => {
    try {
      const { data } = await axios.get(`${process.env.REACT_APP_API}/api/v1/category/get-category`);
      if (data?.success) {
        setCategories(data?.category);
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getAllCategory();
    getTotal();
  }, []);

  // Get products
  const getAllProducts = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(`${process.env.REACT_APP_API}/api/v1/product/product-list/${page}`);
      setLoading(false);
      setProducts(data.products);
    } catch (err) {
      setLoading(false);
      console.log(err);
      // alert('Something went wrong getting products');
    }
  };

  // Get total count
  const getTotal = async () => {
    try {
      const { data } = await axios.get(`${process.env.REACT_APP_API}/api/v1/product/product-count`);
      setTotal(data?.total);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (page === 1) return;
    loadMore();
  }, [page]);

  // Load more products
  const loadMore = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(`${process.env.REACT_APP_API}/api/v1/product/product-list/${page}`);
      setLoading(false);
      setProducts([...products, ...data?.products]);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  // Filter for category
  const handleFilter = (value, id) => {
    let all = [...checked];
    if (value) {
      all.push(id);
    } else {
      all = all.filter(c => c !== id);
    }
    setChecked(all);
  };

  useEffect(() => {
    if (!checked.length || !radio.length) getAllProducts();
  }, []);

  useEffect(() => {
    if (checked.length || radio.length) filterProduct();
  }, [checked, radio]);

  // Filter product function
  const filterProduct = async () => {
    try {
      const { data } = await axios.post(`${process.env.REACT_APP_API}/api/v1/product/product-filters`, { checked, radio });
      setProducts(data?.products);
    } catch (error) {
      console.log(error);
    }
  };


  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };


  return (
    <Layout title='All Products - Best Offers!'>
      <div className='container-fluid mt-3'>
        <div className='row'>
          <div className='col-lg-2 col-md-2 col-sm-2'>
            <h4 style={{ fontFamily: 'cursive' }}>Filters by Category</h4>
            <div style={{ fontFamily: 'cursive' }} className='d-flex flex-column'>
              {categories?.map(c => (
                <Checkbox key={c._id} onChange={(e) => handleFilter(e.target.checked, c._id)}>
                  {c.name}
                </Checkbox>
              ))}
            </div>
            {/* Price filter */}
            <h4 style={{ fontFamily: 'cursive' }}>Filters by Prices</h4>
            <div style={{ fontFamily: 'cursive' }} className='d-flex flex-column'>
              <Radio.Group onChange={e => setRadio(e.target.value)}>
                {Prices?.map(p => (
                  <div key={p._id}>
                    <Radio value={p.array}>{p.name}</Radio>
                  </div>
                ))}
              </Radio.Group>
            </div>
            <div className='d-flex flex-column'>
              <button className='btn btn-danger mt-3' onClick={() => window.location.reload()}>RESET FILTERS</button>
            </div>
          </div>
          <div className='col-lg-10 col-md-10 col-sm-10'>
            <h1 style={{ fontFamily: 'cursive' }} className='text-center'>All products</h1>
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
                        <button className='btn btn-secondary'
                          onClick={() => {
                            setCart([...cart, p])
                            localStorage.setItem('cart', JSON.stringify([...cart, p]))
                            setOpen(true)
                          }}>
                          <ShoppingCartIcon /> Add to Cart</button>
                        <Snackbar
                          open={open}
                          autoHideDuration={1100}
                          onClose={handleClose}
                          message="Item added to the cart successfully"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className='m-2 p-3'>
              {products && products.length < total && (
                <button className='btn btn-warning'
                  onClick={
                    (e) => {
                      e.preventDefault();
                      setPage(page + 1);
                    }
                  }
                >
                  {loading ? 'Loading..' : 'Load More Products'}
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default HomePage;
