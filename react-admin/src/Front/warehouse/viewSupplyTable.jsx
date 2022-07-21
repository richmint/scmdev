
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

    // console.log("Supplier Owner Address ", ownSupplyChainAddress)
    // console.log("Supplier Chain Address ", supplyChainContract)
    
    //const totalbatchids = await supplyChainContract.getWarehouseItems(ownSupplyChainAddress);

    let object =await supplyChainContract.getWarehouseItems(ownSupplyChainAddress)   
  for(let i=0;i <object.length; i++){
    if(object[i].itemState==1 || object[i].itemState==2 || object[i].itemState==3){

//  console.log(object[i].supplyChainId);
//  console.log(object[i].itemState);
 
      const data =await supplyChainContract.timeStamps(object[i].supplyChainId,object[i].itemState);
  
      const dateObject =await supplyChainContract.timeStamps(i,0);
        const createdday = await dateContract.getDay(dateObject.toNumber())
        const createmonth = await dateContract.getMonth(dateObject.toNumber())
        const createdyear = await dateContract.getYear(dateObject.toNumber())
      
     

      allsupplymateriallist.push(
                  <><tr> 
                    <td>{object[i].supplyChainId.toNumber()}</td>
                    <td>{object[i].RawMaterialSupplierID}</td>
                    <td>{object[i].factoryID}</td>
                    <td>{object[i].PolyesterAmount.toNumber()}</td>
                    <td>{object[i].CottonAmount.toNumber()}</td>
                    <td>{object[i].WoolAmount.toNumber()}</td>
                    <td>Jaipur</td>
                    <td>{createdday}:{createmonth}:{createdyear}</td>
                  </tr></>
                )
    }
  }

    //console.log("totalbatchids",totalbatchids.length);
  //   if(totalbatchids.length>0){
  //     for (let i = 0; i < totalbatchids.length; i++) {
  //       let object = await supplyChainContract.items(totalbatchids[i].toNumber());
  //       //console.log(totalbatchids[i].toNumber());
  //       //console.log("myrecord", object.PolyesterAmount.toNumber());
  //       if (object.itemState === 0) { 
  //         // console.log("inner loop", object.PolyesterAmount.toNumber());
  //         // console.log("cotton loop", object.CottonAmount.toNumber());
  //         allsupplymateriallist.push(
  //           <><tr> 
  //             <td>{totalbatchids[i].toNumber()}</td>
  //             <td>{object.RawMaterialSupplierID}</td>
  //             <td>{object.factoryID}</td>
  //             <td>{object.PolyesterAmount.toNumber()}</td>
  //             <td>{object.CottonAmount.toNumber()}</td>
  //             <td>{object.WoolAmount.toNumber()}</td>
  //           </tr></>
  //         )
        
  //       }      
  //     }
  // }else if(totalbatchids.length<1){
  //   allsupplymateriallist.push(
  //     <><tr>
  //       <td colSpan="4">No Record Found</td>
  //     </tr></>
  //   )
  // }
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
                 <th>Raw Material Supplier</th>
                 <th>Factory Address</th>
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


