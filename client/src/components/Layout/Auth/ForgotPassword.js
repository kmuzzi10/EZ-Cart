import React, { useState } from 'react'
import Layout from '../Layout'
import axios from "axios"
import { useNavigate } from "react-router-dom"


const ForgotPassword = () => {
    const [email, setEmail] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [answer, setAnswer] = useState("");
    // eslint-disable-next-line

    const navigate = useNavigate();


    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const res = await axios.post(`${process.env.REACT_APP_API}/api/v1/auth/forgot-password`,
                { email, newPassword, answer }
            );
            if (res.data.success) {
                alert(res.data && res.data.message);
                navigate('/login')
            } else {
                alert(res.data.message)
            }
        } catch (err) {
            console.log(err);
            alert("Somethig Went Wrong")
        }
    }
    return (
        <Layout title={"Forgot-Password"}>
            <div className='login'>
                <h1>Reset Password</h1>
                <form onSubmit={handleSubmit}>
                    {/* Email input */}
                    <div data-mdb-input-init className="form-floating mb-3">
                        <input onChange={(event) => setEmail(event.target.value)} value={email} type="email" id="floatingInput" className="form-control" required />
                        <label className="form-label" htmlFor="floatingInput">Email address</label>
                    </div>
                    {/* Answer input */}
                    <div data-mdb-input-init className="form-floating mb-3">
                        <input onChange={(event) => setAnswer(event.target.value)} value={answer} type="text" id="floatingInput" className="form-control" required />
                        <label className="form-label" htmlFor="floatingInput">What is your bestfriend name</label>
                    </div>
                    {/* Password input */}
                    <div data-mdb-input-init className="form-floating mb-3">
                        <input onChange={(event) => setNewPassword(event.target.value)} value={newPassword} type="password" id="form1Example2" className="form-control" required />
                        <label className="form-label" htmlFor="form1Example2">New Password</label>
                    </div>
                    <button data-mdb-ripple-init type="submit" className="btn btn-primary btn-block">Reset</button>
                </form>
            </div>
        </Layout>
    )
}

export default ForgotPassword