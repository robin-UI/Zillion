import { Outlet } from "react-router-dom"
import AdminNav from "../../Components/AdminNav/AdminNav"

const Admin = () => {
  return (
    <div>
        <AdminNav/>
        <div className="flex justify-center items-center mt-10">
          <Outlet/>
        </div>
    </div>
  )
}

export default Admin