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

const ApproceMaterialsupplier = ({ inputs, title, value }) => {
  const { dispatch, metaMask, supplyChainContract ,supplyChainTokenContract } = useContext(DarkModeContext);
  const navigate = useNavigate();  
  const {register, handleSubmit, formState: { errors }} = useForm({
    defaultValues: {
      pollyster: '',
      cotton: '',
      wool: ''
    }
  })
 
  const [SChainContract, setContract] = useState(supplyChainContract);
  const [user,setUser] = useState(JSON.parse(sessionStorage.getItem('user'))); 
  
  const approveSupplyChainHandler = async (event) => {
    //event.preventDefault();
    // console.log(await supplyChainContract.totalBatchs())
    const tx = await supplyChainContract.setApprovalForAll('0x70997970c51812dc3a010c7d01b50e0d17dc79c8', true);
    //console.log((await tx.wait()));
    if(tx){
       navigate("/approveSupplier")
    }
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
            <form onSubmit={handleSubmit(approveSupplyChainHandler)}>
              <div className="formInput">
                <label>You have to approve this plateform to manage your supplychain tokens for the factory to buy. This is to be done only once.</label>
              </div>
              <div className='formInput'>
              <button type={"submit"}> Approve </button>
              </div>          
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
export default ApproceMaterialsupplier;
