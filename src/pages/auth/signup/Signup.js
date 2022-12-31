import React, { useState } from "react";
import {
  MdLockOutline,
  MdOutlineVisibility,
  MdOutlineVisibilityOff,
  MdPermIdentity,
  MdOutlinePhone,
  MdMailOutline,
} from "react-icons/md";
import { useNavigate } from "react-router-dom";
import "./signup.css";

export default function Signup() {
  const navigate = useNavigate();
  const [passValues1, setPassValues1] = useState({
    password: "",
    showPassword: false,
  });
  const [passValues2, setPassValues2] = useState({
    password: "",
    showPassword: false,
  });

  const togglePass1 = () => {
    setPassValues1({
      password: passValues1.password,
      showPassword: !passValues1.showPassword,
    });
  };
  const togglePass2 = () => {
    setPassValues2({
      password: passValues2.password,
      showPassword: !passValues2.showPassword,
    });
  };
  return (
    <>
      <div className='container d-flex justify-content-center align-items-center'>
        <div className='form-container rounded shadow px-5 py-5 '>
          <div className='row align-items-center'>
            <div className='col-lg-6'>
              <img
                className='d-block m-auto'
                src='https://cdni.iconscout.com/illustration/premium/thumb/digital-marketing-3678955-3092463.png'
                alt='Login Image'
                width='300px'
              />
            </div>
            <div className='col-lg-6'>
              <h2>Sign Up</h2>
              <form action='' className='my-3'>
                <div className='i-input-group'>
                  <input id='login_EP' type='text' placeholder=' ' required />
                  <label>Enter name *</label>
                  <span>
                    <MdPermIdentity />
                  </span>
                </div>
                <div className='i-input-group'>
                  <input id='login_EP' type='tel' placeholder=' ' required />
                  <label>Enter mobile number *</label>
                  <span>
                    <MdOutlinePhone />
                  </span>
                </div>
                <div className='i-input-group'>
                  <input id='login_EP' type='email' placeholder=' ' required />
                  <label>Enter email address</label>
                  <span>
                    <MdMailOutline />
                  </span>
                </div>
                <div className='i-input-group'>
                  <input
                    id='login_Pass'
                    type={passValues1.showPassword ? "text" : "password"}
                    placeholder=' '
                    required
                  />
                  <label>Enter password *</label>
                  <span>
                    <MdLockOutline />
                  </span>
                  <span className='icon-right' onClick={() => togglePass1()}>
                    {passValues1.showPassword ? (
                      <MdOutlineVisibilityOff />
                    ) : (
                      <MdOutlineVisibility />
                    )}
                  </span>
                </div>
                <div className='i-input-group'>
                  <input
                    id='login_Pass'
                    type={passValues2.showPassword ? "text" : "password"}
                    placeholder=' '
                    required
                  />
                  <label>Re-enter password *</label>
                  <span>
                    <MdLockOutline />
                  </span>
                  <span className='icon-right' onClick={() => togglePass2()}>
                    {passValues2.showPassword ? (
                      <MdOutlineVisibilityOff />
                    ) : (
                      <MdOutlineVisibility />
                    )}
                  </span>
                </div>
                <button
                  onClick={() => navigate("/otp")}
                  className='i-btn i-btn-primary w-100'
                >
                  Submit
                </button>
              </form>
              <div className='d-flex justify-content-end align-items-center mt-4'>
                <h6>Already have an account?</h6>
                <button
                  className='i-btn i-btn-primary mx-1'
                  onClick={() => navigate("/login")}
                >
                  Login
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
