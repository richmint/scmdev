import React, { useContext } from 'react';
import "./new.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import { useState } from "react";
import { DarkModeContext } from "../../context/darkModeContext";
const Warehouseform = ({ inputs, title, value }) => {
  const { dispatch, metaMask, warehouseContract } = useContext(DarkModeContext);
  const [errorMessage, setErrorMessage] = useState(null);
  const [allWarehouse, setAllWarehouse] = useState(null);
  const [defaultAccount, setDefaultAccount] = useState(null);
  const [whContract, setContract] = useState(warehouseContract);
  //console.log("whContract",whContract);
  const addWarehouseHandler = (event) => {
    event.preventDefault();
    // console.log(whContract);
     console.log('sending ' + event.target.hashAddress.value + ' to the whContract');
    warehouseContract.addWarehouse(event.target.hashAddress.value);

      const requestOptions = {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            "hashAddress":event.target.hashAddress.value,
            "name":event.target.name.value,
            "email":event.target.email.value,
            "address":event.target.location.value,
            "password":event.target.hashAddress.value,
            "role":'Warehouse'
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
            <form onSubmit={addWarehouseHandler}>
              <div className="formInput">
                <label>Warehouse Hash Address</label>
                <input id="hashAddress" type="text" />
              </div>
              <div className="formInput">
                <label>Warehouse Name</label>
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
              <button type={"submit"}> Submit </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Warehouseform;
