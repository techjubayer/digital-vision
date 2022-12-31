import React from "react";

export default function AppSetting(props) {
  return (
    <div
      className={`w-100 bg-${props.appTheme} text-${
        props.appTheme === "dark" ? "light" : "dark"
      }`}
    >
      <h1 className='text-center pt-5'>This is app setting page</h1>
    </div>
  );
}
