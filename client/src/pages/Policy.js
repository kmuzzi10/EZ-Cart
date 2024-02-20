import React from 'react'
import Layout from '../components/Layout/Layout'
import privacyOne from "../images/privacyOne.jpg"

const Policy = () => {
    return (
        <Layout title='Policy E-commerce'>
            <div className='container mt-4'>
                <h1 className='heading-policy ml-2'>Privacy Policy</h1>
                <div className='row'>
                    <div className='col-lg-6 col-md-6 col-sm-12'>
                        <p>At Muzammil's Market, we are committed to protecting your privacy and ensuring the security of your personal information. This Privacy Policy outlines how we collect, use, disclose, and protect the information you provide to us when you visit our website or use our services.</p>
                    </div>
                    <div className='col-lg-6 col-md-6 col-sm-12'>
                        <img className='privacyOne-img' src={privacyOne} />
                    </div>
                </div>
            </div>

            <div className='fluid-container mt-5 after-top'>
                <div className='row'>
                    <div className='col-lg-6 col-md-6 col-sm-6'>
                        <h1 style={{ marginLeft: '15px' }} className='heading-policy'>Information We Collect:</h1>
                        <ul>
                            <li>Personal Information: When you create an account, place an order, or contact us, we may collect personal information such as your name, email address, shipping address, and payment details.</li>
                            <li>Usage Information: We may collect information about how you interact with our website, including your browsing history, device information, and IP address.</li>
                            <li>Cookies: We use cookies and similar tracking technologies to enhance your browsing experience and analyze website traffic.</li>
                        </ul>
                    </div>
                </div>
            </div>

            <div className='container black-board mt-5'>
                <div className='row'>
                    <div className='col-lg-3 col-md-3 col-sm-6'>
                        <h3>Our Commitment to Privacy</h3>
                        <ul>
                            <li>We prioritize the protection of your personal information.</li>
                            <li>We adhere to strict security measures to safeguard your data.</li>
                            <li>We are transparent about our data collection and usage practices.</li>
                        </ul>
                    </div>
                    <div className='col-lg-6 col-md-6 col-sm-6'>
                        <h1>Information We Collect</h1>
                        <ul>
                            <li>Personal Information: Name, email address, shipping address, etc.</li>
                            <li>Usage Information: Browsing history, device information, IP address, etc.</li>
                            <li>Cookies: Usage of cookies and similar tracking technologies for enhanced browsing experience.</li>
                        </ul>
                    </div>
                    <div className='col-lg-3 col-md-3 col-sm-6'>
                        <h3>How We Use Your Information</h3>
                        <ul>
                            <li>Order Processing: Fulfilling orders and communicating order status.</li>
                            <li>Personalization: Tailoring your shopping experience and providing recommendations.</li>
                            <li>Personalization: Tailoring your shopping experience and providing recommendations.</li>
                        </ul>
                    </div>
                </div>
            </div>

        </Layout>
    )
}

export default Policy