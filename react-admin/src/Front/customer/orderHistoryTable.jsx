import React, { useEffect, useState, useContext } from 'react';
import '../../style/front/viewSupplyTable.scss'
import { DataGrid } from "@mui/x-data-grid";
import { Link } from "react-router-dom";
import { DarkModeContext } from "../../context/darkModeContext";
import { useNavigate } from "react-router-dom";
import Button from 'react-bootstrap/Button';

const OrderHistoryTable = () => {
  
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [materiallist, setMateriallist] = useState(null);
  
  const { dispatch, metaMask, supplyChainContract, supplyChainTokenContract, ownSupplyChainAddress, dateContract } = useContext(DarkModeContext);

  const allsupplymateriallist = [];
  const getOrderHistoryHandler = async (event) => {




    // const array = await supplychain.getcustomerSCIds(customerSigner.address)
  // for(let i=0 ; i<array.length; i++){
  //   const info =await supplychain.customerInfo(customerSigner.address,array[i])
  //   const object =await supplychain.items(info.supplychainID);
  //   console.log(info);
  //   console.log(object);
  //   // console.log(await supplychain.OGDetails(info.supplychainID));
  //   console.log(info.retailer)
  //   console.log(info.quantity)
  // }



    const customerlist = (await supplyChainContract.getcustomerSCIds(ownSupplyChainAddress));
   
    if (customerlist.length > 0) {
      
      for (let i = 0; i < customerlist.length; i++) {
        let customerInfo = await supplyChainContract.customerInfo(ownSupplyChainAddress,customerlist[i]);
              let object = await supplyChainContract.items(customerInfo.supplychainID);
              console.log("customer Info", customerInfo)
              console.log("Record", object)
                //console.log("PRoduct Detail",await supplyChainContract.OGDetails(customerInfo.supplyChainId));
                allsupplymateriallist.push(
                  <><tr> 
                    <td>{customerInfo.supplychainID.toNumber()}</td>
                    <td>{customerInfo.retailer}</td> 
                    <td>{customerInfo.quantity.toNumber()}</td>
                     <td>{object.Description}</td>
                    <td><Button variant="outline-success" onClick={() => navigate('/viewBatchStatus',{state:{i}})}>View</Button></td> 
                  </tr>
                  </>     
                )
      }
    } else {
      allsupplymateriallist.push(
        <><tr>
          <td colSpan="6">No Record Found</td>
        </tr></>
      )
    }
    setMateriallist(allsupplymateriallist);
  }

  useEffect(() => {
    getOrderHistoryHandler();
  }, []);

  return (
    <>
      <div className="new">
        <div className="newContainer">
          <div className="top">
            <h4>Order History</h4>
          </div>
          <div className="bottom">
            <div className="right">
              <table>
                <tr>
                  <th>Batch ID</th>
                  <th>Retailer Address</th> 
                  <th>Quantity</th>
                  <th>Product Description</th>
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

export default OrderHistoryTable
