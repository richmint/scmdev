import React, { useEffect, useState, useContext } from 'react';
import '../../style/front/viewSupplyTable.scss'
import { DataGrid } from "@mui/x-data-grid";
import { Link } from "react-router-dom";
import { DarkModeContext } from "../../context/darkModeContext";
import { useNavigate } from "react-router-dom";
import { Button } from '@mui/material';
import '../distributer/sellItemTable.scss'


const SellItemTable = () =>{
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
        //console.log("myrecord", object);
        if (object.itemState === 1) {
          // console.log("inner loop", object.PolyesterAmount.toNumber());
          // console.log("cotton loop", object.CottonAmount.toNumber());
          allsupplymateriallist.push(
              <div style={{marginTop:15}}>
            <div style={{width:'100%',height:200,backgroundColor:"cornsilk",borderRadius:10}}>
        {/* Two div with  */}
          <div style={{width:'100%',display:"flex",flexDirection:"row",height:140,justifyContent:"space-around"}}>
            <div style={{width:'65%',height:140}}>
              <div style={{display:"flex",flexDirection:"column",marginTop:15,justifyContent:"center"}} >
              <div style={{display:"flex"}}>
                  <h3>Raw MAterial Supplier Id :</h3>
                  <span>{object.PolyesterAmount.toNumber()} Kg Polyster,{object.CottonAmount.toNumber()} kg Cotton,{object.WoolAmount.toNumber()}Kg Wool</span>
                </div>
                <div style={{display:"flex"}}>
                  <h3>Raw MAterial Supplier Id :</h3>
                  <span>{object.RawMaterialSupplierID}</span>
                </div>
                <div style={{display:"flex"}}>
                  <h3>Factory Address :</h3>
                  <span >{object.factoryID}</span>
                </div>
                <div style={{display:"flex"}}>
                  <h3>WareHouse Address :</h3>
                  <span>{object.warehouseID}</span>
                </div>
                <div style={{display:"flex"}}>
                  <h3>Product Address</h3>
                  <span>.bsjgdfjsd</span>
                </div>
              </div>
            </div>
            <div style={{width:'30%',height:140}}>
              <div style={{display:"flex",marginTop:15,flexDirection:"column",justifyContent:"center"}} >
                <div style={{display:"flex"}}>
                  <h3>Total Quantity : </h3>
                  <span>{object.totalUnits.toNumber()}</span>
                </div>
                <div style={{display:"flex"}}>
                  <h3>Quantity this distributor own : </h3>
                  <span>180</span>
                </div>
                <div style={{display:"flex"}}>
                  <h3>Item id start from : </h3>
                  <span>215</span>
                </div>
              </div>
            </div>
          </div>
          <div style={{display:"flex",marginTop:10,height:20,justifyContent:"center"}}>
            <Button style={{width:200,marginRight:15,height:35,backgroundColor:"darkgrey"}} disabled={true}>Supply Token ID: {i}</Button>
            <Button style={{width:200,height:35,backgroundColor:"darkgrey"}} onClick={() => navigate('/finalSellToDistributor',{state:{i}})} >Sell to Retailer</Button>
          </div>
        </div>
      </div>
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
                {/* <div className="right">
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
                </div> */}
                <div style={{display:'flex',width:'100%',flexDirection:'column',justifyContent:"center"}}>
                {materiallist}
                </div>
              </div>
            </div>
          </div>
        </>
      );
  
    
}

export default SellItemTable
