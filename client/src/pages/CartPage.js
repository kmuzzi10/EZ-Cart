import React from 'react'
import Layout from '../components/Layout/Layout'
import { useCart } from '../context/cart'
import { useAuth } from '../context/auth'
import { useNavigate } from 'react-router-dom'

const CartPage = () => {
    const [auth, setAuth] = useAuth()
    const [cart, setCart] = useCart()
    const navigate = useNavigate()

    return (
        <Layout>
            <div className='container'>
                <div className='row'>
                    <div className='col-lg-12 col-md-12 col-sm-12'>
                        <h1 className='text-center bg-light p-2 mt-4'>
                            {`Hello ${auth?.token && auth?.user.name}`}
                        </h1>
                        <h4 className='text-center mt-2'>
                            {cart?.length > 0 ? `You have ${cart.length} item${cart.length > 1 ? 's' : ''} in your cart${auth?.token ? '' : ' - please login to checkout'}` : 'Your cart is empty'}
                        </h4>

                    </div>
                </div>
                <div className='row'>
                   <div className='col-lg-9 col-md-9 col-sm-9'>
                     cart items
                   </div>
                   <div className='col-lg-3 col-md-3 col-sm-3'>
                     checkout
                   </div>
                </div>
            </div>
        </Layout>
    )
}

export default CartPage