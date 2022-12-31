import React, { useEffect } from "react";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import Dashboard from "../dashboard/Dashboard";
import "./home.css";
import { useNavigate } from "react-router-dom";

export default function Home(props) {
  const navigate = useNavigate();
  useEffect(() => {
    let userToken = localStorage.getItem("token");
    console.log(userToken);
    if (!userToken) {
      navigate("/login");
    } else {
      navigate("/");
    }
  }, []);
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
          <Dashboard
            toggleSideBar={props.toggleSideBar}
            appTheme={props.appTheme}
          />
        </div>
      </div>

      <div></div>
    </>
  );
}
