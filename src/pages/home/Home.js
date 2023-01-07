import React, { useEffect } from "react";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import "./home.css";
import { Outlet, useNavigate } from "react-router-dom";

export default function Home(props) {
  const navigate = useNavigate();
  useEffect(() => {
    let userInfo = localStorage.getItem("user-info");
    if (userInfo) {
      const user = JSON.parse(userInfo);
      // console.log(user);
    } else {
      navigate("/login");
    }
  });
  const isSidebarShow = props.isSidebarShow;
  return (
    <>
      <div className={`d-flex i-theme-${props.appTheme}`}>
        <Sidebar
          appTheme={props.appTheme}
          toggleAppTheme={props.toggleAppTheme}
          isSidebarShow={isSidebarShow}
          toggleSideBar={props.toggleSideBar}
        />
        <div className='w-100'>
          <Navbar
            toggleSideBar={props.toggleSideBar}
            appTheme={props.appTheme}
          />
          <Outlet />
        </div>
      </div>

      <div></div>
    </>
  );
}
