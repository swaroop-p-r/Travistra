// import './App.css'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePg from './component/Home/homePg';
import UserReg from './component/User/userReg';
import Login from "./component/Login";
import AdminHome from "./component/Admin/adminHome";
import UserHome from "./component/User/UserHome";
import AdminViewUser from "./component/Admin/AdminViewUser";
import AdminViewPackage from "./component/Admin/AdminViewPackage";
import AdminPackage from "./component/Admin/AdminPackage";
import AdminVehicle from "./component/Admin/AdminVehicle";
import AdminViewVehicle from "./component/Admin/AdminViewVehicle";

function App() {

  return (
    <>
    <BrowserRouter>
      <Routes>
        {/* Home page route */}
        <Route path="/" element={<HomePg />} />
        <Route path='/register' element={<UserReg />}/>
        <Route path='/login' element={<Login />}/>
        {/* Admin page route */}
        <Route path="/adminhome" element={<AdminHome />} />
        <Route path="/adminviewusers" element={<AdminViewUser/>} />
        <Route path="/adminviewpackage" element={<AdminViewPackage />} />
        <Route path="/adminpackage" element={<AdminPackage />}/>
        <Route path="/adminvehicle" element={<AdminVehicle />}/>
        <Route path="/adminviewvehicle" element={<AdminViewVehicle/>}/>
        
        {/* User page route */}
        <Route path="/userhome" element={<UserHome />} />
      </Routes>
    </BrowserRouter>  
    
    </>
  )
}

export default App
