// import React, { useEffect, useState, useContext } from 'react';
// import Navbar from "../../components/front_navbar/Navbar";
// import Sidebar from "../../components/front_sidebar/Sidebar";
// import { rawMaterialSupplierRows } from "../../datatablesource";
// import '../../style/front/new.scss'


import React, { useEffect, useState, useContext } from 'react';
import Navbar from "../../components/front_navbar/Navbar";
import Sidebar from "../../components/front_sidebar/Sidebar";
import '../../style/front/viewSupplyTable.scss'
import { DataGrid } from "@mui/x-data-grid";
import { Link } from "react-router-dom";
import { DarkModeContext } from "../../context/darkModeContext";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";

const BuyRawMaterial = () =>{
  const navigate = useNavigate();
  const { dispatch, metaMask, supplyChainContract, supplyChainTokenContract, ownSupplyChainAddress } = useContext(DarkModeContext);
  const buyMaterialHandler = async (event) => {
    event.preventDefault();
    //console.log("batchid",event.target.whHashAdr.value);
    

    const tx = supplyChainContract.factoryBuyRawMaterial(event.target.batchId.value, event.target.whHashAdr.value);
    //console.log((await tx.wait()));
    if(tx){
       navigate("/availableRawMaterialToBuy")
    }
  }

    let data = useLocation();
    data = data.state.i;
    console.log("Comming data is",data)
    
    const ConfirmShow = (props) =>{
      //const data = props.data
      //const data = props.i
        return(
            <div className="bottom">
            <div className="right">
              <form onSubmit={buyMaterialHandler}>
                <div className="formInput">
                <input id="batchId" type="text"  value={data} />
                  <label>Warehouse Address</label>                  
                  <textarea id="whHashAdr"  type="text" />
                </div>
                <div className='formInput'>
                <button type={"submit"}> Submit </button>
                {/* <span className='left'><button  type='reset' >Reset</button></span> */}
                </div>   
              </form>
            </div>
          </div>
        )
    }

    return(
        <div className="new">
            <Sidebar />
            <div className="newContainer">
                <Navbar />
                <ConfirmShow data ={data} />
            </div>
            
        </div>
    )
}

export default BuyRawMaterial