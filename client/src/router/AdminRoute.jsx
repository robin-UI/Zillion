
import { Navigate, Route, Routes } from 'react-router-dom'
import AdminDetails from '../Components/Admin/AdminDetails'
import ApproveProduct from '../Components/Admin/ApproveProduct'
import CreateAdminUser from '../Components/Admin/CreateAdminUser'
import ShowAllAdminUser from '../Components/Admin/ShowAllAdminUser'
import Admin from '../Pages/Admin/Admin'
import AdminLogin from '../Pages/Admin/AdminLogin'

const AdminRoute = () => {
  const isLogedin = localStorage.getItem("Admin");
  console.log(isLogedin);

    return (
        <Routes>
          <Route element={<Admin />} >
            <Route index element={isLogedin ? <AdminDetails /> : <Navigate to="/admin/login" />} />
            <Route path="/createuser" element={isLogedin ? <CreateAdminUser />: <Navigate to="/admin/login" />} />
            <Route path="/verifyproduct" element={isLogedin ? <ApproveProduct /> : <Navigate to="/admin/login" />} />
            <Route path="/showAllAdmins" element={isLogedin ? <ShowAllAdminUser /> : <Navigate to="/admin/login" />} />
            <Route path="/login" element={<AdminLogin /> }/>
          </Route>
        </Routes>
    )
}

export default AdminRoute