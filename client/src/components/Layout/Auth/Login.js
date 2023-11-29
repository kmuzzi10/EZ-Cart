import React, { useState } from 'react'
import Layout from '../Layout'

const Login = () => {
  const [email,setEmail] = useState("");
  const [password,setPassword] = useState(""); 




  return (
    <Layout title='Login E-commerce'>
    <div className='login'>
    <h1>Login</h1>
      <form>
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
        <button data-mdb-ripple-init type="submit" className="btn btn-primary btn-block">Login</button>
      </form>
      </div>
    </Layout>
  )
}

export default Login