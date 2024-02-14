import React from 'react'
import Layout from '../components/Layout/Layout'
import { NavLink } from 'react-router-dom'

const Contact = () => {
    return (
        <Layout title='Contact E-commerce'>
            <>
                <div className='container-fluid contact-top mt-5'>
                    <div className='row'>
                        <div className='col-lg-6 col-md-6 col-sm-12'>
                            <h1>Get In Touch!</h1>
                            <h6>At Muzammil's Market, we believe in more than just selling products; we're here to create connections and make your shopping experience as smooth and enjoyable as possible. Whether you're searching for the perfect gift, stocking up on household essentials, or embarking on a culinary adventure, our expansive marketplace offers something for everyone. From handcrafted jewelry reflecting ancient traditions to cutting-edge gadgets simplifying your daily routine, each item tells a unique story and holds the potential to spark joy. But we understand that navigating this diverse landscape can be overwhelming. That's why our dedicated customer service team is always just a click, call, or social media message away. They're passionate about understanding your needs and helping you find the perfect match, every time. Need help comparing features of kitchen appliances? Uncertain about sizing options for clothing? Worried about shipping timelines? Our friendly experts are here to guide you through the process, answer your questions with transparency, and ensure a purchase you'll truly love. And if for any reason your chosen item doesn't quite meet your expectations, our flexible return and exchange policies offer peace of mind. Remember, at Muzammil's Market, it's not just about the products; it's about building trust, fostering communication, and creating a shopping experience that leaves you feeling confident and satisfied. So, come explore our virtual aisles, reach out to our knowledgeable team, and discover the difference shopping with care and commitment can make!</h6>
                        </div>
                    </div>
                </div>

                <div className='container contact-form mt-2'>
                    <div className='row'>

                        <div className='col-lg-6 col-md-6 col-sm-12 contact-form-class'>
                            <form>
                                <h1>Contact Us</h1>
                                <div className="mb-3">
                                    <label htmlFor="name" className="form-label">Your Name</label>
                                    <input type="text" className="form-control" id="name" name="name" required />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="email" className="form-label">Your Email</label>
                                    <input type="email" className="form-control" id="email" name="email" required />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="comments" className="form-label">Comments</label>
                                    <textarea className="form-control" id="comments" name="comments" rows={4} required defaultValue={""} />
                                </div>
                                <button type="submit" className="btn btn-light">Submit</button>
                            </form>

                        </div>
                    </div>
                </div>

                <div className='container-fluid mt-4 social-contact'>
                    <div className='row'>
                        <div className='col-lg-6 col-md-6 col-sm-6'></div>
                        <div className='col-lg-6 col-md-6 col-sm-12 social-thougths'>
                             <h1 className='social-h1'>Or Contact Us Through</h1>
                             <div className='mt-3'>
                               <h1><i class="fa-brands fa-whatsapp"></i> +923437225876</h1>
                               <h1><i class="fa-brands fa-facebook"></i><NavLink style={{color:'white'}} target='_blank' to='https://www.facebook.com/muzammilk223?mibextid=ZbWKwL'> Facebook</NavLink></h1>
                               <h1><i class="fa-brands fa-linkedin"></i><NavLink style={{color:'white'}} target='_blank' to='https://www.linkedin.com/in/muzammil-khan-018a92206/'> LinkedIn</NavLink></h1>
                               <h1><i class="fa-brands fa-github"></i><NavLink style={{color:'white'}} target='_blank' to='https://github.com/kmuzzi10'> GitHub</NavLink></h1>
                             </div>
                        </div>
                    </div>
                </div>
            </>
        </Layout>
    )
}

export default Contact