
// // import './App.css'
// import { BrowserRouter, Routes, Route } from "react-router-dom";
// import HomePg from './component/Home/homePg';
// import UserReg from './component/User/userReg';
// import Login from "./component/Login";
// import AdminHome from "./component/Admin/adminHome";
// import UserHome from "./component/User/UserHome";
// import AdminViewUser from "./component/Admin/AdminViewUser";
// import AdminViewPackage from "./component/Admin/AdminViewPackage";
// import AdminPackage from "./component/Admin/AdminPackage";
// import AdminVehicle from "./component/Admin/AdminVehicle";
// import AdminViewVehicle from "./component/Admin/AdminViewVehicle";
// import AdminViewVehicle1 from "./component/Admin/AdminViewVehicle1";
// import UserProfile from "./component/User/UserProfile";
// import UserEditProfile from "./component/User/UserEditProfile";
// import UserViewPackage from "./component/User/UserViewPackage";
// import UserSelectPackage from "./component/User/UserSelectPackage";
// import UserBooking from "./component/User/UserBooking";
// import AdminViewBookings from "./component/Admin/AdminViewBookings";
// import UserPayment from "./component/User/UserPayment";
// import AdminViewPayment from "./component/Admin/AdminViewPayment";

// import "bootstrap/dist/css/bootstrap.min.css";
// import MissingPage from "./component/MissingPg/MissingPage";

// function App() {

//   return (
//     <>
//     <BrowserRouter>
//       <Routes>
//         {/* Missing Page */}
//         <Route path="/*" element={<MissingPage/>}/>
//         {/* Home page route */}
//         <Route path="/" element={<HomePg />} />
//         <Route path='/register' element={<UserReg />}/>
//         <Route path='/login' element={<Login />}/>
//         {/* <Route path="/van" element={<VantaHero/>}/> */}
//         {/* Admin page route */}
//         <Route path="/adminhome" element={<AdminHome />} />
//         <Route path="/adminviewusers" element={<AdminViewUser/>} />
//         <Route path="/adminviewpackage" element={<AdminViewPackage />} />
//         <Route path="/adminpackage" element={<AdminPackage />}/>
//         <Route path="/adminvehicle" element={<AdminVehicle />}/>
//         <Route path="/adminviewvehicle" element={<AdminViewVehicle/>}/>
//         <Route path="/adminviewvehicle1" element={<AdminViewVehicle1/>}/>
//         <Route path="/adminviewbooking" element={<AdminViewBookings/>}/>
//         <Route path="/adminviewpayments" element={<AdminViewPayment/>}/>

//         {/* User page route */}
//         <Route path="/userhome" element={<UserHome />} />
//         <Route path="/userprofile" element={<UserProfile/>} />
//         <Route path="/edituser/:id" element={<UserEditProfile/>} />
//         <Route path="/userviewpackage" element={<UserViewPackage/>} />
//         <Route path="/userselectpackage/:id" element={<UserSelectPackage/>}></Route>
//         <Route path="/userbooking" element={<UserBooking/>}/>
//         <Route path="/userpayment/:id" element={<UserPayment/>}/>
//       </Routes>
//     </BrowserRouter>  

//     </>
//   )
// }

import { Suspense, lazy } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Lottie from 'lottie-react';
import loadingAnimation from './animations/loading.json';
// import DragDropSortableUploader from "./component/Admin/AdminViewVehicle1"; // Normal import since likely not reused elsewhere

const HomePg = lazy(() => import('./component/Home/homePg'));
const UserReg = lazy(() => import('./component/User/UserReg'));
const Login = lazy(() => import('./component/Login'));
const AdminHome = lazy(() => import('./component/Admin/adminHome'));
const UserHome = lazy(() => import('./component/User/UserHome'));
const AdminViewUser = lazy(() => import('./component/Admin/AdminViewUser'));
const AdminViewPackage = lazy(() => import('./component/Admin/AdminViewPackage'));
const AdminPackage = lazy(() => import('./component/Admin/AdminPackage'));
const AdminVehicle = lazy(() => import('./component/Admin/AdminVehicle'));
const AdminViewVehicle = lazy(() => import('./component/Admin/AdminViewVehicle'));
const UserProfile = lazy(() => import('./component/User/UserProfile'));
const UserEditProfile = lazy(() => import('./component/User/UserEditProfile'));
const UserViewPackage = lazy(() => import('./component/User/UserViewPackage'));
const UserSelectPackage = lazy(() => import('./component/User/UserSelectPackage'));
const UserBooking = lazy(() => import('./component/User/UserBooking'));
const AdminViewBookings = lazy(() => import('./component/Admin/AdminViewBookings'));
const UserPayment = lazy(() => import('./component/User/UserPayment'));
const AdminViewPayment = lazy(() => import('./component/Admin/AdminViewPayment'));
const MissingPage = lazy(() => import('./component/MissingPg/MissingPage'));
const ForgotPage = lazy(() => import('./component/Home/ForgotPassword'));

function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={
        <div className="d-flex flex-column align-items-center" style={{ marginTop: '50px' }}>
          <Lottie animationData={loadingAnimation} loop={true} style={{ maxHeight: '150px', maxWidth: '250px' }} />
        </div>
      }>
        <Routes>
          <Route path="/*" element={<MissingPage />} />
          <Route path="/" element={<HomePg />} />
          <Route path="/register" element={<UserReg />} />
          <Route path="/login" element={<Login />} />
          <Route path="/forgotpassword" element={<ForgotPage />} />
          <Route path="/adminhome" element={<AdminHome />} />
          <Route path="/adminviewusers" element={<AdminViewUser />} />
          <Route path="/adminviewpackage" element={<AdminViewPackage />} />
          <Route path="/adminpackage" element={<AdminPackage />} />
          <Route path="/adminvehicle" element={<AdminVehicle />} />
          <Route path="/adminviewvehicle" element={<AdminViewVehicle />} />
          {/* <Route path="/adminviewvehicle1" element={<DragDropSortableUploader />} /> */}
          <Route path="/adminviewbooking" element={<AdminViewBookings />} />
          <Route path="/adminviewpayments" element={<AdminViewPayment />} />
          <Route path="/userhome" element={<UserHome />} />
          <Route path="/userprofile" element={<UserProfile />} />
          <Route path="/edituser/:id" element={<UserEditProfile />} />
          <Route path="/userviewpackage" element={<UserViewPackage />} />
          <Route path="/userselectpackage/:id" element={<UserSelectPackage />} />
          <Route path="/userbooking" element={<UserBooking />} />
          <Route path="/userpayment/:id" element={<UserPayment />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;
