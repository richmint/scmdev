
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



  //   const totalBatchs =await supplyChainContract.totalBatchs()  
    
  // for(let i= 0; i<totalBatchs; i++){  
  //   const item = await supplyChainContract.items(i); 
    
  //   if (item.itemState === 0 && item.RawMaterialSupplierID.toLowerCase() === ownSupplyChainAddress){
      
  //     console.log("own id", item.RawMaterialSupplierID);
  //   console.log("owwn id",ownSupplyChainAddress);  

    
      
  //   const objectdata = await supplyChainContract.OGDetails(item.itemState);
  //   console.log("asas", objectdata.OGCottonAmount.toNumber())
  //     const object =await supplyChainContract.timeStamps(item.supplyChainId,item.itemState);
  //     console.log("My zasas item",await dateContract.getDay(object.toNumber()),await dateContract.getMonth(object.toNumber()),await dateContract.getYear(object.toNumber()));
  //   } 
  // }  






    console.log("Supplier Owner Address ", ownSupplyChainAddress)
    const totalbatchids = await supplyChainTokenContract.getMySupplyTokens(ownSupplyChainAddress);
    console.log("totalbatchids",totalbatchids.length);
    if(totalbatchids.length>0){
      for (let i = 0; i < totalbatchids.length; i++) {
        let object = await supplyChainContract.items(totalbatchids[i].toNumber());
        let OGObject = await supplyChainContract.OGDetails(object.supplyChainId);
        //console.log(object);

        //console.log("date contract",dateContract);
        if (object.itemState === 0) {
        const dateObject =await supplyChainContract.timeStamps(i,0);
        const createdday = await dateContract.getDay(dateObject.toNumber())
        const createmonth = await dateContract.getMonth(dateObject.toNumber())
        const createdyear = await dateContract.getYear(dateObject.toNumber())
      
          // console.log("inner loop", object.PolyesterAmount.toNumber());
          // console.log("cotton loop", object.CottonAmount.toNumber());
          allsupplymateriallist.push(
            <><tr> 
              <td>{totalbatchids[i].toNumber()}</td>
              <td>{OGObject.OGPolyesterAmount.toNumber()}</td>
            <td>{OGObject.OGCottonAmount.toNumber()}</td>
            <td>{OGObject.OGWoolAmount.toNumber()}</td>
              <td>Jaipur</td>
              <td>{createdday}:{createmonth}:{createdyear}</td>
            </tr></>
          )
        }      
      }
  }else if(totalbatchids.length<1){
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
                  <th>Location</th>
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


