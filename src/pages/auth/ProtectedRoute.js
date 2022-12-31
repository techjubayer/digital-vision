import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function ProtectedRoute(props) {
  const { Component } = props;
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
  return <Component />;
}
