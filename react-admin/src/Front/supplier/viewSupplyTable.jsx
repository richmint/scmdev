
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
  //console.log("Direct",value.state)
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
  const [polysterlist, setPolysterlist] =  useState(null);
  const [woollist, setWoollist] =  useState(null);
 

  const { dispatch, metaMask, supplyChainContract, supplyChainTokenContract, ownSupplyChainAddress, dateContract } = useContext(DarkModeContext);
  const allsupplymateriallist = [];
  const allPolyesterlist = [];
  const allWoollist = [];
  const getSupplyChainHandler = async (event) => {

  // const totalBatchs =await supplychain.totalBatchs()  
  // for(let i= 0; i<totalBatchs; i++){  
  //   const item = await supplychain.items(i);  
  //   if (item.RawMaterialSupplierID ==rawMaterialSupplierSigner1.address){ 
  //     console.log(); 
  //     console.log(item);  
  //     console.log((await supplychain.RawMaterialDetails(item.supplyChainId)));
  //     const object =await supplychain.timeStamps(item.supplyChainId,item.itemState);
  //     console.log(await dateTime.getDay(object.toNumber()),await dateTime.getMonth(object.toNumber()),await dateTime.getYear(object.toNumber()));
  //     console.log();
  //   } 
  // } 

    const totalbatchids = await supplyChainContract.totalBatchs()
    var checkcottonvalue = 0;
    var checkPolyestervalue = 0;
    var checkWoolvalue = 0;
    
    if(totalbatchids.toNumber()>0){
      for (let i = 0; i < totalbatchids.toNumber(); i++) {
        let object = await supplyChainContract.items(i);
        if (object.RawMaterialSupplierID.toLowerCase() === ownSupplyChainAddress.toLowerCase()) {
          
          let OGObject = await supplyChainContract.RawMaterialDetails(object.supplyChainId);
          const dateObject =await supplyChainContract.timeStamps(i,0);
          const createdday = await dateContract.getDay(dateObject.toNumber())
          const createmonth = await dateContract.getMonth(dateObject.toNumber())
          const createdyear = await dateContract.getYear(dateObject.toNumber())

          console.log(OGObject.rawMaterialType.toNumber());

          if(OGObject.rawMaterialType.toNumber() == 1){
              checkcottonvalue = 1;
              allsupplymateriallist.push(
                <>
                  <tr> 
                    <td>{i}</td>
                    <td>{OGObject.rawMaterial1.toNumber()}</td>
                    <td>{OGObject.rawMaterial2.toNumber()}</td>
                    <td>{OGObject.rawMaterial3.toNumber()}</td>
                    <td>{OGObject.rawMaterial4.toNumber()}</td>
                    <td>{OGObject.rawMaterial5.toNumber()}</td>
                    <td>{createdday}-{createmonth}-{createdyear}</td>
                  </tr>
                </>
              )
          }
          if(OGObject.rawMaterialType.toNumber() == 2){
            checkPolyestervalue = 1;
            allPolyesterlist.push(
              <>
                <tr> 
                  <td>{i}</td>
                  <td>{OGObject.rawMaterial1.toNumber()}</td>
                  <td>{OGObject.rawMaterial2.toNumber()}</td>
                  <td>{OGObject.rawMaterial3.toNumber()}</td>
                  <td>{OGObject.rawMaterial4.toNumber()}</td>
                  <td>{createdday}-{createmonth}-{createdyear}</td>
                </tr>
              </>
            )
          }
          if(OGObject.rawMaterialType.toNumber() == 3){
            checkWoolvalue = 1;
            allWoollist.push(
              <>
                <tr> 
                  <td>{i}</td>
                  <td>{OGObject.rawMaterial1.toNumber()}</td>
                  <td>{OGObject.rawMaterial2.toNumber()}</td>
                  <td>{OGObject.rawMaterial3.toNumber()}</td>
                  <td>{OGObject.rawMaterial4.toNumber()}</td>
                  <td>{createdday}-{createmonth}-{createdyear}</td>
                </tr>
              </>
            )
          }
        } 
      }
      if(checkcottonvalue == 0) {
        allsupplymateriallist.push(
          <><tr>
            <td colSpan="7">No Record Found</td>
          </tr></>
        )
      }
      if(checkPolyestervalue == 0) {
        allPolyesterlist.push(
          <><tr>
            <td colSpan="6">No Record Found</td>
          </tr></>
        )
    }
    if(checkWoolvalue == 0) {
      allWoollist.push(
        <><tr>
          <td colSpan="6">No Record Found</td>
        </tr></>
      )
  }
  }else if(totalbatchids.toNumber() < 1){
    allsupplymateriallist.push(
      <><tr>
        <td colSpan="6">No Record Found</td>
      </tr></>
    )
    allPolyesterlist.push(
      <><tr>
        <td colSpan="6">No Record Found</td>
      </tr></>
    )
    allWoollist.push(
      <><tr>
        <td colSpan="6">No Record Found</td>
      </tr></>
    )
  } 
    setMateriallist(allsupplymateriallist);
    setPolysterlist(allPolyesterlist);
    setWoollist(allWoollist);
  }
  useEffect(()=>{
    getSupplyChainHandler();
  },[]);
 
  return (
    <>
   {/* {show == true ?console.log("Rajil"):console.log("saini")} */}
      <div className="new">
        <div className="newContainer">
          <div className="top">
              <h3>View Supply Token</h3>
          </div>
          {/* <button onClick={toastFun}>Notify!</button>
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
              /> */}
          <div className="bottom">
            <div className="right">
            <h6>Cotton List</h6>
              <table>
                <tr>
                  <th>Batch ID</th>
                  <th>Weight (kg)</th>
                  <th>Fibre length (mm)</th>
                  <th>Fibre Strength (g/T)</th>
                  <th>Mike(mm)</th>
                  <th>FQI (Rd)</th>
                  <th>Date</th>
                </tr>
                {materiallist}
              </table>
            </div>
          </div>
          <div className="bottom">
            <div className="right">
            <h6>Polyester List</h6>
              <table>
                <tr>
                  <th>Batch ID</th>
                  <th>FMax (kN)</th>
                  <th>EMax (%)</th>
                  <th>Neps (%)</th>
                  <th>Cvm (%)</th>
                  <th>Date</th>
                </tr>
                {polysterlist}
              </table>
            </div>
          </div>
          <div className="bottom">
            <div className="right">
            <h6>Wool List</h6>
              <table>
                <tr>
                  <th>Batch ID</th>
                  <th>Fibre diameter or Grade (mm)</th>
                  <th>Staple length (mm)</th>
                  <th>Fibre length (mm)</th>
                  <th>Crimpiness (cm)</th>
                  <th>Date</th>
                </tr>
                {woollist}
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default ViewSupplyTable;


