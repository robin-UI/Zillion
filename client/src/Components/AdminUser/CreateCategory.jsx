import './style.css'
import React, { useRef, useState } from 'react'
import { RiCloseFill } from "react-icons/ri"
import axios from 'axios'

const CategoryList = (props) => {
  return (
    <li className="bg-white-50 border text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500  w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 flex justify-between" >
      {props.item}
      <span className='icons'>
        <RiCloseFill className="fa-solid fa-trash-can icon-delete"
          onClick={e => {
            props.deleteItem(props.index)
          }} />
      </span>
    </li>
  )
}

const CategoryField = (props) => {
  const [inputText, setInputText] = useState('');
  const handleEnterPress = (e) => {
    if (e.keyCode === 13) {
      props.addList(inputText)
      setInputText("")
    }
  }
  return (
    <div className="input-container flex items-center">
      <input
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        placeholder="Ex. Shooes"
        value={inputText}
        onChange={e => {
          setInputText(e.target.value)
        }}
        onKeyDown={handleEnterPress}
      />
      <button className="add-btn text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 ml-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
        onClick={() => {
          props.addList(inputText)
          setInputText("")
        }}>+</button>
    </div>
  )
}

const CreateCategory = () => {

  const [subCate, setSubcate] = useState([]);
  let addList = (inputText) => {
    if (inputText !== '')
      setSubcate([...subCate, inputText]);
  }
  const deleteListItem = (key) => {
    let newsubCate = [...subCate];
    newsubCate.splice(key, 1)
    setSubcate([...newsubCate])
  }

  const category = useRef()
  
  const handleClick = async (e) => {
    e.preventDefault();
    const data = {
      category: category.current.value,
      subCategory: subCate
    }
    
    try {
      let res = await axios.post('http://localhost:5000/userAdmin/createCategories', data)
      console.log(res);
    } catch (error) {
      console.log(error);
    }

    category.current.value = "";
    setSubcate([])
  }

  return (
    <div className='p-4 sm:ml-64'>
      {/* <form > */}
      <div className="mb-6">
        <label
          htmlFor="email"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          Category
        </label>
        <input
          ref={category}
          type="text"
          id="email"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="Ex. Footwear"
          required=""
        />
      </div>
      <div className="mb-6">
        <label
          htmlFor="password"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          Sub-Category
        </label>

        <CategoryField addList={addList} />
      </div>

      <div className='mb-6' >
        {subCate.map((listItem, i) => {
          return (
            <CategoryList key={i} index={i} item={listItem} deleteItem={deleteListItem} />
          )
        })}
      </div>

      <button
        type="submit"
        onClick={handleClick}
        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
      >
        Submit
      </button>
      {/* </form> */}

    </div>
  )
}

export default CreateCategory