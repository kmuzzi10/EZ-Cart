import React from 'react';
import { Link } from 'react-router-dom';
import Layout from '../components/Layout/Layout';
import useCategory from '../hooks/useCategory';


const Categories = () => {
    const categories = useCategory();

    return (
        <Layout>
            <div className='categories-container image-cover-category'>
                <h1 style={{color:'white'}} className='categories-title'>All Categories</h1>
                <div className='categories-list'>
                    {categories.map((c, index) => (
                        <div key={index} className='category-item'>
                            <Link className='category-link' to={`/category/${c.slug}`}>
                                <div className='category-card'>
                                    <div className='category-name'>{c.name}</div>
                                </div>
                            </Link>
                        </div>
                    ))}
                </div>
            </div>
        </Layout>
    );
};

export default Categories;
