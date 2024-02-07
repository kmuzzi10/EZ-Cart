import React, { useState } from 'react';
import Layout from '../Layout';
import axios from "axios";
import { useNavigate } from "react-router-dom";


const ForgotPassword = () => {
    const [email, setEmail] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [answer, setAnswer] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const res = await axios.post(`${process.env.REACT_APP_API}/api/v1/auth/forgot-password`, { email, newPassword, answer });
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
        <Layout title={"Forgot-Password"}>
            <div className='forget-box'>
                <div className='forgot-password-container'>
                    <h1>Reset Password</h1>
                    <form onSubmit={handleSubmit} className="forgot-password-form">
                        {/* Email input */}
                        <div className="form-floating mb-3">
                            <input onChange={(event) => setEmail(event.target.value)} value={email} type="email" id="floatingInput" className="form-control" required />
                            <label className="form-label" htmlFor="floatingInput">Email address</label>
                        </div>
                        {/* Answer input */}
                        <div className="form-floating mb-3">
                            <input onChange={(event) => setAnswer(event.target.value)} value={answer} type="text" id="floatingAnswer" className="form-control" required />
                            <label className="form-label" htmlFor="floatingAnswer">What is your best friend's name?</label>
                        </div>
                        {/* Password input */}
                        <div className="form-floating mb-3">
                            <input onChange={(event) => setNewPassword(event.target.value)} value={newPassword} type="password" id="floatingPassword" className="form-control" required />
                            <label className="form-label" htmlFor="floatingPassword">New Password</label>
                        </div>
                        <button type="submit" className="btn btn-primary btn-block">Reset</button>
                    </form>
                </div>
            </div>
        </Layout>
    );
};

export default ForgotPassword;
