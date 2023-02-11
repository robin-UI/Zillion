import axios from 'axios'
import jwt_decode from "jwt-decode";
import React, { useEffect, useRef, useState } from 'react'
import { RiCloseCircleLine } from 'react-icons/ri';

const AddProducts = () => {

    let token = localStorage.getItem('AdminUser')
    const decoded = jwt_decode(token);

    const prodName = useRef();
    const prodDesc = useRef();
    const price = useRef();

    const [selectCat, setSelectCat] = useState('')
    const [selSubcat, setSelSubcat] = useState('')
    const [file, setFile] = useState(null)
    const [categorys, setcategorys] = useState([])
    const [subCategory, setSubCategory] = useState(null)

    useEffect(() => {
        let resdata = async () => {
            let res = await axios.get('http://localhost:5000/userAdmin/getallcategory')
            setcategorys(res.data.message);
        }
        resdata()
    }, [])

    useEffect(() => {
        let value =  categorys.find(i => i.category === selectCat)
        value ? setSubCategory(value.subCategory) : setSubCategory(null);
    }, [selectCat, categorys])

    const handleSubmit = async (e) => {
        e.preventDefault()
        const prod = {
            productName: prodName.current.value,
            adminId: decoded.user.id,
            desc: prodDesc.current.value,
            price: price.current.value,
            category: selectCat,
            subCategory:selSubcat
        }

        if(file){
            const data = new FormData();
            const fileName = file.name;
            // const fileName = Date.now() + file.name;
            // data.append("", fileName);
            data.append("file", file);
            data.append("file", fileName);
            prod.photo = fileName;

            // console.log(prod);
            
            try {
                let res = await axios.post("http://localhost:5000/admin/adminImageUpload", data)
                console.log(res);
            } catch (error) {
                console.log(error);
            }
        }   
        
        try {
            let res = await axios.post('http://localhost:5000/userAdmin/createProducts', prod)
            if(res){
                window.location.reload()
            }
            console.log(res);
        } catch (error) {
            console.log(error);
        }
        
    }

    return (
        <div className='flex'>
        <div className='p-4 sm:ml-64 w-full bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 '>
            <form onSubmit={handleSubmit}>
                <div className="relative z-0 w-full mb-6 group">
                    <input
                        ref={prodName}
                        type="text"
                        name="Product Name"
                        id="floating_email"
                        className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                        placeholder=" "
                        required=""
                    />
                    <label
                        htmlFor="floating_email"
                        className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                    >
                        Product Name
                    </label>
                </div>
                <div className="relative z-0 w-full mb-6 group">
                    <input
                        ref={prodDesc}
                        type="text"
                        name="Product Description"
                        id="floating_password"
                        className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                        placeholder=" "
                        required=""
                    />
                    <label
                        htmlFor="floating_password"
                        className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                    >
                        Product Description
                    </label>
                </div>
                <div className="relative z-0 w-full mb-6 group">
                    <input
                        ref={price}
                        type="number"
                        name="price"
                        id="floating_repeat_password"
                        className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                        placeholder=" "
                        required=""
                    />
                    <label
                        htmlFor="floating_repeat_password"
                        className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                    >
                        Price
                    </label>
                </div>

                <div className='relative z-0 w-full mb-6 group'>
                    <label htmlFor="countries" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Select your product category</label>
                    <select id="countries" onChange={(e) => setSelectCat(e.target.value)} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                        <option defaultValue >Select Category</option>
                        {categorys.map((c) => {
                            return <option key={c._id}>{c.category} </option>
                        })}
                    </select>
                </div>

                { subCategory &&
                    <div className='relative z-0 w-full mb-6 group'>
                        <label htmlFor="countries" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Select your product sub-category</label>
                        <select id="countries" onClick={(e) => setSelSubcat(e.target.value)} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                            <option defaultValue >Select Sub-Category</option>
                            {subCategory.map((c) => (
                                <option key={c}>{c}</option>
                            ))}
                        </select>
                    </div> 
                    
                }

                { file 
                    ?   <div className='shareImgContainer w-96'>
                            <img className='shareImg ' src={URL.createObjectURL(file)} alt=""/>
                            <RiCloseCircleLine className='shareCancleImg' onClick={() => setFile(null)} />
                        </div> 
                    :   
                <div className='relative z-0 w-full mb-6 group' >
                    <label
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                        htmlFor="user_avatar"
                    >
                        Upload file
                    </label>
                    <input
                        className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                        aria-describedby="user_avatar_help"
                        id="user_avatar"
                        // name='file'
                        type="file"
                        onChange={(e) => setFile(e.target.files[0])}
                    />
                    <div
                        className="mt-1 text-sm text-gray-500 dark:text-gray-300"
                        id="user_avatar_help"
                    >
                        A profile picture is useful to confirm your are logged into your account
                    </div>
                </div> }


                <button
                    type="submit"
                    className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                    Submit
                </button>
            </form>

        </div>
        </div>
    )
}

export default AddProducts