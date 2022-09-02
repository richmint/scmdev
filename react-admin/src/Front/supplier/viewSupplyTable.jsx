
import React, { useEffect, useState, useContext,useMemo } from 'react';
import "./viewSupplyTable.scss";
import { DataGrid } from "@mui/x-data-grid";
import { Link } from "react-router-dom";
import { DarkModeContext } from "../../context/darkModeContext";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useLocation } from 'react-router-dom';

const ViewSupplyTable = () => {
  const [show,setShow] = useState(false);

  const value = useLocation();
  console.log("Direct",value.state)
  // if(value.state != null){
  //   console.log("dfsd")
  //   setShow(value.state.val);
  // }else{
  //   setShow(false)
  // }

  // if(show == true){toast("Wow so easy !")}
// console.log("data cone frin loaction",value.state.val)

// useMemo(() =>{

// },[show])

  // const Notify = () => {
  //   return(
  //     <>
  //     {show==true?console.log("Rahul"):console.log("saini")}
  //     </>
  //   )
  // }  
    const toastFun = () => {toast("Wow so easy xfdf!")}

  const [data, setData] = useState([]);
  const [materiallist, setMateriallist] =  useState(null);
 

  const { dispatch, metaMask, supplyChainContract, supplyChainTokenContract, ownSupplyChainAddress, dateContract } = useContext(DarkModeContext);
  const allsupplymateriallist = [];
  const getSupplyChainHandler = async (event) => {

  //   const totalBatchs =await supplychain.totalBatchs()  
  // for(let i= 0; i<totalBatchs; i++){  
  //   const item = await supplychain.items(i);  
  //   if (item.itemState ==0 && item.RawMaterialSupplierID ==rawMaterialSupplierSigner1.address){ 
  //     console.log();
  //     console.log(item);  
  //     console.log(await supplychain.OGDetails(item.supplyChainId));
  //     const object =await supplychain.timeStamps(item.supplyChainId,item.itemState);
  //     console.log(await dateTime.getDay(object.toNumber()),await dateTime.getMonth(object.toNumber()),await dateTime.getYear(object.toNumber()));
  //     console.log();
  //   } 
  // }  

    const totalbatchids = await supplyChainContract.totalBatchs()
    var checkvalue = 0;
    if(totalbatchids.toNumber()>0){
      for (let i = 0; i < totalbatchids.toNumber(); i++) {
        let object = await supplyChainContract.items(i);
        if (object.itemState === 0 && object.RawMaterialSupplierID.toLowerCase() === ownSupplyChainAddress.toLowerCase()) {
          checkvalue = 1;
        let OGObject = await supplyChainContract.OGDetails(object.supplyChainId);
        const dateObject =await supplyChainContract.timeStamps(i,0);
        const createdday = await dateContract.getDay(dateObject.toNumber())
        const createmonth = await dateContract.getMonth(dateObject.toNumber())
        const createdyear = await dateContract.getYear(dateObject.toNumber())
          allsupplymateriallist.push(
            <>
              <tr> 
                <td>{i}</td>
                <td>{OGObject.OGPolyesterAmount.toNumber()}</td>
                <td>{OGObject.OGCottonAmount.toNumber()}</td>
                <td>{OGObject.OGWoolAmount.toNumber()}</td>
                <td>{createdday}-{createmonth}-{createdyear}</td>
              </tr>
            </>
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
  }else if(totalbatchids.toNumber() < 1){
    allsupplymateriallist.push(
      <><tr>
        <td colSpan="5">No Record Found</td>
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
   {show == true ?console.log("Rajil"):console.log("saini")}
      <div className="new">
        <div className="newContainer">
          <div className="top">
              <h3>View Supply Token</h3>
          </div>
          <button onClick={toastFun}>Notify!</button>
          <ToastContainer
position="bottom-right"
autoClose={5000}
hideProgressBar={false}
newestOnTop={false}
closeOnClick
rtl={false}
pauseOnFocusLoss
draggable
pauseOnHover
/>
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


