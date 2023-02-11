import SuperAdminRout from "./router/SuperAdminRout";
import AdminRoute from "./router/AdminRoute";
import AdminUserRouter from "./router/AdminUserRouter";
import UserRoute from "./router/UserRoute";

import { Route, Routes } from "react-router-dom";


function App() {
  return (
    
    <Routes>
      <Route path="/*" element={<UserRoute/>} />
      <Route path="/admin/*" element={ <AdminRoute/>  } />
      <Route path="/superadmin/*" element={ <SuperAdminRout/>  } />
      <Route path="/adminuser/*" element={ <AdminUserRouter/> } />
    </Routes>

  );
}

export default App;
