import React from 'react'
import Layout from '../../components/Layout/Layout'
import AdminMenu from '../../components/Layout/AdminPages/AdminMenu'

const CreateProduct = () => {
  return (
    <Layout title={'Create product'}>
            <div className='fluid-container m-3 p-3'>
                <div className='row'>
                    <div className='col-lg-3 col-md-4 col-sm-4'>
                    <AdminMenu />
                    </div>
                    <div className='col-lg-9 col-md-8 col-sm-8'>
                        <h1>Create Product</h1>
                    </div>
                </div>
            </div>
        </Layout>
  )
}

export default CreateProduct