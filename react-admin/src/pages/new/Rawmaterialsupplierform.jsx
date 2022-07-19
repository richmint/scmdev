import React, { useContext } from 'react';
import "./new.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import { useState } from "react"; 
import { DarkModeContext } from "../../context/darkModeContext";
const RawMaterialSupplier = ({ inputs, title, value }) => {
  const { dispatch, metaMask, supplyChainContract } = useContext(DarkModeContext);
  const [errorMessage, setErrorMessage] = useState(null);
  const [SCContract, setSCContract] = useState(supplyChainContract);
  //console.log("SCContract",SCContract);
  const addrawmaterialsupplierHandler = (event) => {
    event.preventDefault();
    console.log(SCContract);
    SCContract.addRawMaterialSupplier(event.target.hashAddress.value);

    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        "hashAddress":event.target.hashAddress.value,
        "name":event.target.name.value,
        "email":event.target.email.value,
        "address":event.target.location.value,
        "role":'Supplier'
        })
  };
  fetch('http://127.0.0.1:5150/register', requestOptions)
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
            <form onSubmit={addrawmaterialsupplierHandler}>
              <div className="formInput">
                <label>Raw Material Supplier Hash Address</label>
                <input id="hashAddress" type="text" />
              </div>
              <div className="formInput">
                <label>Supplier Name</label>
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
export default RawMaterialSupplier;
