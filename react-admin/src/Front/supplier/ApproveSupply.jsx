import React,{useEffect,useRef, useState,useContext} from 'react';
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
  const { dispatch, metaMask ,supplyChainTokenContract,supplyChainContract,ownSupplyChainAddress } = useContext(DarkModeContext);
  // const busyIndicator = useRef(useContext(GlobalBusyIndicatorContext));
  const navigate = useNavigate();  
  const {register, handleSubmit, formState: { errors }} = useForm({
    defaultValues: {
      pollyster: '',
      cotton: '',
      wool: ''
    }
  })
  
  const [disable,setDisable] = useState();


  const [SChainContract, setContract] = useState(supplyChainContract);
  const [user,setUser] = useState(JSON.parse(sessionStorage.getItem('user'))); 
  
  const approveSupplyChainHandler = async (event) => {
    //event.preventDefault();
    // console.log(await supplyChainContract.totalBatchs())
    //console.log(supplyChainContract.address);
    const tx = await supplyChainTokenContract.setApprovalForAll(supplyChainContract.address, true);
    console.log((await tx.wait()));
    if(tx){
       navigate("/approveSupplier")
    }
  }
  

  useEffect(()=>{
    (async () => {
        const res = await supplyChainTokenContract.isApprovedForAll('0x70997970c51812dc3a010c7d01b50e0d17dc79c8',supplyChainContract.address);
        setDisable(res);
        console.log("Coming res",res)
    })();

  },[supplyChainTokenContract])

 
  return (
    <div className="new">
       <Sidebar />
      <div className="newContainer">
        <Navbar />
        <div className="top">          
          <h1>Approve Supply Token</h1>
        </div>
        <div className="bottom">
          <div className="right">
            <form onSubmit={handleSubmit(approveSupplyChainHandler)}>
              <div className="formInput">
                <label>You have to approve this plateform to manage your supplychain tokens for the factory to buy. This is to be done only once.</label>
              </div>
              <div className='formInput'>
              <button disabled={disable} style={disable?{backgroundColor:"gray",cursor:"none"}:{}}  type={"submit"}> Approve </button>
              </div>          
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
export default ApproceMaterialsupplier;
