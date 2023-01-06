import React, { useEffect, useState } from "react";
import "./login.css";
import {
  MdLockOutline,
  MdOutlineVisibility,
  MdOutlineVisibilityOff,
  MdPermIdentity,
} from "react-icons/md";
import { useNavigate } from "react-router-dom";
import CryptoJS from "crypto-js";

export default function Login() {
  const navigate = useNavigate();
  const [passValues, setPassValues] = useState({
    password: "",
    showPassword: false,
  });
  const [emailPhone, setEmailPhone] = useState("");

  const [alertDisplay, setAlertDisplay] = useState("hide");
  const [alertMessage, setAlerMessage] = useState("");
  const togglePass = () => {
    setPassValues({
      password: passValues.password,
      showPassword: !passValues.showPassword,
    });
  };

  async function submitLoginForm(e) {
    e.preventDefault();

    let formData = {
      ip: emailPhone,
      password: CryptoJS.MD5(passValues.password).toString(),
    };

    console.table(formData);

    let result = await fetch("http://127.0.0.1:8000/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(formData),
    });

    result = await result.json();

    if (result["response"]) {
      localStorage.setItem("user-info", JSON.stringify(result["user"]));
      navigate("/");
    } else {
      showAlertDialog(result["message"]);
    }
  }

  useEffect(() => {
    if (localStorage.getItem("user-info")) {
      navigate("/");
    }
  });

  function showAlertDialog(message) {
    setAlertDisplay("");
    setAlerMessage(message);
    setTimeout(() => {
      setAlertDisplay("hide");
    }, 3000);
  }
  return (
    <>
      <div className='container d-flex justify-content-center align-items-center'>
        <div className='form-container rounded shadow p-5'>
          <div className='row align-items-center'>
            <div className='col-lg-6'>
              <img
                className='d-block m-auto'
                src='https://cdni.iconscout.com/illustration/premium/thumb/digital-marketing-3678955-3092463.png'
                alt='Not found'
                width='300px'
              />
            </div>
            <div className='col-lg-6'>
              <h2>Login</h2>
              <form action='' className='my-3' onSubmit={submitLoginForm}>
                <div className='i-input-group'>
                  <input
                    id='login_EP'
                    type='text'
                    placeholder=' '
                    required
                    onChange={(e) => setEmailPhone(e.target.value)}
                  />
                  <label>Enter phone or user id</label>
                  <span>
                    <MdPermIdentity />
                  </span>
                </div>
                <div className='i-input-group'>
                  <input
                    id='login_Pass'
                    type={passValues.showPassword ? "text" : "password"}
                    placeholder=' '
                    onChange={(e) =>
                      setPassValues({
                        password: e.target.value,
                        showPassword: passValues.showPassword,
                      })
                    }
                    required
                  />
                  <label>Enter password</label>
                  <span>
                    <MdLockOutline />
                  </span>
                  <span className='icon-right' onClick={() => togglePass()}>
                    {passValues.showPassword ? (
                      <MdOutlineVisibilityOff />
                    ) : (
                      <MdOutlineVisibility />
                    )}
                  </span>
                </div>

                <div
                  className={`alert alert-danger ${alertDisplay} text-center`}
                  role='alert'
                >
                  {alertMessage}
                </div>

                <button
                  id='btn_loginSubmit'
                  className='i-btn i-btn-primary w-100'
                >
                  Submit
                </button>
              </form>
              <div className='d-flex justify-content-end align-items-center mt-4'>
                <h6>Forgot password?</h6>
                <button
                  className='i-btn i-btn-primary mx-1'
                  onClick={() => navigate("/reset")}
                >
                  Reset
                </button>
              </div>
              <div className='d-flex justify-content-end align-items-center mt-3'>
                <h6>Do not have an account?</h6>
                <button
                  className='i-btn i-btn-primary mx-1'
                  onClick={() => navigate("/register")}
                >
                  Sign Up
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
