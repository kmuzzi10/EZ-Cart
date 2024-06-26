import React, { useState } from 'react';
import Layout from '../Layout';
import axios from "axios";
import { useNavigate, useLocation, NavLink } from "react-router-dom";
import { useAuth } from '../../../context/auth';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import GIF from "../../../../src/images/Free E-commerce Animated GIF Icon 1 - Google Slides - PPT & Google Slides Download.gif";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [auth, setAuth] = useAuth();
    const navigate = useNavigate();
    const location = useLocation();

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const res = await axios.post(`${process.env.REACT_APP_API}/api/v1/auth/login`, { email, password });
            if (res.data && res.data.success) {
                toast.success(res.data.message);
                setAuth({
                    user: res.data.user,
                    token: res.data.token
                });
                localStorage.setItem("auth", JSON.stringify(res.data));
                navigate(location.state || '/');
            } else {
                toast.error(res.data.message);
            }
        } catch (err) {
            console.log(err);
            toast.error("Something Went Wrong");
        }
    }

    return (
        <Layout title='Login E-commerce'>
            <div className='fluid-container'>
                <div className='row'>
                    <div className='col-lg-6 col-md-6 col-sm-12'>
                        <img src={GIF} alt="GIF"></img>
                    </div>
                    <div className='col-lg-6 col-md-6 col-sm-12'>
                        <div className='login-box'>
                            <div className='login-container'>
                                <h1>Login</h1>
                                <form onSubmit={handleSubmit} className="login-form">
                                    {/* Email input */}
                                    <div className="form-floating mb-3">
                                        <input onChange={(event) => setEmail(event.target.value)} value={email} type="email" id="floatingInput" className="form-control" required />
                                        <label className="form-label" htmlFor="floatingInput">Email address</label>
                                    </div>
                                    {/* Password input */}
                                    <div className="form-floating mb-3">
                                        <input onChange={(event) => setPassword(event.target.value)} value={password} type="password" id="form1Example2" className="form-control" required />
                                        <label className="form-label" htmlFor="form1Example2">Password</label>
                                    </div>
                                    {/* Links */}
                                    <div className="row mb-3">
                                        <div className="col">
                                            <NavLink className='btn-login' to={'/forgot-password'}> Forgot password? </NavLink>
                                            <br />
                                            <NavLink className='btn-login' to={'/register'}> Not have an account? </NavLink>
                                        </div>
                                    </div>
                                    {/* Submit button */}
                                    <button type="submit" className="btn btn-primary btn-block">Login</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <ToastContainer />
        </Layout>
    );
};

export default Login;
