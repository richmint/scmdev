import React, { useEffect, useState, useContext } from 'react';
import '../../style/front/viewSupplyTable.scss'
import { DataGrid } from "@mui/x-data-grid";
import { Link } from "react-router-dom";
import { DarkModeContext } from "../../context/darkModeContext";
import { useNavigate } from "react-router-dom";


const ViewBatchTable = () =>{
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [materiallist, setMateriallist] =  useState(null);

   
  const { dispatch, metaMask, supplyChainContract, supplyChainTokenContract, ownSupplyChainAddress } = useContext(DarkModeContext);

  const allsupplymateriallist = [];
  const getSupplyChainHandler = async (event) => {

    console.log("supplyChainContract ", supplyChainContract)
    const totalbatchids = (await  supplyChainContract.totalBatchs());
    console.log("totalbatchids",totalbatchids);
    if(totalbatchids>0){
      for (let i = 0; i < totalbatchids; i++) {
        let object = await supplyChainContract.items(i);
        console.log("myrecord", object);
        if (object.itemState === 1 || object.itemState === 2 || object.itemState === 3) {
          // console.log("inner loop", object.PolyesterAmount.toNumber());
          allsupplymateriallist.push(
            <><tr> 
              <td>{i}</td>
              <td>{object.RawMaterialSupplierID}</td>
              <td>{object.warehouseID}</td>
              <td>{object.PolyesterAmount.toNumber()}</td>
              <td>{object.CottonAmount.toNumber()}</td>
              <td>{object.WoolAmount.toNumber()}</td>
              <td><button className='' onClick={() => navigate('/viewBatchStatus',{state:{i}})} >View Status</button></td>
            </tr></>
          )
         
        }     
      }
    }else {
      allsupplymateriallist.push(
        <><tr>
          <td colSpan="6">No Record Found</td>
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
              </div>
              <div className="bottom">
                <div className="right">
                  
                  <table>
                    <tr>
                    <th>Batch ID</th>
                    <th>Raw Material Supplier</th>
                    <th>Warehouse Address</th>
                      <th>Polyster Amount</th>
                      <th>Cotton Amount</th>
                      <th>Wool Amount</th>
                      <th>Action</th>
                    </tr>
                    {materiallist}
                  </table>
    
                </div>
              </div>
            </div>
          </div>
        </>
      );
  
    
}

export default ViewBatchTable
