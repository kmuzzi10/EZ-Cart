import React from 'react'
import Layout from '../components/Layout/Layout'
import { useSearch } from '../context/search'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { useNavigate } from 'react-router-dom';

const Search = () => {
    const [values, setValues] = useSearch()
    const navigate = useNavigate()
    return (
        <Layout title={'Search Results'}>
            <div className='container'>
                <div className='text-center'>
                    <h1 style={{ fontFamily: 'cursive' }}>Search Results</h1>
                    <h6 style={{ fontFamily: 'cursive' }}>{values?.results.length < 1 ? 'No Products Found' : `Found ${values?.results.length} Results`}</h6>
                    <div className='row justify-content-center mt-4'>
                        {values?.results.map(p => (
                            <div key={p._id} className='col-lg-4 col-md-4 col-sm-6 mb-4'>
                                <div className="card" style={{ height: '100%' }}>
                                    <img src={`${process.env.REACT_APP_API}/api/v1/product/product-photo/${p._id}`} className="card-img-top img-fluid" alt={p.name} />
                                    <div style={{ fontFamily: 'cursive' }} className="card-body">
                                        <h5 className="card-title">{p.name}</h5>
                                        <p className="card-text">{p.description.substring(0, 50)}...</p>
                                        <p className="card-text">$ {p.price}</p>
                                        <div className="d-flex justify-content-between">
                                            <button className='btn btn-primary' onClick={() => navigate(`/product/${p.slug}`)}>More Details</button>
                                            <button className='btn btn-secondary'><ShoppingCartIcon /> Add to Cart</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default Search