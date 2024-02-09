import React from 'react';
import { NavLink, Link } from "react-router-dom"
import ShoppingBagOutlinedIcon from '@mui/icons-material/ShoppingBagOutlined';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { useAuth } from '../../context/auth';
import SearchInput from '../Forms/SearchInput';
import useCategory from '../../hooks/useCategory';
import { useCart } from '../../context/cart';
import { Badge } from 'antd';


const Header = () => {
  const [auth, setAuth] = useAuth();
  const categories = useCategory();
  const [cart] = useCart();

  const handleLogout = () => {
    setAuth({
      user: null,
      token: ''
    });
    localStorage.removeItem("auth");
    alert("Logout Successfully");
  };

  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary sticky-top"> {/* Added sticky-top class here */}
      <div className="container-fluid">
        <Link to='/' className="navbar-brand"> <ShoppingBagOutlinedIcon style={{ fontSize: '35px', paddingBottom: '2px' }} /> Muzammil's Market</Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon" />
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
            <SearchInput />
            <li className="nav-item">
              <NavLink to='/' className="nav-link" aria-current="page">Home</NavLink>
            </li>

            <li className="nav-item dropdown">
              <Link className="nav-link dropdown-toggle" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                Categories
              </Link>
              <ul className="dropdown-menu">
                <li><Link className="dropdown-item" to={`/categories`}>All Categories</Link></li>
                {categories?.map(c => (
                  <li key={c.name}><Link className="dropdown-item" to={`/category/${c.slug}`}>{c.name}</Link></li>
                ))}
              </ul>
            </li>

            {
              !auth.user ? (
                <>
                  <li className="nav-item">
                    <NavLink to='/register' className="nav-link">Register</NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink to='/login' className="nav-link">Login</NavLink>
                  </li>
                </>
              ) :
                (
                  <>
                    <li className="nav-item dropdown">
                      <NavLink className="nav-link dropdown-toggle" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                        {auth?.user?.name}
                      </NavLink>
                      <ul className="dropdown-menu">
                        <li><NavLink className="dropdown-item" to={`/dashboard/${auth?.user?.role === 1 ? 'admin' : 'user'}`}>Dashboard</NavLink></li>
                        <li><NavLink onClick={handleLogout} to='/login' className="dropdown-item"><button className="Btn">
                          <div className="sign"><svg viewBox="0 0 512 512"><path d="M377.9 105.9L500.7 228.7c7.2 7.2 11.3 17.1 11.3 27.3s-4.1 20.1-11.3 27.3L377.9 406.1c-6.4 6.4-15 9.9-24 9.9c-18.7 0-33.9-15.2-33.9-33.9l0-62.1-128 0c-17.7 0-32-14.3-32-32l0-64c0-17.7 14.3-32 32-32l128 0 0-62.1c0-18.7 15.2-33.9 33.9-33.9c9 0 17.6 3.6 24 9.9zM160 96L96 96c-17.7 0-32 14.3-32 32l0 256c0 17.7 14.3 32 32 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32l-64 0c-53 0-96-43-96-96L0 128C0 75 43 32 96 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32z" /></svg></div>
                          <div className="text">Logout</div>
                        </button></NavLink></li>


                      </ul>
                    </li>
                  </>
                )
            }
            <li className="nav-item">
              <Badge count={cart?.length} showZero>
                <NavLink to='/cart' className="nav-link"><ShoppingCartIcon /></NavLink>
              </Badge>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Header;
