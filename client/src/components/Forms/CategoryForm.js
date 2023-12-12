import React from 'react'

const CategoryForm = ({ handleSubmit, value, setValue }) => {
    return (
        <>
            <form onSubmit={handleSubmit}>
                <div className='mb-3'>
                    <input placeholder='Enter New Category' type="text" className="form-control" value={value} onChange={(e) => setValue(e.target.value)} />
                </div>
                <button data-mdb-ripple-init type="submit" className="btn btn-primary btn-block">Add</button>
            </form>

        </>
    )
}

export default CategoryForm