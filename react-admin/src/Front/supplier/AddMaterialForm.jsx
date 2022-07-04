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
  const { dispatch, metaMask, warehouseContract } = useContext(DarkModeContext);
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
  const [defaultAccount, setDefaultAccount] = useState(null);
  const [whContract, setContract] = useState(warehouseContract);
  const [user,setUser] = useState(JSON.parse(sessionStorage.getItem('user'))); 
  
  

  //console.log("whContract",whContract);
  const addWarehouseHandler = (event) => {
    console.log("The coming dats is ",event);
    event.preventDefault();
    
    // // console.log(whContract);
    //  console.log('sending ' + event.target.hashAddress.value + ' to the whContract');
    // warehouseContract.addWarehouse(event.target.hashAddress.value);

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
            <form onSubmit={handleSubmit(addWarehouseHandler)}>
              <div className="formInput">
                <label>Polyster Amount</label>
                <input id="polysteramount"  {...register("pollyster", { required: true })} type="text" />
                {errors.pollyster && <span className='error'>* Amount is required</span>}
              </div>
              <div className="formInput">
                <label>Cotton Amount</label>
                <input id="cottonamount" {...register("cotton", { required: true })} type="text" />
                {errors.cotton && <span className='error'>* Amount is required</span>}
              </div>
              <div className="formInput ">
                <label>Wool Amount</label>
                <input id="woolamount" {...register("wool", { required: true })} type="text" />
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
