import React, { useState } from 'react'
import Layout from '../Layout'
import toast from 'react-hot-toast';
import axios from "axios"
import {useNavigate} from "react-router-dom"

const Register = () => {

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [phone, setPhone] = useState("");
    const [address, setAddress] = useState("");
    const navigate = useNavigate();

    //function for submitting form
    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const res = await axios.post(`${process.env.REACT_APP_API}/api/v1/auth/register`, 
            { name, email, password, phone, address }
            );
            if(res.data.success){
                toast.success(res.data && res.data.message);
                navigate('/login')
            }else{
                toast.error(res.data.message)
            }
        } catch (err) {
            console.log(err);
            toast.error("Somethig Went Wrong")
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


                    {/* 2 column grid layout for inline styling */}
                    <div className="row mb-3">
                        <div className="col">
                            {/* Simple link */}
                            <a href="#!">Forgot password?</a>
                        </div>
                    </div>
                    {/* Submit button */}
                    <button data-mdb-ripple-init type="submit" className="btn btn-primary btn-block">Register</button>
                </form>

            </div>
        </Layout>
    )
}

export default Register