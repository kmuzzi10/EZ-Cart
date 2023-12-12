import React, { useEffect, useState } from 'react'
import Layout from '../../components/Layout/Layout'
import AdminMenu from '../../components/Layout/AdminPages/AdminMenu'
import axios from 'axios';
import CategoryForm from '../../components/Forms/CategoryForm';

const CreateCategory = () => {
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState("");

  //handlesubmit function

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const { data } = await axios.post(`${process.env.REACT_APP_API}/api/v1/category/create-category`, {
        name
      })
      if (data?.success) {
        alert(`${name} is added`)
        getAllCategory()
      } else {
        alert(data.message)
      }
    } catch (error) {
      console.log(error)
      alert("something went wrong in input")
    }
  }
  //get All categories
  const getAllCategory = async () => {
    try {
      const { data } = await axios.get(`${process.env.REACT_APP_API}/api/v1/category/get-category`);
      if (data.success) {
        setCategories(data.category)
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
    <Layout title={'create category'}>
      <div className='fluid-container m-3 p-3'>
        <div className='row'>
          <div className='col-lg-3 col-md-4 col-sm-4'>
            <AdminMenu />
          </div>
          <div className='col-lg-9 col-md-8 col-sm-8'>
            <h1>Manage Category</h1>
            <div className=' w-50'>
              <CategoryForm
                handleSubmit={handleSubmit}
                value={name}
                setValue={setName}
              />
            </div>
            <div className='w-75'>
              <table className="table">
                <thead>
                  <tr>
                    <th scope="col">Name</th>
                    <th scope="col">Actions</th>
                  </tr>
                </thead>
                <tbody>


                  {categories.map((c) => {

                    return (
                      <>
                        <tr>
                          <td key={c._id}>{c.name}</td>
                          <td>
                          <button className='btn btn-success ms-2'>Edit</button>
                          <button className='btn btn-danger ms-2'>Delete</button>
                          </td>
                          
                        </tr>
                      </>
                    )
                  })}



                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default CreateCategory