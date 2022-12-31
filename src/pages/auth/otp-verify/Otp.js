import React from "react";
import "./otp.css";
import { MdOutlineEdit } from "react-icons/md";
import { useNavigate } from "react-router-dom";

export default function Otp() {
  const navigator = useNavigate();
  const goToPreviousPath = () => {
    navigator(-1);
  };


  function focusNextInput(view) {
    const value = view.target.value;
    const form = view.target.form;
    let index = [...form].indexOf(view.target);
    if (Number(value.length) === 1) {
      index = index + 1;
    } else {
      index = index - 1;
    }
    if (index >= 0 && index < 5) {
      form[index].focus();
    }
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
                alt='Login Image'
                width='300px'
              />
            </div>
            <div className='col-lg-6'>
              <div className='otp-verify-div'>
                <img
                  className='d-block m-auto mb-4'
                  src='https://digitalvision.store/images/icons/ic_phone_varify.png'
                  width='80px'
                  alt=''
                />
                <h5 id=''>Phone Number Verify</h5>
                <p id='otp_to_phone'>
                  Enter the otp send to your mobile number 8638199107{" "}
                  <span onClick={() => goToPreviousPath()}>
                    <MdOutlineEdit />
                  </span>
                </p>
                <form>
                  <div>
                    <input
                      className='otp_input'
                      type='tel'
                      maxLength='1'
                      onKeyUp={focusNextInput}
                    />
                    <input
                      className='otp_input'
                      type='tel'
                      maxLength='1'
                      onKeyUp={focusNextInput}
                    />
                    <input
                      className='otp_input'
                      type='tel'
                      maxLength='1'
                      onKeyUp={focusNextInput}
                    />
                    <input
                      className='otp_input'
                      type='tel'
                      maxLength='1'
                      onKeyUp={focusNextInput}
                    />
                    <input
                      className='otp_input'
                      type='tel'
                      maxLength='1'
                      onKeyUp={focusNextInput}
                    />
                  </div>
                  <button className='i-btn i-btn-primary w-100 d-block'>
                    Submit
                  </button>
                </form>
                <div className='loginactivity d-flex justify-content-end mt-4'>
                  <h6 className='mt-2'>Don't recieve the otp?</h6>
                  <div>
                    <button className='i-btn i-btn-primary mx-1'>Resend</button>
                    <p className='text-center my_text'>
                      <small>3:00</small>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
