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

  const [SChainContract, setSChainContract] = useState(supplyChainContract);
  const [user,setUser] = useState(JSON.parse(sessionStorage.getItem('user'))); 
  
  const addSupplyChainHandler = async (event) => {
    event.preventDefault();
   // console.log("SChainContract",SChainContract);
    console.log(await SChainContract.totalBatchs())
    const tx = await SChainContract.rawMaterialSupplierSuppliesRM(event.target.polysteramount.value, event.target.cottonamount.value, event.target.woolamount.value);
    //console.log((await tx.wait()));
    if(tx){
       navigate("/supplyToken")
    }
  }

 
  return (
    <div className="new">
       <Sidebar />
      <div className="newContainer">
        <Navbar />
        <div className="top">          
          <h1>Add Batch</h1>
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
