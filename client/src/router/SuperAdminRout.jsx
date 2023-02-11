import React from 'react'
import {
    Routes,
    Route,
    Navigate
} from "react-router-dom";
// import { SuprtAdminAuth } from '../AuthRoute/AuthRout';
import Admindetail from '../Components/SuperAdmin/Admindetail';
import { CreateUser } from '../Components/SuperAdmin/CreateUser';
import ShowAllAdmins from '../Components/SuperAdmin/ShowAllAdmins';
import VerifyProducts from '../Components/SuperAdmin/VerifyProducts';
import SuperAdmin from '../Pages/SuperAdmin/SuperAdmin';
import SuperAdminLogin from '../Pages/SuperAdmin/SuperAdminLogin';

const SuperAdminRout = () => {

    const isLogedinhear = localStorage.getItem("SuprtAdmin");

    return (
        <Routes>
            <Route element={ <SuperAdmin/> } >
                <Route path='/' element={isLogedinhear  ? <Admindetail /> : <Navigate to="/superadmin/login" />} />
                <Route path="/createuser" element={isLogedinhear  ? <CreateUser/> : <Navigate to="/superadmin/login" />} />
                <Route path="/verifyproduct" element={isLogedinhear ? <VerifyProducts /> : <Navigate to="/superadmin/login" />} />
                <Route path="/showAllAdmins" element={isLogedinhear ? <ShowAllAdmins/> : <Navigate to="/superadmin/login" />} />
                <Route path='/login' element={<SuperAdminLogin/>} />
            </Route>
        </Routes>
    )
}

export default SuperAdminRout