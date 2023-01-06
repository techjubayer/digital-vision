import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import AppSetting from "./pages/settings/AppSetting";
import { useState } from "react";
import Apis from "./pages/apis/Apis";
import Home from "./pages/home/Home";
import Login from "./pages/auth/login/Login";
import Signup from "./pages/auth/signup/Signup";
import Reset from "./pages/auth/reset-pass/Reset";
import Otp from "./pages/auth/otp-verify/Otp";
import Dashboard from "./pages/dashboard/Dashboard";

function App() {
  const [appTheme, setAppTheme] = useState("light");
  const toggleAppTheme = () => {
    if (appTheme === "dark") {
      setAppTheme("light");
    } else {
      setAppTheme("dark");
    }
  };

  const [isSidebarShow, setIsSidebarShow] = useState(true);
  function toggleSideBar() {
    setIsSidebarShow(!isSidebarShow);
  }
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route
            path='/'
            element={
              <Home
                appTheme={appTheme}
                toggleAppTheme={toggleAppTheme}
                isSidebarShow={isSidebarShow}
                toggleSideBar={toggleSideBar}
              />
            }
          >
            <Route
              index
              element={
                <Dashboard toggleSideBar={toggleSideBar} appTheme={appTheme} />
              }
            ></Route>
            <Route
              path='/settings'
              element={<AppSetting appTheme={appTheme} />}
            ></Route>
            <Route path='/apis' element={<Apis appTheme={appTheme} />}></Route>
          </Route>

          <Route path='/login' element={<Login />}></Route>
          <Route path='/register' element={<Signup />}></Route>
          <Route path='/reset' element={<Reset />}></Route>
          <Route path='/otp' element={<Otp />}></Route>
          <Route path='/*' element={<Navigate to='/' />}></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
