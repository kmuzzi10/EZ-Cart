import React from 'react';
import Layout from '../components/Layout/Layout';
import { Link } from 'react-router-dom';
import error from "../images/error.jpg"

const Pagenotfound = () => {
    return (
        <Layout>
            <div style={styles.container}>
                 <img className='pnf-error-img' src={error} />
                <h1 style={styles.title}>Error 404</h1>
                <h2 style={styles.heading}>Oops! Page Not Found</h2>
                <Link style={styles.button} to='/'> Go Back</Link>
            </div>
        </Layout>
    );
};

export default Pagenotfound;

const styles = {
    container: {
        textAlign: 'center',
        marginTop: '50px',
    },
    title: {
        fontSize: '48px',
        color: '#333',
    },
    heading: {
        fontSize: '24px',
        color: '#555',
        marginBottom: '20px',
    },
    button: {
        display: 'inline-block',
        backgroundColor: '#007bff',
        color: '#fff',
        padding: '10px 20px',
        borderRadius: '5px',
        textDecoration: 'none',
        fontSize: '18px',
        marginTop: '20px',
    },
};
