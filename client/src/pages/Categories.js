import React, { useState, useEffect } from 'react'
import useCategory from '../hooks/useCategory';
import { Link } from 'react-router-dom';
import Layout from '../components/Layout/Layout';


const Categories = () => {
    const categories = useCategory()
    return (
        <Layout>
            <h1>All Categories</h1>
            <div className='container'>
                <div className='row'>
                    {categories.map(c => (
                        <div className='col-lg-6 col-md-6 col-sm-10 mt-5 mb-3 gx-3 gy-3'>
                            <Link className='btn btn-primary' to={`/category/${c.slug}`}>{c.name}</Link>
                        </div>
                    ))}

                </div>
            </div>
        </Layout>
    )
}

export default Categories