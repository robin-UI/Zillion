import React from 'react'
import { Outlet } from 'react-router-dom'
import AdminUserNav from '../../Components/AdminUserNav/AdminUserNav'

const AdminUser = () => {
  return (
    <div>
        <AdminUserNav/>
        <div className='flex justify-center items-center mt-10'>
          <Outlet/>
        </div>
    </div>
  )
}

export default AdminUser