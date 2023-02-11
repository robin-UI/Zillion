import React from 'react'
import { Outlet } from 'react-router-dom'
import Usernave from '../../Components/UserNav/Usernave'

const Home = () => {
  return (
    <>
      <Usernave/>
      <div className='px-5'>
        <Outlet/>
      </div>
    </>
  )
}

export default Home