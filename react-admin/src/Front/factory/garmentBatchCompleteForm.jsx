import React, { useEffect, useState, useContext } from "react";
import Navbar from "../../components/front_navbar/Navbar";
import Sidebar from "../../components/front_sidebar/Sidebar";
import '../../style/front/new.scss'

import { DarkModeContext } from "../../context/darkModeContext";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";

const GarmentBatchCompleteForm = () =>{
  let data = useLocation();
  data = data.state.i;
  //console.log("Coming data is ",data);
  

  const navigate = useNavigate();
  const { dispatch, metaMask, supplyChainContract, supplyChainTokenContract } = useContext(DarkModeContext);
  const [SChainContract, setSChainContract] = useState(supplyChainContract);

  const garmentcompleteHandler = async (event) => {
    event.preventDefault();
    console.log("batchid",SChainContract);
    
    const tx = SChainContract.factoryCompleteGarmentManufacturing(data, event.target.totalitems.value,event.target.description.value);
    //console.log((await tx.wait()));
    if(tx){
       navigate("/manufactureGarmentMaterial")
    }
  }

    const DataTable = (props)=>{
        const data = props.data;
        return(
            <div className="bottom">
          <div className="right">
            <form onSubmit={garmentcompleteHandler}>
              <div className="formInput">
                <label>Total Items</label>
                <input id="batchId" type="hidden"  value={data} />
                <input id="totalitems"  type="text"></input>
              </div>
              <div className="formInput">
                <label>Description</label>
                <textarea rows={4} id="description"  type="text"></textarea>
              </div>
              <div className='formInput'>
              <button type={"submit"}> Submit </button>
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
                    <DataTable data={data}  />
                </div>
            </div>
    )
}

export default GarmentBatchCompleteForm