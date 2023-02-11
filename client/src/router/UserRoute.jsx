import Home from "../Pages/User/Home"
import HomeComponent from "../Components/User/HomeComponent"
import Credential from "../Pages/User/Credintial"
import Store from "../Pages/User/Store"
import ProductPage from "../Pages/User/ProductPage"
import { Route, Routes } from "react-router-dom"

const UserRoute = () => {
  return (
    <Routes>
        <Route element={<Home/>} >
            <Route path='/' element={<HomeComponent />} />
            <Route path="createuser" element={<Credential />} />
            <Route path="store" element={<Store />} />
            <Route path="/product/:id" element={<ProductPage />} />
        </Route>
    </Routes>
  )
}

export default UserRoute