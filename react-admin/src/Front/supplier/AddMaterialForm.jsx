import React,{useEffect, useState,useContext} from 'react';
import { useSelector, useDispatch } from 'react-redux'
import {useForm} from 'react-hook-form';
import './AddMaterialForm.scss'
//import { fetch, success } from './LoginSlice'
//import "./login.scss"
import { useNavigate } from "react-router-dom";

import "../../pages/new/new.scss";
import Navbar from "../../components/front_navbar/Navbar";
import Sidebar from "../../components/front_sidebar/Sidebar";

import { DarkModeContext } from "../../context/darkModeContext";

const Materialsupplier = ({ inputs, title, value }) => {
  const { dispatch, metaMask,supplyChainContract ,supplyChainTokenContract } = useContext(DarkModeContext);
  const navigate = useNavigate();  
  const {register, handleSubmit, formState: { errors }} = useForm({
    defaultValues: {
      pollyster: '',
      cotton: '',
      wool: ''
    }
  })

  const [errorMessage, setErrorMessage] = useState(null);
  const [allWarehouse, setAllWarehouse] = useState(null);
  const [defaultAccount, setdefaultAccount] = useState(null);
  const [SChainContract, setContract] = useState(supplyChainContract);
  const [SChainTokenContract, setSChainTokenContract] = useState(supplyChainTokenContract);
  const [user,setUser] = useState(JSON.parse(sessionStorage.getItem('user'))); 
  
  

  //console.log("whContract",whContract);
  const addSupplyChainHandler = async (event) => {
    event.preventDefault();
    // console.log("The coming dats is ",event); 
    // console.log(await supplyChainContract.rawMaterialSupplierSuppliesRM("0x7aa3cc2a2da7eff96cff120410ada47db93c7e62")); 
    // console.log(SChainContract); 
    // console.log(await supplyChainContract.totalBatchs())
    // console.log('sending ' + event.target.hashAddress.value + ' to the whContract');
    const tx = await supplyChainContract.rawMaterialSupplierSuppliesRM(event.target.polysteramount.value, event.target.cottonamount.value, event.target.woolamount.value);
    console.log((await tx.wait()));
    //   const requestOptions = {
    //       method: 'POST',
    //       headers: { 'Content-Type': 'application/json' },
    //       body: JSON.stringify({
    //         "hashAddress":event.target.hashAddress.value,
    //         "name":event.target.name.value,
    //         "email":event.target.email.value,
    //         "address":event.target.location.value,
    //         "password":event.target.hashAddress.value,
    //         "role":'Warehouse'
    //         })
    //   };
    //   fetch('http://162.215.222.118:5150/register', requestOptions)
    //       .then(response => response.json());
     
  }

 
  return (
    <div className="new">
       <Sidebar />
      <div className="newContainer">
        <Navbar />
        <div className="top">          
          <h1>Hi, {user && user.username}</h1>
        </div>
        <div className="bottom">
          <div className="right">
            <form onSubmit={addSupplyChainHandler}>
              <div className="formInput">
                <label>Polyster Amount</label>
                <input id="polysteramount"  {...register("pollyster", { required: true })} type="number" />
                {errors.pollyster && <span className='error'>* Amount is required</span>}
              </div>
              <div className="formInput">
                <label>Cotton Amount</label>
                <input id="cottonamount" {...register("cotton", { required: true })} type="number" />
                {errors.cotton && <span className='error'>* Amount is required</span>}
              </div>
              <div className="formInput ">
                <label>Wool Amount</label>
                <input id="woolamount" {...register("wool", { required: true })} type="number" />
                {errors.wool && <span className='error'>* Amount is required</span>}
              </div>  
              <div className='formInput'>
              <button type={"submit"}> Submit </button>
              {/* <span className='left'><button  type='reset' >Reset</button></span> */}
              </div>          
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Materialsupplier;
