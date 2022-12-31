import React from "react";
import { MdPermIdentity } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import "./reset.css";
export default function Reset() {
  const navigate = useNavigate();
  return (
    <>
      <div className='container d-flex justify-content-center align-items-center'>
        <div className='form-container rounded shadow p-5'>
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
              <h2>Reset password</h2>
              <form action='' className='my-3'>
                <div className='i-input-group'>
                  <input id='login_EP' type='text' placeholder=' ' required />
                  <label>Enter email or phone</label>
                  <span>
                    <MdPermIdentity />
                  </span>
                </div>
                <button
                  id='btn_loginSubmit'
                  className='i-btn i-btn-primary w-100'
                  onClick={() => navigate("/otp")} //Testing code----delete it
                >
                  Reset
                </button>
              </form>
              <div className='d-flex justify-content-end align-items-center mt-4'>
                <h6>Remember password?</h6>
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
