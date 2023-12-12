import React, { useState } from 'react'
import Layout from '../Layout'
import axios from "axios"
import { useNavigate, useLocation,NavLink } from "react-router-dom"
import { useAuth } from '../../../context/auth'
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // eslint-disable-next-line
  const [auth, setAuth] = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const res = await axios.post(`${process.env.REACT_APP_API}/api/v1/auth/login`,
        { email, password }
      );
      if (res.data.success) {
        alert(res.data && res.data.message);
        setAuth({
          user: res.data.user,
          token: res.data.token
        })
        localStorage.setItem("auth", JSON.stringify(res.data))
        navigate(location.state || '/')
      } else {
        alert(res.data.message)
      }
    } catch (err) {
      console.log(err);
      alert("Somethig Went Wrong")
    }
  }


  return (
    <Layout title='Login E-commerce'>
      <div className='login'>
        <h1>Login</h1>
        <form onSubmit={handleSubmit}>
          {/* Email input */}
          <div data-mdb-input-init className="form-floating mb-3">
            <input onChange={(event) => setEmail(event.target.value)} value={email} type="email" id="floatingInput" className="form-control" required />
            <label className="form-label" htmlFor="floatingInput">Email address</label>
          </div>
          {/* Password input */}
          <div data-mdb-input-init className="form-floating mb-3">
            <input onChange={(event) => setPassword(event.target.value)} value={password} type="password" id="form1Example2" className="form-control" required />
            <label className="form-label" htmlFor="form1Example2">Password</label>
          </div>
          {/* 2 column grid layout for inline styling */}
          <div className="row mb-3">
            <div className="col">
              {/* Simple link */}
              <NavLink className='btn-login' to={'/forgot-password'}> Forgot password? </NavLink>
            </div>
          </div>
          <button data-mdb-ripple-init type="submit" className="btn btn-primary btn-block">Login</button>
        </form>
      </div>
    </Layout>
  )
}

export default Login