import React from "react";
import "./dashboard.css";

export default function Dashboard(props) {
  return (
    <>
      <div
        className={`dashboard bg-${
          props.appTheme
        } text-${props.appTheme === "dark" ? "light" : "dark"}`}
      >
      
      </div>
    </>
  );
}
