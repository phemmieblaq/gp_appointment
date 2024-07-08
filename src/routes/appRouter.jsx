import React, { Suspense,} from "react";
import { Toaster } from "react-hot-toast";
import { BrowserRouter as Router, Routes, Route, Outlet } from "react-router-dom";
import UserRegistration from "../pages/auth/userRegistration";
import Login from "../pages/auth/login";
import UserDashboardLayout from "../pages/user";


import Home from "../pages/user/dashboard";
import BookingForm from "../pages/user/booking";
import Personal from "../pages/user/Settings";
import AppointmentLayout from "../pages/user/appointments/appointmentLayout";

const AppRouter = () => {

return (


  <Suspense >
    <Router> 
      <Routes>
      <Route path="/" element={ <Outlet />}>
      <Route path="booking" element={<BookingForm/>}/>
      <Route path="test" element={<AppointmentLayout/>}/>

      <Route path="register" element={<UserRegistration />} />
      <Route path="signin" element={<Login />} />
      {/* User dashboard routes */}
      <Route
              path="dashboard"
              element={
               
                  
                    <UserDashboardLayout />
                 
              }
            >
              <Route index element={<Home/>} />
              <Route path="home" element={<Home/>} />

              <Route path="settings" element={<Personal/>} />
              <Route path="appointments" element={<AppointmentLayout/>} >
              <Route index element={[]} />
              </Route>

            
            </Route>
        
    
                  
                  </Route>     
      </Routes>
       <Toaster
          position="top-right"
          toastOptions={{
            className: "",
            style: {
              margin: "10px",
              padding: "10px",
              display: "inline-flex",
              fontSize: "14px",
              zIndex: 999999,
            },
            duration: 4000,
            error: {
              style: {
                background: "#ff6363",
                color: "white",
              },
              iconTheme: {
                primary: "white",
                secondary: "red",
              },
            },
            loading: {
              style: {
                background: "#44cff2",
                color: "white",
              },
              iconTheme: {
                primary: "white",
                secondary: "#44cff2",
              },
            },
            success: {
              style: {
                background: "green",
                color: "white",
              },
              iconTheme: {
                primary: "white",
                secondary: "green",
              },
            },
          }}
        />
        </Router>
    </Suspense>
)
     
};


export default AppRouter;
