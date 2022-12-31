import React, { useEffect, useRef, useState } from "react";
import "./apis.css";
import { MdOpenInNew } from "react-icons/md";

export default function Apis() {
  const [apiBalances, setApiBalance] = useState();
  const isApiCalled = useRef(false);
  let totalBalance = 0;

  const fetchData = () => {
    fetch("https://api.digitalvision.store/recharge/apiBalance/").then(
      (response) => {
        response.json().then((jsonData) => {
          setApiBalance(jsonData);
        });
      }
    );
  };

  useEffect(() => {
    if (isApiCalled.current) return;
    isApiCalled.current = true;

    fetchData();
  }, []);

  return (
    <div className='container'>
      {apiBalances != null ? (
        apiBalances.response ? (
          <>
            <div className='row'>
              {Object.keys(apiBalances.message).map((item, index) => {
                totalBalance =
                  totalBalance + Number(apiBalances.message[item].balance);
                return (
                  <ApiBalanceCardView
                    key={index}
                    color={index + 1}
                    provider={item.toUpperCase()}
                    balance={apiBalances.message[item].balance}
                  />
                );
              })}

              <ApiBalanceCardView
                color={0}
                provider='TOTAL'
                balance={totalBalance}
              />
            </div>
          </>
        ) : (
          apiBalances.message
        )
      ) : (
        "Loading..."
      )}
    </div>
  );
}

function ApiBalanceCardView(props) {
  return (
    <div className='col-md-4 col-xl-3'>
      <div className={`card bg-c-${props.color} order-card`}>
        <div className='card-block'>
          <h6 className='m-b-20'>{props.provider} BALANCE</h6>
          <h2 className='text-right'>
            <i className='fa fa-rocket f-left'></i>
            <span>₹ {props.balance}</span>
          </h2>
          <p className='m-b-0'>
            Visit site
            <span className='f-right'>
              <MdOpenInNew />
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}
