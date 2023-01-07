import React, { useEffect, useRef, useState } from "react";
import "./profile.css";
import {
  MdOutlinePhone,
  MdPermIdentity,
  MdOutlineGrid3X3,
  MdOutlineMailOutline,
  MdStore,
  MdOutlineFollowTheSigns,
  MdShareLocation,
  MdOutlineRealEstateAgent,
  MdTravelExplore,
  MdDateRange,
  MdOutlineLocationOn,
} from "react-icons/md";
import { useNavigate } from "react-router-dom";

export default function Profile() {
  const [user, setUser] = useState("");
  const navigate = useNavigate();

  const [userId, setUserId] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [token, setToken] = useState("");
  const [name, setName] = useState("");
  const [marketName, setMarketName] = useState("");
  const [pinCode, setPinCode] = useState("");
  const [address, setAddress] = useState("");
  const [state, setState] = useState("");
  const [country, setCountry] = useState("");
  const [shopName, setShopName] = useState("");

  useEffect(() => {
    let userInfo = localStorage.getItem("user-info");
    if (userInfo) {
      setUser(JSON.parse(userInfo));
    }
  }, []);

  const inputId = useRef(null);
  const inputName = useRef(null);
  const inputPhone = useRef(null);
  const inputEmail = useRef(null);
  const inputShopName = useRef(null);
  const inputMarketName = useRef(null);
  const inputPinCode = useRef(null);
  const inputState = useRef(null);
  const inputCountry = useRef(null);
  const inputAddress = useRef(null);
  useEffect(() => {
    if (user) {
      inputId.current.value = user["userId"] ? user["userId"] : "";
      inputName.current.value = user["name"] ? user["name"] : "";
      inputPhone.current.value = user["phone"] ? user["phone"] : "";
      inputEmail.current.value = user["email"] ? user["email"] : "";
      inputShopName.current.value = user["shopName"] ? user["shopName"] : "";
      inputMarketName.current.value = user["marketName"]
        ? user["marketName"]
        : "";
      inputPinCode.current.value = user["pinCode"] ? user["pinCode"] : "";
      inputState.current.value = user["state"] ? user["state"] : "";
      inputCountry.current.value = user["country"] ? user["country"] : "";
      inputAddress.current.value = user["address"] ? user["address"] : "";

      setUserId(user["userId"]);
      setPhone(user["phone"]);
      setToken(user["token"]);
    }
  }, [user]);

  async function submitProfileForm(e) {
    e.preventDefault();

    let formData = {
      userId,
      phone,
      token,
      email,
      name,
      marketName,
      pinCode,
      address,
      state,
      country,
      shopName,
    };

    console.table(formData);
    // return;

    let result = await fetch("http://127.0.0.1:8000/api/update-profile", {
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
      showAlertDialog("User profile suucessfully updated", "success");
    } else {
      showAlertDialog(result["message"], "danger");
      if (result["message"] === "Authentication fail") {
        localStorage.clear("user-info");
        navigate("/login");
      }
    }
  }

  const [alertDisplay, setAlertDisplay] = useState("hide");
  const [alertMessage, setAlerMessage] = useState("");
  const [alertType, setAlertType] = useState("danger");
  function showAlertDialog(message, alertType) {
    setAlertDisplay("");
    setAlerMessage(message);
    setAlertType(alertType);
    setTimeout(() => {
      setAlertDisplay("hide");
    }, 3000);
  }

  return (
    <div className='container'>
      <div className='p-4'>
        <div className='row'>
          <div className='col-lg-9'>
            <form
              action=''
              className='border rounded shadow i-btn-light px-4 py-5'
              onSubmit={submitProfileForm}
            >
              <div className='row p-2'>
                <h4 className='mb-3'>User information</h4>
                <div className='col-lg-6'>
                  <div className='i-input-group'>
                    <input type='text' ref={inputId} placeholder=' ' disabled />
                    <label>User id</label>
                    <span>
                      <MdOutlineGrid3X3 />
                    </span>
                  </div>
                </div>
                <div className='col-lg-6'>
                  <div className='i-input-group'>
                    <input
                      type='text'
                      ref={inputName}
                      onChange={(e) => setName(e.target.value)}
                      placeholder=' '
                      disabled
                    />
                    <label>Enter phone or user id</label>
                    <span>
                      <MdPermIdentity />
                    </span>
                  </div>
                </div>
                <div className='col-lg-6'>
                  <div className='i-input-group'>
                    <input
                      type='text'
                      ref={inputPhone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder=' '
                      disabled
                    />
                    <label>Phone number</label>
                    <span>
                      <MdOutlinePhone />
                    </span>
                  </div>
                </div>
                <div className='col-lg-6'>
                  <div className='i-input-group'>
                    <input
                      type='text'
                      placeholder=' '
                      ref={inputEmail}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                    <label>Email address</label>
                    <span>
                      <MdOutlineMailOutline />
                    </span>
                  </div>
                </div>
                <div className='col-lg-6'>
                  <div className='i-input-group'>
                    <input type='date' placeholder=' ' />
                    <label>Date of birth</label>
                    <span>
                      <MdDateRange />
                    </span>
                  </div>
                </div>
              </div>
              <div className='row p-2'>
                <h4 className='mb-3'>Shop information</h4>
                <div className='col-lg-6'>
                  <div className='i-input-group'>
                    <input
                      type='text'
                      ref={inputShopName}
                      onChange={(e) => setShopName(e.target.value)}
                      placeholder=' '
                      required
                    />
                    <label>Shop name</label>
                    <span>
                      <MdStore />
                    </span>
                  </div>
                </div>
                <div className='col-lg-6'>
                  <div className='i-input-group'>
                    <input
                      type='text'
                      ref={inputMarketName}
                      onChange={(e) => setMarketName(e.target.value)}
                      placeholder=' '
                      required
                    />
                    <label>Market name</label>
                    <span>
                      <MdOutlineFollowTheSigns />
                    </span>
                  </div>
                </div>
                <div className='col-lg-6'>
                  <div className='i-input-group'>
                    <input
                      type='text'
                      ref={inputPinCode}
                      onChange={(e) => setPinCode(e.target.value)}
                      placeholder=' '
                      required
                    />
                    <label>Pin code</label>
                    <span>
                      <MdShareLocation />
                    </span>
                  </div>
                </div>
                <div className='col-lg-6'>
                  <div className='i-input-group'>
                    <input
                      type='text'
                      placeholder=' '
                      ref={inputState}
                      onChange={(e) => setState(e.target.value)}
                      required
                    />
                    <label>State</label>
                    <span>
                      <MdOutlineRealEstateAgent />
                    </span>
                  </div>
                </div>
                <div className='col-lg-6'>
                  <div className='i-input-group'>
                    <input
                      type='text'
                      placeholder=' '
                      ref={inputCountry}
                      onChange={(e) => setCountry(e.target.value)}
                      required
                    />
                    <label>Country</label>
                    <span>
                      <MdTravelExplore />
                    </span>
                  </div>
                </div>
                <div>
                  <div className='i-input-group'>
                    <input
                      type='text'
                      placeholder=' '
                      ref={inputAddress}
                      onChange={(e) => setAddress(e.target.value)}
                      required
                    />
                    <label>Shop address</label>
                    <span>
                      <MdOutlineLocationOn />
                    </span>
                  </div>
                </div>
              </div>
              <div>
                <div
                  className={`alert alert-${alertType} ${alertDisplay} text-center`}
                  role='alert'
                >
                  {alertMessage}
                </div>
                <button className='i-btn i-btn-primary w-75 m-auto d-block'>
                  Update
                </button>
              </div>
            </form>
          </div>
          <div className='col-lg-3 border shadow p-3'></div>
        </div>
      </div>
    </div>
  );
}
