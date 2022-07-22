import React, { useEffect, useState, useContext } from "react";
import Navbar from "../../components/front_navbar/Navbar";
import Sidebar from "../../components/front_sidebar/Sidebar";
import '../../style/front/new.scss'

import { DarkModeContext } from "../../context/darkModeContext";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";

const Spinningbatchcompleteform = () =>{
  let data = useLocation();
  data = data.state.i;
  //console.log("Coming data is ",data);
  

  const navigate = useNavigate();
  const { dispatch, metaMask, supplyChainContract, supplyChainTokenContract } = useContext(DarkModeContext);
  const [SChainContract, setSChainContract] = useState(supplyChainContract);

  const spinningcompleteHandler = async (event) => {
    event.preventDefault();
    console.log("batchid",SChainContract);
    
    const tx = SChainContract.factoryCompleteSpinningWaeving(data, event.target.yarnamount.value,event.target.yarncolor.value,event.target.yarntype.value);
    //console.log((await tx.wait()));
    if(tx){
       navigate("/spinningWaevingMaterial")
    }
  }

    const DataTable = (props)=>{
        const data = props.data;
        return(
            <div className="bottom">
          <div className="right">
            <form onSubmit={spinningcompleteHandler}>
              <div className="formInput">
                <label>Yarn Amount</label>
                <input id="batchId" type="hidden"  value={data} />
                <input id="yarnamount"  type="text"></input>
              </div>
              <div className="formInput">
                <label>Yarn Color</label>
                <input id="yarncolor"  type="text"></input>
              </div>
              <div className="formInput ">
                <label>Yarn Type </label>
                <input id="yarntype"  type="text"></input>
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

export default Spinningbatchcompleteform