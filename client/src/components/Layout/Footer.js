import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';



const Footer = () => {

  const [year, setYear] = useState("")

  const day = () => {
    const date = new Date()
    const year = date.getFullYear()
    setYear(year)
  }

  useEffect(() => {
    day()
  }, [])

  return (
    <div>
      <footer className="bg-dark text-center text-white pt-5 mt-5">

        <div className="container d-flex justify-content-center mb-4">
          <NavLink className='nav-link mx-3' to={`/about`}>About</NavLink>
          <NavLink className='nav-link mx-3' to={`/contact`}>Contact</NavLink>
          <NavLink className='nav-link mx-3' to={`/policy`}>Privacy Policy</NavLink>
        </div>


        {/* Grid container */}
        <div className="container p-4">
          {/* Section: Social media */}
          <section className="mb-4">
            {/* Facebook */}
            <NavLink className="btn btn-primary btn-floating m-1" style={{ backgroundColor: '#3b5998' }} role="button"><i className="fab fa-facebook-f" /></NavLink>
            {/* Twitter */}
            <NavLink className="btn btn-primary btn-floating m-1" style={{ backgroundColor: '#55acee' }} role="button"><i className="fab fa-twitter" /></NavLink>
            {/* Google */}
            <NavLink className="btn btn-primary btn-floating m-1" style={{ backgroundColor: '#dd4b39' }} role="button"><i className="fab fa-google" /></NavLink>
            {/* Instagram */}
            <NavLink className="btn btn-primary btn-floating m-1" style={{ backgroundColor: '#ac2bac' }} role="button"><i className="fab fa-instagram" /></NavLink>
            {/* Linkedin */}
            <NavLink className="btn btn-primary btn-floating m-1" style={{ backgroundColor: '#0082ca' }} role="button"><i className="fab fa-linkedin-in" /></NavLink>
            {/* Github */}
            <NavLink className="btn btn-primary btn-floating m-1" style={{ backgroundColor: '#333333' }} role="button"><i className="fab fa-github" /></NavLink>
          </section>
          {/* Section: Social media */}
          {/* Section: Text */}
          <section className="mb-4">
            <p>
              Shopping Made Happy
              ️ Groceries, gadgets, gizmos & more - find it all at Muzammil Market!

              ✨ Discover top-notch quality at prices that make you smile

              Join our friendly community of happy shoppers!

              Convenient shopping delivered straightclassName='nav-link' to your door

              Shop local, support your community, and feel good doing it!

              ⏰ Don't wait, explore Muzammil Market today!

              #ShopHappy #ShopLocal #MuzammilMarket #ShoppingSpree #DealsGalore #QualityFirst #CommunityVibes #ConvenienceDelivered #SupportLocalBusiness
            </p>
          </section>
          {/* Section: Text */}
        </div>
        {/* Grid container */}
        {/* Copyright */}
        <div className="text-center p-3" style={{ backgroundColor: 'rgba(0, 0, 0, 0.2)' }}>
          © {year} Copyright: Muzammil Ahmed Khan
        </div>
        {/* Copyright */}
      </footer>
      {/*Footer */}
    </div>

  )
}

export default Footer