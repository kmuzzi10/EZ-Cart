import { useState, useEffect } from 'react'
import { useAuth } from '../../../context/auth'
import { Outlet } from "react-router-dom"
import axios from "axios"
import Spinner from '../../Spinner'
// import Dashboard from '../../../pages/user/Dashboard'
const AdminRoute = () => {
    const [ok, setOk] = useState(false)
    // eslint-disable-next-line
    const [auth, setAuth] = useAuth();

    useEffect(() => {
        console.log("Effect triggered");
        const authCheck = async () => {
            try {
                const res = await axios.get(`${process.env.REACT_APP_API}/api/v1/auth/admin-auth`);
                console.log("Authentication response:", res.data);
                if (res.data.ok) {
                    setOk(true);
                } else {
                    setOk(false);
                }
            } catch (error) {
                console.error("Error checking authentication:", error);
                setOk(false);
            }
        };

        if (auth?.token) authCheck();
    }, [auth?.token]);


    return ok ? <Outlet /> : <Spinner path='' />;


}

export default AdminRoute