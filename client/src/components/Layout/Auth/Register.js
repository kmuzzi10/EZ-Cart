import React, { useState } from 'react'
import Layout from '../Layout'
import axios from "axios"
import { useNavigate } from "react-router-dom"

const Register = () => {

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [phone, setPhone] = useState("");
    const [address, setAddress] = useState("");
    const [answer, setAnswer] = useState("");
    const navigate = useNavigate();

    //function for submitting form
    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const res = await axios.post(`${process.env.REACT_APP_API}/api/v1/auth/register`,
                { name, email, password, phone, address, answer }
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
        <Layout title='Register E-commerce'>
            <div className='register'>
                <h1>Register</h1>
                {/* Forms */}
                <form onSubmit={handleSubmit}>
                    {/* Name input */}
                    <div data-mdb-input-init className="form-floating mb-3">
                        <input onChange={(event) => setName(event.target.value)} value={name} type="text" id="floatingInput" className="form-control" required />
                        <label className="form-label" htmlFor="floatingInput">Name</label>
                    </div>
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
                    {/* Phone input */}
                    <div data-mdb-input-init className="form-floating mb-3">
                        <input onChange={(event) => setPhone(event.target.value)} value={phone} type='number' id="floatingInput" className="form-control" required />
                        <label className="form-label" htmlFor="floatingInput">Phone</label>
                    </div>
                    {/* Address input */}
                    <div data-mdb-input-init className="form-floating mb-3">
                        <input onChange={(event) => setAddress(event.target.value)} value={address} type='text' id="floatingInput" className="form-control" required />
                        <label className="form-label" htmlFor="floatingInput">Address</label>
                    </div>
                    {/* Answer input */}
                    <div data-mdb-input-init className="form-floating mb-3">
                        <input onChange={(event) => setAnswer(event.target.value)} value={answer} type='text' id="floatingInput" className="form-control" required />
                        <label className="form-label" htmlFor="floatingInput">Your Best Friend Name</label>
                    </div>

                    {/* Submit button */}
                    <button data-mdb-ripple-init type="submit" className="btn btn-primary btn-block">Register</button>
                </form>

            </div>
        </Layout>
    )
}

export default Register