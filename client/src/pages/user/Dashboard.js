import React from 'react'
import Layout from '../../components/Layout/Layout'
import { useAuth } from '../../context/auth'
import UserMenu from '../../components/Layout/UserPages/UserMenu'

const Dashboard = () => {
  const [auth] = useAuth()
  return (
    <Layout title='user-dashboard'>
      <div className='container-fluid m-3 p-3'>
        <div className='row'>
          <div className='col-lg-3 col-md-4 col-sm-5'>
            <UserMenu />
          </div>
          <div className='col-lg-9 col-md-8 col-sm-7'>
            <div className='card w-50 p-3'>
             <h3>User Name: {auth?.user?.name}</h3>
             
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default Dashboard