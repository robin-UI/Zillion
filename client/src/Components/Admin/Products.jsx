import axios from 'axios'
import React, { useEffect, useState } from 'react'

const Products = ({prod}) => {

    const [user, setUser] = useState('');
    const [isApprove, setIsApprove] = useState(false);

    let data = {
        approve: true,
        reject: false
    }

    useEffect(() => {
      try {
        const getUser = async () => {
            let res = await axios.get('http://localhost:5000/userAdmin/getuserDetails/'+ prod.adminId)
            setUser(res.data.data.adminname);
            setIsApprove(prod.approve)
        }
        getUser()
      } catch (error) {
        
      }
    }, [prod.adminId, prod.approve])
    

    const approveFun = async () => {
        try {
            
            let res = await axios.put('http://localhost:5000/admin/approveproduct/'+ prod._id, data)
            if (res) {
                setIsApprove(true) 
            }
        } catch (error) {
            console.log(error);
        }
    }

    const rejectFun = async () => {
        try {
            
            let res = await axios.put('http://localhost:5000/admin/rejectproduct/'+ prod._id, data)
            if (res){
                setIsApprove(false)
            }
        } catch (error) {
            console.log(error);
        }
    }


    return (
        <div className='my-1 px-1 w-full md:w-1/2 lg:my-4 lg:px-4 lg:w-1/3' >
            <div className="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
            <a href="/">
                <img className="p-8 rounded-t-lg" src={'http://localhost:5000/images/' + prod.photo} alt='thisimag' />
            </a>
            <div className="px-5 pb-5">
                
                <h5 className="text-xl font-semibold tracking-tight text-gray-900 dark:text-white"><span className='font-light text-base' >Product Name: </span>  {prod.productName} <br></br> <span className='font-light text-base' >Product Desc.: </span> {prod.desc}</h5>
                <h5 className='text-xl font-semibold tracking-tight text-gray-900 dark:text-white' > <span className='font-light text-base' >Admin Name: </span> {user} </h5>

                <div className="flex items-center justify-between">
                    <span className="text-3xl font-bold text-gray-900 dark:text-white">₹ {prod.price}</span>
                    <button className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Edit</button>
                </div>
                <div className="flex mt-4 space-x-3 md:mt-6">
                  { ! isApprove
                    ? <button onClick={approveFun} className="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Approve </button>
                    : <button onClick={rejectFun} className="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-gray-900 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-700 dark:focus:ring-gray-700">Reject</button>
                  }
                </div>
            </div>
        </div></div>
    )
}

export default Products