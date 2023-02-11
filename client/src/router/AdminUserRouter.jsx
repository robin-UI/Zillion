import React from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import AddProducts from '../Components/AdminUser/AddProducts'
import AdminuserHomePage from '../Components/AdminUser/AdminuserHomePage'
import CreateCategory from '../Components/AdminUser/CreateCategory'
import ShowAllProducts from '../Components/AdminUser/ShowAllProducts'
import AdminUser from '../Pages/AdminUser/AdminUser'
import AdminUserLogin from '../Pages/AdminUser/AdminUserLogin'

const AdminUserRouter = () => {
  const isLogedin = localStorage.getItem("AdminUser");
  console.log(isLogedin);

  return ( 
    <Routes>
      <Route element={<AdminUser /> } >
        <Route path='/' element={ isLogedin ? <AdminuserHomePage /> : <Navigate to='/adminuser/login'/>} />
        <Route path="/createProduct" element={ isLogedin ? <AddProducts /> : <Navigate to='/adminuser/login'/>} />
        <Route path="/createCategory" element={ isLogedin ? <CreateCategory /> : <Navigate to='/adminuser/login'/>} />
        <Route path="/showAllProducts" element={ isLogedin ? <ShowAllProducts /> : <Navigate to='/adminuser/login'/>} />
        <Route path='/login' element={ <AdminUserLogin/> } />
      </Route>
    </Routes>
  )
}

export default AdminUserRouter