import React, { useRef, useState } from "react";
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
import CryptoJS from "crypto-js";

export default function Signup() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [passValues1, setPassValues1] = useState({
    password: "",
    showPassword: false,
  });
  const [passValues2, setPassValues2] = useState({
    password: "",
    showPassword: false,
  });

  const inputName = useRef(null);
  const inputPhone = useRef(null);
  const inputPass1 = useRef(null);
  const inputPass2 = useRef(null);

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
  const [alertDisplay, setAlertDisplay] = useState("hide");
  const [alertMessage, setAlerMessage] = useState("");

  async function submitSignUpForm(e) {
    e.preventDefault();

    if (!name || name.length < 3) {
      showAlertDialog("Please enter valid name");
      inputName.current.focus();
      return;
    }

    if (!phone || phone.length < 10) {
      showAlertDialog("Please enter valid number");
      inputPhone.current.focus();
      return;
    }
    if (!passValues1.password || passValues1.password < 8) {
      showAlertDialog("Password must be 8 character length");
      inputPass1.current.focus();
      return;
    }

    if (passValues1.password != passValues2.password) {
      showAlertDialog("Confirm password not match");
      inputPass2.current.focus();
      return;
    }

    let formData = {
      phone: phone,
      name: name,
      email: email,
      password: CryptoJS.MD5(passValues2.password).toString(),
    };

    console.table(formData);

    let result = await fetch("http://127.0.0.1:8000/api/signup", {
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
      setAlertDisplay("");
      setAlerMessage(result["message"]);
      setTimeout(() => {
        setAlertDisplay("hide");
      }, 3000);
    }
  }

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
              <form action='' className='my-3' onSubmit={submitSignUpForm}>
                <div className='i-input-group'>
                  <input
                    type='text'
                    placeholder=' '
                    onChange={(e) => setName(e.target.value)}
                    required
                    ref={inputName}
                  />
                  <label>Enter name *</label>
                  <span>
                    <MdPermIdentity />
                  </span>
                </div>
                <div className='i-input-group'>
                  <input
                    type='tel'
                    placeholder=' '
                    onChange={(e) => setPhone(e.target.value)}
                    required
                    ref={inputPhone}
                  />
                  <label>Enter mobile number *</label>
                  <span>
                    <MdOutlinePhone />
                  </span>
                </div>
                <div className='i-input-group'>
                  <input
                    type='email'
                    placeholder=' '
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <label>Enter email address</label>
                  <span>
                    <MdMailOutline />
                  </span>
                </div>
                <div className='i-input-group'>
                  <input
                    type={passValues1.showPassword ? "text" : "password"}
                    placeholder=' '
                    onChange={(e) =>
                      setPassValues1({
                        password: e.target.value,
                        showPassword: passValues1.showPassword,
                      })
                    }
                    required
                    ref={inputPass1}
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
                    type={passValues2.showPassword ? "text" : "password"}
                    placeholder=' '
                    onChange={(e) =>
                      setPassValues2({
                        password: e.target.value,
                        showPassword: passValues2.showPassword,
                      })
                    }
                    required
                    ref={inputPass2}
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
                <div
                  className={`alert alert-danger ${alertDisplay} text-center`}
                  role='alert'
                >
                  {alertMessage}
                </div>
                <button className='i-btn i-btn-primary w-100'>Submit</button>
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
