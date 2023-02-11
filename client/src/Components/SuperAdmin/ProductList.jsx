import axios from 'axios'
import { RiCheckFill, RiCloseCircleFill } from 'react-icons/ri'

const ProductList = ({prod}) => {

    let data = {
        approve: true,
        reject: false
    }

    const verifyFun = async () => {
        try {
            let res = await axios.put('http://localhost:5000/superAdmin/verifyproduct/'+ prod._id, data)
            console.log(res);
            if (res) {
                window.location.reload()
            }
        } catch (error) {
            console.log(error);
        }
    }

    const unverifyFun = async () => {
        try {
            let res = await axios.put('http://localhost:5000/superAdmin/unVerifyproduct/'+ prod._id, data)
            if (res) {
                window.location.reload()
            }
        } catch (error) {
            console.log(error);
        }
    }

    

    

    return (
        <>
            <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">

                <th
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                    {prod.productName}
                </th>
                <td className="px-6 py-4">{prod.category}</td>
                <td className="px-6 py-4">{prod.desc}</td>
                <td className="px-6 py-4">${prod.price}</td>
                <td className="px-6 py-4 text-right">
                    { prod.verified 
                    ? <RiCloseCircleFill onClick={unverifyFun} className="cursor-pointer text-lg" />
                    : <RiCheckFill onClick={verifyFun} className="cursor-pointer text-lg" />
                    }
                </td>
            </tr>
        </>
    )
}

export default ProductList