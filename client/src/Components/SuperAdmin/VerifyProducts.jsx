import axios from 'axios'
import React, { useEffect, useState } from 'react'
import ProductList from './ProductList'

const VerifyProducts = () => {

  const [prod, setProd] = useState([])
  useEffect(() => {
    const callPro = async () => {
      let res = await axios.get('http://localhost:5000/userAdmin/getallproducts')
      console.log(res.data.messaage);
      setProd(res.data.messaage)
    }
    callPro()

  }, [])


  return (
    <>
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg mb-5">
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <caption className="p-5 text-lg font-semibold text-left text-gray-900 bg-white dark:text-white dark:bg-gray-800">
            Our products
            <p className="mt-1 text-sm font-normal text-gray-500 dark:text-gray-400">
              Browse a list of Flowbite products designed to help you work and play,
              stay organized, get answers, keep in touch, grow your business, and
              more.
            </p>
          </caption>
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                Product name
              </th>
              <th scope="col" className="px-6 py-3">
                Category
              </th>
              <th scope="col" className="px-6 py-3">
                Description
              </th>
              <th scope="col" className="px-6 py-3">
                Price
              </th>
              <th scope="col" className="px-6 py-3">
                <span className="sr-only">Edit</span>
              </th>
            </tr>
          </thead>
          <tbody>
            {prod.map((p) => (
              <ProductList key={p._id} prod={p} />
            ))}
          </tbody>
        </table>
      </div>

    </>
  )
}

export default VerifyProducts 