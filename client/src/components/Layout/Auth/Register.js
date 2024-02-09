import React, { useState } from 'react';
import Layout from '../Layout';
import axios from "axios";
import { useNavigate } from "react-router-dom";
import GIF from "../../../images/Free Finance Animated GIF Icon Pack 1 - Google Slides - PPT & Google Slides Download.gif"

const Register = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [phone, setPhone] = useState("");
    const [address, setAddress] = useState("");
    const [answer, setAnswer] = useState("");
    const navigate = useNavigate();

    // Function for submitting form
    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const res = await axios.post(`${process.env.REACT_APP_API}/api/v1/auth/register`, {
                name,
                email,
                password,
                phone,
                address,
                answer
            });
            if (res.data.success) {
                alert(res.data && res.data.message);
                navigate('/login');
            } else {
                alert(res.data.message);
            }
        } catch (err) {
            console.log(err);
            alert("Something Went Wrong");
        }
    };

    return (
        <Layout title='Register E-commerce'>
            <div className='fluid-container'>
                <div className='row'>
                    <div className='col-lg-6 col-md-6 col-sm-12'>
                        <img src={GIF}></img>
                    </div>
                    <div className='col-lg-6 col-md-6 col-sm-12'>
                        <div className='register-top'>
                            <div className='register-container'>
                                <h1>Register</h1>
                                {/* Forms */}
                                <form onSubmit={handleSubmit} className="register-form">
                                    {/* Name input */}
                                    <div className="form-floating mb-3">
                                        <input onChange={(event) => setName(event.target.value)} value={name} type="text" id="floatingName" className="form-control" required />
                                        <label className="form-label" htmlFor="floatingName">Name</label>
                                    </div>
                                    {/* Email input */}
                                    <div className="form-floating mb-3">
                                        <input onChange={(event) => setEmail(event.target.value)} value={email} type="email" id="floatingEmail" className="form-control" required />
                                        <label className="form-label" htmlFor="floatingEmail">Email address</label>
                                    </div>
                                    {/* Password input */}
                                    <div className="form-floating mb-3">
                                        <input onChange={(event) => setPassword(event.target.value)} value={password} type="password" id="floatingPassword" className="form-control" required />
                                        <label className="form-label" htmlFor="floatingPassword">Password</label>
                                    </div>
                                    {/* Phone input */}
                                    <div className="form-floating mb-3">
                                        <input onChange={(event) => setPhone(event.target.value)} value={phone} type='tel' id="floatingPhone" className="form-control" required />
                                        <label className="form-label" htmlFor="floatingPhone">Phone</label>
                                    </div>
                                    {/* Address input */}
                                    <div className="form-floating mb-3">
                                        <input onChange={(event) => setAddress(event.target.value)} value={address} type='text' id="floatingAddress" className="form-control" required />
                                        <label className="form-label" htmlFor="floatingAddress">Address</label>
                                    </div>
                                    {/* Answer input */}
                                    <div className="form-floating mb-3">
                                        <input onChange={(event) => setAnswer(event.target.value)} value={answer} type='text' id="floatingAnswer" className="form-control" required />
                                        <label className="form-label" htmlFor="floatingAnswer">Your Best Friend Name</label>
                                    </div>
                                    {/* Submit button */}
                                    <button type="submit" className="btn btn-primary btn-block">Register</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </Layout>
    );
};

export default Register;
