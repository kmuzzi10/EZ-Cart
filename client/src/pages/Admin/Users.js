import React, { useState, useEffect } from 'react';
import Layout from '../../components/Layout/Layout';
import AdminMenu from '../../components/Layout/AdminPages/AdminMenu';
import axios from "axios";

const Users = () => {
    const [users, setUsers] = useState([]);
    const [searchQuery, setSearchQuery] = useState(""); // State to hold the search query

    const getAllUsers = async () => {
        try {
            const { data } = await axios.get(`${process.env.REACT_APP_API}/api/v1/auth/get-user`);
            setUsers(data);
        } catch (err) {
            console.log(err);
            alert(err);
        }
    };

    useEffect(() => {
        getAllUsers();
    }, []);

    // Function to filter users based on search query
    const filteredUsers = users.filter(user =>
        user.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <Layout title={'All users'}>
            <div className='fluid-container m-3 p-3'>
                <div className='row'>
                    <div className='col-lg-3 col-md-4 col-sm-4'>
                        <AdminMenu />
                    </div>
                    <div className='col-lg-9 col-md-8 col-sm-8'>
                        <h1 className='text-center'>All Users</h1>
                        {/* Input field for search query */}
                        <input
                            type="text"
                            placeholder="Search by User Name"
                            value={searchQuery}
                            onChange={e => setSearchQuery(e.target.value)}
                            style={{
                                marginBottom: '20px',
                                width: '100%',
                                padding: '10px',
                                fontSize: '16px',
                                borderRadius: '5px',
                                border: '1px solid #ccc',
                                boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)'
                            }}
                        />
                        <div className='border shadow mb-3'>
                            <table className='table'>
                                <thead>
                                    <tr>
                                        <th>#</th>
                                        <th>User Name</th>
                                        <th>User Email</th>
                                        <th>Phone</th>
                                        <th>Address</th>
                                       
                                    </tr>
                                </thead>
                                <tbody>
                                    {filteredUsers.map((user, index) => (
                                        <tr key={index}>
                                            <td>{index + 1}</td>
                                            <td>{user.name}</td>
                                            <td>{user.email}</td>
                                            <td>{user.phone}</td>
                                            <td>{user.address}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default Users;
