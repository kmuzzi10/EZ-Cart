import React, { useState } from 'react'
import Layout from '../Layout'

const Register = () => {
    
    const [name,setName] = useState("");
    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");
    const [phone,setPhone] = useState("");
    const [address,setAddress] = useState("");
    
    
    
    return (
        <Layout title='Register E-commerce'>
            <div className='register'>
                <h1>Register</h1>
                {/* Forms */}
                <form>
                    {/* Name input */}
                    <div data-mdb-input-init className="form-outline mb-4">
                        <input value={name} type="email" id="form1Example1" className="form-control" />
                        <label className="form-label" htmlFor="form1Example1">Name</label>
                    </div>
                    {/* Email input */}
                    <div data-mdb-input-init className="form-outline mb-4">
                        <input value={email} type="email" id="form1Example1" className="form-control" />
                        <label className="form-label" htmlFor="form1Example1">Email address</label>
                    </div>
                    {/* Password input */}
                    <div data-mdb-input-init className="form-outline mb-4">
                        <input value={password} type="password" id="form1Example2" className="form-control" />
                        <label className="form-label" htmlFor="form1Example2">Password</label>
                    </div>
                    {/* Phone input */}
                    <div data-mdb-input-init className="form-outline mb-4">
                        <input value={phone} type="email" id="form1Example1" className="form-control" />
                        <label className="form-label" htmlFor="form1Example1">Phone</label>
                    </div>
                    {/* Address input */}
                    <div data-mdb-input-init className="form-outline mb-4">
                        <input value={address} type="email" id="form1Example1" className="form-control" />
                        <label className="form-label" htmlFor="form1Example1">Address</label>
                    </div>


                    {/* 2 column grid layout for inline styling */}
                    <div className="row mb-4">
                        <div className="col">
                            {/* Simple link */}
                            <a href="#!">Forgot password?</a>
                        </div>
                    </div>
                    {/* Submit button */}
                    <button data-mdb-ripple-init type="submit" className="btn btn-primary btn-block">Sign in</button>
                </form>

            </div>
        </Layout>
    )
}

export default Register