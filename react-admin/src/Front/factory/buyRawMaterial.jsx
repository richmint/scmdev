import React, { useState,useEffect } from "react";
import Navbar from "../../components/front_navbar/Navbar";
import Sidebar from "../../components/front_sidebar/Sidebar";
import { rawMaterialSupplierRows } from "../../datatablesource";
import '../../style/front/new.scss'
import { useLocation } from "react-router-dom";

const BuyRawMaterial = () =>{
    let data = useLocation();
    data = data.state.i;
    console.log("Comming data is",data)
    
    const ConfirmShow = (props) =>{
      //const data = props.data
      //const data = props.i
        return(
            <div className="bottom">
            <div className="right">
              <form >
                <div className="formInput">
                  <label>Warehouse Address</label>
                  <textarea id="polysteramount" value={data}   type="text" />
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