import React from 'react'
import Layout from '../../components/Layout/Layout'
import UserMenu from '../../components/Layout/UserPages/UserMenu'

const Orders = () => {
  return (
    <Layout title={'orders'}>
        <div className='container-fluid m-3 p-3'>
            <div className='row'>
                <div className='col-lg-3 col-md-4 col-sm-5'>
                    <UserMenu />
                </div>
                <div className='col-lg-9 col-md-8 col-sm-7'>
                    <h1>All orders</h1>
                </div>
            </div>
        </div>
    </Layout>
  )
}

export default Orders