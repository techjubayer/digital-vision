import "./sidebar.css";

import {
  MdDashboard,
  MdSettings,
  MdPermIdentity,
  MdApi,
  MdClose,
} from "react-icons/md";
import { NavLink } from "react-router-dom";
import { useState } from "react";

export default function Sidebar(props) {
  let checked = props.appTheme === "dark" ? true : "";
  const sideMenu = [
    {
      path: "/",
      name: "Dashboard",
      icon: <MdDashboard />,
    },
    {
      path: "/settings",
      name: "Settings",
      icon: <MdSettings />,
    },
    {
      path: "/users",
      name: "Users",
      icon: <MdPermIdentity />,
    },
    {
      path: "/apis",
      name: "Api Details",
      icon: <MdApi />,
    },
  ];
  const width = window.innerWidth;
  const hideSideBar = () => {
    if (width < 768) {
      props.toggleSideBar();
    }
  };

  const isSidebarShow = props.isSidebarShow;

  return (
    <div
      className={`i-sidebar d-flex flex-column border-right bg-${
        props.appTheme
      } text-${props.appTheme === "dark" ? "light" : "dark"} ${
        isSidebarShow ? "" : "active"
      }`}
    >
      <div className='i-sidebar-header d-flex justify-content-around p-3'>
        <img
          className='rounded-circle shadow-4-strong'
          alt='Not Found'
          height={"40px"}
          width={"40px"}
          src='https://mdbcdn.b-cdn.net/img/new/avatars/1.webp'
        />
        <h5 className='m-auto'>Jubayer Ali</h5>
        <span onClick={props.toggleSideBar}>
          <MdClose />
        </span>
      </div>
      <div className='i-sidebar-body'>
        {sideMenu.map((item, key) => (
          <NavLink
            to={item.path}
            key={key}
            className='d-flex text-decoration-none px-4 py-2'
            onClick={hideSideBar}
          >
            <div className='mx-1 my-auto'>{item.icon}</div>
            <div className='mx-1 my-auto'>{item.name}</div>
          </NavLink>
        ))}
      </div>
      <div className='i-sidebar-footer mt-auto py-2 px-3'>
        <div className={`form-check form-switch text-white text-small`}>
          <label className='custom-control-label'>
            {isSidebarShow
              ? `${
                  props.appTheme === "dark" ? "Dark Mode On" : "Dark Mode Off"
                }`
              : ""}
          </label>
          <input
            type='checkbox'
            className='form-check-input'
            onClick={props.toggleAppTheme}
            checked={checked}
            onChange={props.toggleAppTheme}
          />
        </div>
      </div>
    </div>
  );
}
