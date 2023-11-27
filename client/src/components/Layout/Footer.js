import React from 'react';
import { Link } from 'react-router-dom';
import CopyrightSharpIcon from '@mui/icons-material/CopyrightSharp';

const Footer = () => {
  return (
    <div className='bg-dark text-light p-3 footer'>
        <h4 className='text-center'><CopyrightSharpIcon style={{fontSize:'30px'}}/> Muzammil Ahmed Khan </h4>
        <p className='text-center mt-3'>
         <Link to='/about'>About</Link>
          |
         <Link to='/contact'>Contact</Link>
          |
         <Link to='/policy'>Privacy Policy</Link>
        </p>
    </div>
  )
}

export default Footer