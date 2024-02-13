import React from 'react'
import Layout from '../components/Layout/Layout'
import shoppingCartPic from "../images/shoppingCart.jpg"
import customer from "../images/customer.jpg"
import user1 from "../images/user1.jpg"
import user2 from "../images/user2.webp"
import user3 from "../images/user3.jpg"
import user4 from "../images/user4.jpg"


//import ends

const About = () => {
    return (
        <Layout title='About E-commerce'>
            <>
                <div className='container'>
                    <h1 className='about-heading' style={{ textAlign: 'center' }}>About Us</h1>
                    <br /> <br />
                    <div className='row'>
                        <div className='col-lg-6 col-md-6 col-sm-12 about-para'>
                            <p>Welcome to Muzammil's Market, your ultimate destination for an eclectic array of products! Here at Muzammil's Market, we offer a diverse selection of items to suit every taste and need. From trendy fashion pieces to state-of-the-art gadgets, from home essentials to unique gifts, we have something for everyone. Our mission is to provide our customers with an unmatched shopping experience, combining top-notch quality, affordability, and convenience. With a passion for innovation and a commitment to excellence, we continuously strive to exceed expectations and become your trusted one-stop shop for all your shopping desires. Join us on this exciting journey and explore the endless possibilities at Muzammil's Market!</p>
                        </div>
                        <div className='col-lg-6 col-md-6 col-sm-12'>
                            <img src={shoppingCartPic} className="img-fluid" alt="..." />
                        </div>
                    </div>
                </div>

                <div className='container after-first'>
                    <div className='row'>
                        <div className='col-lg-6 col-md-6 col-sm-12'>
                            <img src={customer} className="img-fluid" alt="..." />
                        </div>
                        <div className='col-lg-6 col-md-6 col-sm-12 about-para'>
                            <p>At Muzammil's Market, we prioritize building strong and lasting relationships with our customers through exceptional service and support. We understand that customer satisfaction is paramount, which is why we go above and beyond to ensure a seamless and enjoyable shopping experience. Our dedicated team is committed to providing personalized assistance, promptly addressing any inquiries or concerns, and offering expert guidance to help customers make informed decisions. We value transparency and integrity in all our interactions, striving to cultivate trust and loyalty with every transaction. From prompt order processing and secure payment options to hassle-free returns and efficient resolution of issues, we make it our mission to exceed customer expectations at every turn. At Muzammil's Market, our customers are not just patrons – they are valued members of our community, and we are dedicated to their happiness and satisfaction every step of the way.</p>
                        </div>
                    </div>
                </div>

                <div className='container-fluid after-second mt-5'>
                <h1 className='about-heading' style={{ textAlign: 'center',  marginBottom:'20px' }}>Customer Reviews</h1>
                    <div className='row mt-5'>
                        <div className='col-lg-3 col-md-4 col-sm-6'>
                            <div className="review-card">
                                <div className="user-info">
                                    <img src={user1} alt="User 1" className="img-fluid" />
                                    <h3 className="user-name">Emily Smith</h3>
                                </div>
                                <p className="review-text">
                                    "Absolutely love shopping at Muzammil's Market! The selection is amazing, and the customer service is top-notch. Will definitely be coming back for more!"
                                </p>
                            </div>
                        </div>
                        <div className='col-lg-3 col-md-4 col-sm-6'>
                            <div className="review-card">
                                <div className="user-info">
                                    <img src={user2} alt="User 2" className="img-fluid" />
                                    <h3 className="user-name">John Doe</h3>
                                </div>
                                <p className="review-text">
                                    "Muzammil's Market has become my go-to for all my shopping needs. The quality of products and the efficiency of service are unmatched. Highly recommend!"
                                </p>
                            </div>
                        </div>
                        <div className='col-lg-3 col-md-4 col-sm-6'>
                            <div className="review-card">
                                <div className="user-info">
                                    <img src={user3} alt="User 3" className="img-fluid" />
                                    <h3 className="user-name">Sophia Johnson</h3>
                                </div>
                                <p className="review-text">
                                    "I've had a fantastic experience shopping at Muzammil's Market. The website is easy to navigate, and the delivery was swift. Will be shopping here again!"
                                </p>
                            </div>
                        </div>
                        <div className='col-lg-3 col-md-4 col-sm-6'>
                            <div className="review-card">
                                <div className="user-info">
                                    <img src={user4} alt="User 4" className="img-fluid" />
                                    <h3 className="user-name">Michael Brown</h3>
                                </div>
                                <p className="review-text">
                                    "Muzammil's Market exceeded my expectations! The product range is diverse, and the prices are competitive. I'm impressed with their commitment to customer satisfaction."
                                </p>
                            </div>
                        </div>
                    </div>

                </div>

            </>
        </Layout>
    )
}

export default About