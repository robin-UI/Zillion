import { Outlet } from 'react-router-dom'

import SuperNav from '../../Components/SuperAdminNavbar.js/SuperNav'

const SuperAdmin = () => {
    return (
        <div>
            <SuperNav />
            <div className='flex justify-center h-screen ' >
                <Outlet/>  
            </div>
        </div>
    )
}

export default SuperAdmin