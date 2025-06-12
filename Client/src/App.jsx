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
import AdminViewVehicle1 from "./component/Admin/AdminViewVehicle1";
import UserProfile from "./component/User/UserProfile";
import UserEditProfile from "./component/User/UserEditProfile";
import UserViewPackage from "./component/User/UserViewPackage";
import UserSelectPackage from "./component/User/UserSelectPackage";
import UserBooking from "./component/User/UserBooking";
import AdminViewBookings from "./component/Admin/AdminViewBookings";
import UserPayment from "./component/User/UserPayment";
import AdminViewPayment from "./component/Admin/AdminViewPayment";

import "bootstrap/dist/css/bootstrap.min.css";

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
        <Route path="/adminviewvehicle1" element={<AdminViewVehicle1/>}/>
        <Route path="/adminviewbooking" element={<AdminViewBookings/>}/>
        <Route path="/adminviewpayments" element={<AdminViewPayment/>}/>
        
        {/* User page route */}
        <Route path="/userhome" element={<UserHome />} />
        <Route path="/userprofile" element={<UserProfile/>} />
        <Route path="/edituser/:id" element={<UserEditProfile/>} />
        <Route path="/userviewpackage" element={<UserViewPackage/>} />
        <Route path="/userselectpackage/:id" element={<UserSelectPackage/>}></Route>
        <Route path="/userbooking" element={<UserBooking/>}/>
        <Route path="/userpayment/:id" element={<UserPayment/>}/>
      </Routes>
    </BrowserRouter>  
    
    </>
  )
}

export default App
