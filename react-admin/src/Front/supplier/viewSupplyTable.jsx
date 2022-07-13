
import React, { useEffect, useState, useContext } from 'react';
import "./viewSupplyTable.scss";
import { DataGrid } from "@mui/x-data-grid";
import { Link } from "react-router-dom";
import { DarkModeContext } from "../../context/darkModeContext";


const ViewSupplyTable = () => {

  const [data, setData] = useState([]);
  const [materiallist, setMateriallist] =  useState(null);
  
  const { dispatch, metaMask, supplyChainContract, supplyChainTokenContract, ownSupplyChainAddress } = useContext(DarkModeContext);

  const allsupplymateriallist = [];
  const getSupplyChainHandler = async (event) => {

    console.log("Supplier Owner Address ", ownSupplyChainAddress)
    const totalbatchids = await supplyChainTokenContract.getMySupplyTokens(ownSupplyChainAddress);
    console.log("totalbatchids",totalbatchids.length);
    if(totalbatchids.length>0){
      for (let i = 0; i < totalbatchids.length; i++) {
        let object = await supplyChainContract.items(totalbatchids[i].toNumber());
        //console.log(totalbatchids[i].toNumber());
        //console.log("myrecord", object.PolyesterAmount.toNumber());
        if (object.itemState === 0) {
          // console.log("inner loop", object.PolyesterAmount.toNumber());
          // console.log("cotton loop", object.CottonAmount.toNumber());
          allsupplymateriallist.push(
            <><tr> 
              <td>{totalbatchids[i].toNumber()}</td>
              <td>{object.PolyesterAmount.toNumber()}</td>
              <td>{object.CottonAmount.toNumber()}</td>
              <td>{object.WoolAmount.toNumber()}</td>
            </tr></>
          )
        
        }      
      }
  }else if(totalbatchids.length<1){
    allsupplymateriallist.push(
      <><tr>
        <td colSpan="4">No Record Found</td>
      </tr></>
    )
  }
    setMateriallist(allsupplymateriallist);
  }

  useEffect(()=>{
    getSupplyChainHandler();
  },[]);
 
  return (
    <>
      <div className="new">
        <div className="newContainer">
          <div className="top">
              <h3>View Supply Token</h3>
          </div>
          <div className="bottom">
            <div className="right">
              
              <table>
                <tr>
                <th>Batch ID</th>
                  <th>Polyster Amount</th>
                  <th>Cotton Amount</th>
                  <th>Wool Amount</th>
                </tr>
                {materiallist}
              </table>

            </div>
          </div>
        </div>
      </div>
    </>
  );

};

export default ViewSupplyTable;


