// import React, { useEffect, useState, useContext } from 'react';
// import '../../style/front/viewSupplyTable.scss'
// import { DataGrid } from "@mui/x-data-grid";
// import { Link } from "react-router-dom";
// import { DarkModeContext } from "../../context/darkModeContext";
// import { useNavigate } from "react-router-dom";
// import Button from 'react-bootstrap/Button';

// const OrderHistoryTable = () => {
//   const navigate = useNavigate();
//   const [data, setData] = useState([]);
//   const [materiallist, setMateriallist] = useState(null);
//   const { dispatch, metaMask, supplyChainContract, supplyChainTokenContract, ownSupplyChainAddress, dateContract } = useContext(DarkModeContext);

//   const allsupplymateriallist = [];
//   const getOrderHistoryHandler = async (event) => {
//     let userdatarec = '';
//     const customerlist = (await supplyChainContract.getcustomerSCIds(ownSupplyChainAddress));
//     if (customerlist.length > 0) {
//       for (let i = 0; i < customerlist.length; i++) {
//         let customerInfo = await supplyChainContract.customerInfo(ownSupplyChainAddress,customerlist[i]);
//               let object = await supplyChainContract.items(customerInfo.supplychainID);
//               //console.log("customer Info s", customerInfo)
//               //console.log("Record", object)
//               //console.log("PRoduct Detail",await supplyChainContract.OGDetails(customerInfo.supplyChainId));
//               //console.log("jkhjj sdsds", customerInfo.retailer)
//                 const rawMaterialRecord = {
//                   method: 'POST',
//                   headers: { 'Content-Type': 'application/json' },
//                   body: JSON.stringify({        
//                     "hashAddress":customerInfo.retailer,      
//                     })
//                 };
//                 console.log("asdasdsadasdsdd",customerInfo.retailer)
//                 await fetch("http://162.215.222.118:5150/location",rawMaterialRecord)    
//                 .then(res => res.json())
//                 .then(data => {
//                   if(data){
//                     userdatarec = data.username;
//                   }
//                 }).catch((error) => { 
//                   console.error('Error:', error);
//                 });
//                 console.log("user record",userdatarec) 
//                 allsupplymateriallist.push(
//                   <><tr> 
//                     <td>jkhj
//                       {/* {customerInfo.supplychainID.toNumber()} */}
//                       </td>
//                     <td>
//                       {/* {userdatarec && userdatarec} */}
//                       </td> 
//                     <td>
//                       {/* {customerInfo.quantity.toNumber()} */}
//                       </td>
//                      <td>
//                       {/* {object.Description} */}
//                       </td>
//                     <td><Button variant="outline-success" onClick={() => navigate('/viewBatchStatus',{state:{i}})}>View</Button></td> 
//                   </tr>
//                   </>     
//                 )
//       }
//     } else {
//       allsupplymateriallist.push(
//         <><tr>
//           <td colSpan="6">No Record Found</td>
//         </tr></>
//       )
//     }
//     setMateriallist(allsupplymateriallist);
//   }
//   useEffect(() => {
//     getOrderHistoryHandler();
//   }, []);
//   return (
//     <>
//       <div className="new">
//         <div className="newContainer">
//           <div className="top">
//             <h4>Order History</h4>
//           </div>
//           <div className="bottom">
//             <div className="right">
//               <table>
//                 <tr>
//                   <th>Batch ID</th>
//                   <th>Retailer Address</th> 
//                   <th>Quantity</th>
//                   <th>Product Description</th>
//                    <th>Action</th>
//                 </tr>
//                 {materiallist}
//               </table>
//             </div>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// }
// export default OrderHistoryTable



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
  const { dispatch, metaMask, supplyChainContract, supplyChainTokenContract, ownSupplyChainAddress } = useContext(DarkModeContext);

  const allsupplymateriallist = []; 
  const getOrderHistoryHandler = async (event) => {
    let userdatarec = '';
    const totalbatchids = (await supplyChainContract.totalBatchs());
    const customerlist = (await supplyChainContract.getcustomerSCIds(ownSupplyChainAddress));

    var checkvalue = 0;
    if (customerlist.length > 0) {
        for(let i=0 ; i<customerlist.length; i++){
        let object = await supplyChainContract.items(i);
        const info =await supplychain.customerInfo(customerSigner.address,array[i])
  //   const object =await supplychain.items(info.supplychainID);
        if (object.itemState === 3 && object.factoryID.toLowerCase() === ownSupplyChainAddress.toLowerCase()) {
          checkvalue = 1;
          const rawMaterialRecord = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({       
              "hashAddress":object.RawMaterialSupplierID,       
              })
          };
          await fetch("http://162.215.222.118:5150/location",rawMaterialRecord)    
          .then(res => res.json())
          .then(data => {
            if(data){
              userdatarec = data.username
            }
          }).catch((error) => { 
            console.error('Error:', error);
          });
          allsupplymateriallist.push(
            <><tr>
              <td>{i}</td>
              <td>{userdatarec && userdatarec }</td>
              <td>{object.PolyesterAmount.toNumber()}</td>
              <td>{object.CottonAmount.toNumber()}</td>
              <td>
                <Button variant="outline-primary" onClick={() => navigate('/viewBatchStatus', { state: { i } })}>View</Button>
                <Button variant="outline-success" onClick={() => navigate('/garmentBatchCompleteForm', { state: { i } })}>Continue</Button>
              </td>
            </tr></>
          )

        }
      }
      if(checkvalue == 0) {
        allsupplymateriallist.push(
          <><tr>
            <td colSpan="6">No Record Found</td>
          </tr></>
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
                  <th>Retailer</th>
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
