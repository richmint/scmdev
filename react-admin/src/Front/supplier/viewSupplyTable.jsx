
import React, { useEffect, useState, useContext } from 'react';
import "./viewSupplyTable.scss";
import { DataGrid } from "@mui/x-data-grid";
import { Link } from "react-router-dom";
import { DarkModeContext } from "../../context/darkModeContext";

const ViewSupplyTable = () => {
  const [data, setData] = useState([]);
  const [materiallist, setMateriallist] =  useState(null);
  const { dispatch, metaMask, supplyChainContract, supplyChainTokenContract, ownSupplyChainAddress, dateContract } = useContext(DarkModeContext);
  const allsupplymateriallist = [];
  const getSupplyChainHandler = async (event) => {
    const totalbatchids = await supplyChainTokenContract.getMySupplyTokens(ownSupplyChainAddress);
    var checkvalue = 0;
    if(totalbatchids.length>0){
      for (let i = 0; i < totalbatchids.length; i++) {
        let object = await supplyChainContract.items(totalbatchids[i].toNumber());
        if (object.itemState === 0 && object.RawMaterialSupplierID.toLowerCase() === ownSupplyChainAddress) {
          checkvalue = 1;
        let OGObject = await supplyChainContract.OGDetails(object.supplyChainId);
        const dateObject =await supplyChainContract.timeStamps(i,0);
        const createdday = await dateContract.getDay(dateObject.toNumber())
        const createmonth = await dateContract.getMonth(dateObject.toNumber())
        const createdyear = await dateContract.getYear(dateObject.toNumber())
          allsupplymateriallist.push(
            <><tr> 
              <td>{totalbatchids[i].toNumber()}</td>
              <td>{OGObject.OGPolyesterAmount.toNumber()}</td>
            <td>{OGObject.OGCottonAmount.toNumber()}</td>
            <td>{OGObject.OGWoolAmount.toNumber()}</td>
              <td>{createdday}:{createmonth}:{createdyear}</td>
            </tr></>
          )
        } 
      }
      if(checkvalue == 0) {
          allsupplymateriallist.push(
            <><tr>
              <td colSpan="5">No Record Found</td>
            </tr></>
          )
      }
  }else if(totalbatchids.length<1){
    allsupplymateriallist.push(
      <><tr>
        <td colSpan="5">No Record Found 23</td>
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
                  <th>Batch Created</th>
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


