import React, { useState, useEffect } from 'react'
import Layout from '../../components/Layout/Layout'
import UserMenu from '../../components/Layout/UserPages/UserMenu'
import { useAuth } from '../../context/auth'
import axios from "axios"

const Profile = () => {

    const [auth, setAuth] = useAuth()

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [phone, setPhone] = useState("");
    const [address, setAddress] = useState("");


    //get user data

    useEffect(() => {
        const { name, email, phone, address } = auth?.user
        setName(name)
        setEmail(email)
        setPhone(phone)
        setAddress(address)
    }, [auth?.user])

    //function for submitting form
    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const { data } = await axios.put(`${process.env.REACT_APP_API}/api/v1/auth/profile`,
                { name, email, password, phone, address }
            );
            if (data?.error) {
                alert(data?.error)
            } else {
                setAuth({ ...auth, user: data?.updatedUser })
                let ls = localStorage.getItem("auth")
                ls = JSON.parse(ls)
                ls.user = data.updatedUser
                localStorage.setItem("auth", JSON.stringify(ls))
                alert("profile updated successfully")
            }
        } catch (err) {
            console.log(err);
            alert("Somethig Went Wrong")
        }
    }



    return (
        <>
            <Layout title={'user-profile'}>
                <div className='container-fluid m-3 p-3'>
                    <div className='row'>
                        <div className='col-lg-3 col-md-4 col-sm-5'>
                            <UserMenu />
                        </div>
                        <div className='col-lg-9 col-md-8 col-sm-7'>
                            <h3>User Profile</h3>
                            <form onSubmit={handleSubmit}>
                                {/* Name input */}
                                <div data-mdb-input-init className="form-floating mb-3">
                                    <input onChange={(event) => setName(event.target.value)} value={name} type="text" id="floatingInput" className="form-control"  />
                                    <label className="form-label" htmlFor="floatingInput">Name</label>
                                </div>
                                {/* Email input */}
                                <div data-mdb-input-init className="form-floating mb-3">
                                    <input onChange={(event) => setEmail(event.target.value)} value={email} type="email" id="floatingInput" className="form-control"  disabled />
                                    <label className="form-label" htmlFor="floatingInput">Email address</label>
                                </div>
                                {/* Password input */}
                                <div data-mdb-input-init className="form-floating mb-3">
                                    <input onChange={(event) => setPassword(event.target.value)} value={password} type="password" id="form1Example2" className="form-control"  />
                                    <label className="form-label" htmlFor="form1Example2">Password</label>
                                </div>
                                {/* Phone input */}
                                <div data-mdb-input-init className="form-floating mb-3">
                                    <input onChange={(event) => setPhone(event.target.value)} value={phone} type='number' id="floatingInput" className="form-control"  />
                                    <label className="form-label" htmlFor="floatingInput">Phone</label>
                                </div>
                                {/* Address input */}
                                <div data-mdb-input-init className="form-floating mb-3">
                                    <input onChange={(event) => setAddress(event.target.value)} value={address} type='text' id="floatingInput" className="form-control"  />
                                    <label className="form-label" htmlFor="floatingInput">Address</label>
                                </div>

                                {/* Submit button */}
                                <button data-mdb-ripple-init type="submit" className="btn btn-primary btn-block">Update</button>
                            </form>
                        </div>
                    </div>
                </div>
            </Layout>
        </>
    )
}

export default Profile