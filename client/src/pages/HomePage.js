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
import Card from "../components/Cards.js"
import Shirts from "../images/37775.jpg"
import Jeans from "../images/5822.jpg"
import Hoodie from "../images/5173.jpg"
import Glasses from "../images/view-heart-shapes-sunglasses.jpg"
import Bracelets from "../images/pair-gold-bangles-with-diamonds-side.jpg"
import Cosmetics from "../images/2151053864.jpg"
import Jewellery from "../images/shiny-gold-jewelry-symbol-wealth-generated-by-ai.jpg"
import Shoes from "../images/3726.jpg"
import GIF from "../images/Free E-commerce Animated GIF Icon Pack 3 - Google Slides - PPT & Google Slides Download.gif"
import clip from "../images/clipart1519494.png"



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
  const [cart, setCart] = useCart();
  const [open, setOpen] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false); // State to track login status

  useEffect(() => {
    setLoggedIn(!!auth.token); // Set loggedIn to true if auth token exists
  }, [auth.token]);

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

  const addToCart = async (productId) => {
    try {
      if (!loggedIn) { // Check if user is logged in
        alert('Please login to add items to your cart'); // Display alert if not logged in
        navigate('/login')
        return;
      }
      await axios.post(`${process.env.REACT_APP_API}/api/v1/cart/add-to-cart`, {
        userId: auth.user._id,
        productId: productId,
        quantity: 1
      });
      setOpen(true);
    } catch (error) {
      console.error(error);
    }
  };

  const getAllProducts = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(`${process.env.REACT_APP_API}/api/v1/product/product-list/${page}`);
      setLoading(false);
      setProducts(data.products);
    } catch (err) {
      setLoading(false);
      console.log(err);
    }
  };

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

      <div className='container-fluid mt-3 home-top'>
        <div className='row'>
          <div className='col-lg-6 col-md-6 col-sm-12'>
            <h1>Welcome to Muzammil's Market</h1>
            <h6>Welcome to Muzammil's Market, your one-stop destination for all your shopping needs! Explore our diverse range of products carefully curated to cater to your lifestyle, from the latest gadgets to trendy fashion pieces and everything in between. Whether you're searching for high-quality electronics, stylish apparel, home essentials, or unique gifts, we've got you covered.

              At Muzammil's Market, we pride ourselves on providing a seamless and enjoyable shopping experience. With user-friendly navigation and secure payment options, you can shop with confidence, knowing that your satisfaction is our top priority. Plus, our responsive customer support team is always here to assist you every step of the way.

              Discover the convenience of online shopping with Muzammil's Market. Browse our extensive collection, take advantage of exclusive deals and promotions, and enjoy fast and reliable delivery straight to your doorstep. Join our growing community of satisfied customers and experience the joy of finding exactly what you need, all in one place.

              Start exploring now and let Muzammil's Market enhance your shopping journey today!</h6>
          </div>
          <div className='col-lg-6 col-md-6 col-sm-12'>
            <img src={clip}></img>
          </div>

        </div>

      </div>
      <div className='container GIF'>
        <div className='row'>
          <div className='col-lg-12 col-md-12 col-sm-12'>
            <img src={GIF}></img>
          </div>
        </div>
      </div>
      <div className='container-fluid home-next'>
        <div className='row after-home'>
          <h1>Products We Offer</h1>
          <div className='col-lg-3 col-md-6 col-sm-12'>
            <Card header="Shirts" source={Shirts} title=" Stylish Shirts for Every Occasion" para=" Elevate your wardrobe with our collection of trendy and versatile shirts. From classic button-downs to casual tees, we offer a range of styles and colors to suit any taste. Explore our selection and find the perfect shirt to express your unique style." />
          </div>
          <div className='col-lg-3 col-md-6 col-sm-12'>
            <Card header="Denim Essentials" source={Jeans} title="Jeans for All" para="Discover the ultimate staple piece for any wardrobe with our premium denim collection. Whether you prefer skinny, straight-leg, or relaxed fit, our jeans are crafted for comfort and style. Browse through our assortment of washes and cuts to find your ideal pair of jeans today." />
          </div>
          <div className='col-lg-3 col-md-6 col-sm-12'>
            <Card header="Cozy Comfort" source={Hoodie} title="Hoodies for All Seasons" para="Stay warm and stylish with our collection of cozy hoodies. Perfect for lounging at home or layering up for outdoor adventures, our hoodies combine comfort and fashion effortlessly. Explore our range of colors and designs to find your new favorite go-to hoodie." />
          </div>
          <div className='col-lg-3 col-md-6 col-sm-12'>
            <Card header=" Frame Your Style" source={Glasses} title="Trendy Glasses" para="Add a touch of sophistication to your look with our fashionable eyewear collection. Whether you're in need of prescription glasses or just want to accessorize with sunglasses, we have a variety of frames to suit every face shape and style preference. Explore our selection and find the perfect pair to elevate your look." />
          </div>
        </div>
        <div className='row mt-2'>
          <div className='col-lg-3 col-md-6 col-sm-12'>
            <Card header="Arm Candy" source={Bracelets} title="Stylish Bracelets" para="Make a statement with our chic and trendy bracelets. From dainty chains to bold cuffs, our collection features a variety of designs to complement any outfit. Whether you're looking for something subtle for everyday wear or a statement piece for a special occasion, our bracelets are sure to add the perfect finishing touch to your ensemble." />
          </div>
          <div className='col-lg-3 col-md-6 col-sm-12'>
            <Card header=" Enhance Your Beauty" source={Cosmetics} title="Cosmetics Essentials" para=" Discover a world of beauty with our premium cosmetics collection. From luxurious skincare products to glamorous makeup essentials, we offer everything you need to pamper yourself and enhance your natural beauty. Explore our range of high-quality cosmetics and unleash your inner glow." />
          </div>
          <div className='col-lg-3 col-md-6 col-sm-12'>
            <Card header=" Sparkle and Shine" source={Jewellery} title="Exquisite Jewelry" para="Elevate your look with our stunning jewelry collection. From elegant necklaces to statement earrings, our pieces are designed to add a touch of glamour to any outfit. Crafted with precision and attention to detail, our jewelry is perfect for special occasions or everyday wear. Explore our collection and find the perfect piece to express your unique style." />
          </div>
          <div className='col-lg-3 col-md-6 col-sm-12'>
            <Card header="Step into Style" source={Shoes} title="Fashionable Footwear" para="Complete your look with our stylish footwear collection. From casual sneakers to sophisticated heels, our shoes are crafted for comfort and designed to make a statement. Whether you're dressing up for a night out or keeping it casual for a day on the town, our diverse selection of shoes has something for every occasion. Explore our range and step into style today
" />
          </div>
        </div>
      </div>

      <div className='container'>
        <div className='row'>
          <div className='col-lg-12 col-md-12 col-sm-12 gift-box'>
            <h1 style={{ color: 'white',fontSize:'150px',textAlign:'center' }}>More Products?<br />Scroll Down <br />⤵</h1>
          </div>
        </div>
      </div>

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
                  <div className="card homepage-card">
                    <img src={`${process.env.REACT_APP_API}/api/v1/product/product-photo/${p._id}`} className="card-img-top img-fluid" alt={p.name} />
                    <div style={{ fontFamily: 'cursive' }} className="card-body">
                      <h5 className="card-title">{p.name}</h5>
                      <p className="card-text">{p.description.substring(0, 50)}...</p>
                      <p className="card-text">$ {p.price}</p>
                      <div className="d-flex justify-content-between">
                        <button className='btn btn-primary' onClick={() => navigate(`/product/${p.slug}`)}>More Details</button>
                        <button className='btn btn-secondary' onClick={() => addToCart(p._id)}>
                          <ShoppingCartIcon /> Add to Cart</button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <Snackbar
              open={open}
              autoHideDuration={1100}
              onClose={handleClose}
              message="Item added to the cart successfully"
            />
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
