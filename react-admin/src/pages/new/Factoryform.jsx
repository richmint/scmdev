import React, { useContext } from 'react';
import "./new.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import { useState } from "react";
import { DarkModeContext } from "../../context/darkModeContext";
const Factoryform = ({ inputs, title, value }) => {
  const { dispatch, metaMask, factoryContract } = useContext(DarkModeContext);
  const [errorMessage, setErrorMessage] = useState(null);
  const [allWarehouse, setAllWarehouse] = useState(null);
  const [defaultAccount, setDefaultAccount] = useState(null);
  const [fContract, setContract] = useState(factoryContract);
  //console.log("fContract",fContract);
  const addFactoryHandler = (event) => {
    event.preventDefault();
    console.log(fContract);
    // console.log('sending ' + event.target.hashaddress.value + ' to the fContract');
    factoryContract.addFactory(event.target.hashaddress.value);

    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        "hashAddress":event.target.hashaddress.value,
        "name":event.target.name.value,
        "email":event.target.email.value,
        "address":event.target.location.value,
        "password":event.target.hashaddress.value,
        "role":'Factory'
        })
  };
  fetch('http://162.215.222.118:5150/register', requestOptions)
      .then(response => response.json());

  }
  return (
    <div className="new">
      <Sidebar />
      <div className="newContainer">
        <Navbar />
        <div className="top">
          <h1>{title}</h1>
        </div>
        <div className="bottom">
          <div className="right">
            <form onSubmit={addFactoryHandler}>
              <div className="formInput">
                <label>Factory Hash Address</label>
                <input id="hashaddress" type="text" />
              </div>
              <div className="formInput">
                <label>Factory Name</label>
                <input id="name" type="text" />
              </div>
              <div className="formInput">
                <label>Email</label>
                <input id="email" type="text" />
              </div>
              <div className="formInput">
                <label>Location</label>
                <input id="location" type="text" />
              </div>
              <button type={"submit"}> Add Factory </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Factoryform;
