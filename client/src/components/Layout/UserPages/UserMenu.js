import React from 'react'
import { NavLink } from 'react-router-dom'

const UserMenu = () => {
  return (
    <>
      <div className='text-center '>
                <h4>User Panel</h4>
                <div className="list-group">
                    <NavLink to='/dashboard/user/profile' className="list-group-item list-group-item-action">User Profile</NavLink>
                    <NavLink to='/dashboard/user/orders' className="list-group-item list-group-item-action">Orders</NavLink>

                </div>
            </div>
    </>
  )
}

export default UserMenu