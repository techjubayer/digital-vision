import React from "react";
import "./dashboard.css";

export default function Dashboard(props) {
  return (
    <>
      <div
        className={`dashboard bg-${props.appTheme} text-${
          props.appTheme === "dark" ? "light" : "dark"
        }`}
      >
        <h1 className='text-center'>This is Dashboard</h1>
      </div>
    </>
  );
}
