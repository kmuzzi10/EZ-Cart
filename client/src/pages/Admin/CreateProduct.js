import React, { useState, useEffect } from 'react'
import Layout from '../../components/Layout/Layout'
import axios from "axios"
import AdminMenu from '../../components/Layout/AdminPages/AdminMenu'
import { Select } from "antd"
const { Option } = Select



const CreateProduct = () => {
    const [categories, setCategories] = useState([])
    const [name, setName] = useState("")
    const [descrition, setDescrition] = useState("")
    const [price, setPrice] = useState("")
    const [category, setCategory] = useState("")
    const [quantity, setQuantity] = useState("")
    const [shipping, setShipping] = useState("")
    const [photo, setPhoto] = useState("")


    //get category

    const getAllCategory = async () => {
        try {
            const { data } = await axios.get(`${process.env.REACT_APP_API}/api/v1/category/get-category`);
            if (data?.success) {
                setCategories(data?.category)
            }
        } catch (err) {
            console.log(err)
            alert('Something went wrong in getting categories')
        }
    }

    useEffect(() => {
        getAllCategory()
    }, [])

    return (
        <Layout title={'Create product'}>
            <div className='fluid-container m-3 p-3'>
                <div className='row'>
                    <div className='col-lg-3 col-md-4 col-sm-4'>
                        <AdminMenu />
                    </div>
                    <div className='col-lg-9 col-md-8 col-sm-8'>
                        <h1>Create Product</h1>
                        <div className='m-1 w-75'>
                            <Select bordered={false} placeholder="Select a category" size='large' showSearch className='form-control mb-3' onChange={(value) => { setCategory(value) }}>
                                {
                                    categories?.map(c => (
                                        <Option key={c._id} value={c.name}>
                                            {c.name}
                                        </Option>
                                    ))
                                }

                            </Select>
                            <div className='mb-3'>
                                <label className='btn btn-outline-secondary'>
                                    {photo ? photo.name : "Upload Photo"}
                                    <input type='file' name='photo' accept='image/*' onChange={(e) => setPhoto(e.target.files[0])} hidden />
                                </label>
                            </div>
                            <div className='mb-3'>
                                {photo && (
                                    <div className='text-center'>
                                        <img src={URL.createObjectURL(photo)} alt="product-photo" height={'200px'} className='img img-responsive' />

                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default CreateProduct