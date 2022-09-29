import React, { useEffect, useState, useContext } from 'react';
import '../../style/front/viewSupplyTable.scss'
import { DataGrid } from "@mui/x-data-grid";
import { Link } from "react-router-dom";
import { DarkModeContext } from "../../context/darkModeContext";
import { useNavigate } from "react-router-dom";
import Button from 'react-bootstrap/Button';

const OrderHistoryTable = () => {
  const navigate = useNavigate();
  const [materiallist, setMateriallist] = useState(null);
  const { dispatch, metaMask, supplyChainContract, ownSupplyChainAddress, dateContract } = useContext(DarkModeContext);

  const allsupplymateriallist = [];
  let retaileruserrec = '';
  let factoryuserrec = '';
  let rawMaterialuserrec = '';
  const getOrderHistoryHandler = async (event) => {
    const totalBatches = await supplyChainContract.totalProductBatchs();
    if (totalBatches.toNumber() > 0) {
      for (let i = 0; i < totalBatches; i++) {
        const productData = await supplyChainContract.Product(i);
        if (productData.productState == 1) {
          let j = 1;
          while (j) {
            try {
              const data2 = await supplyChainContract.ProductIdToCustomer(i, j - 1);
              const supplychianId = await supplyChainContract.ProductIds(i, 0);

              //console.log("supplychianId",supplychianId)
               const RawMaterialSupplierData = await supplyChainContract.items(supplychianId);
              // console.log(await supplyChainContract.RawMaterialDetails(supplychianId));
 
              // const supplychianId =await supplychain.ProductIds(i,1);


              if (data2.customer.toLowerCase() == ownSupplyChainAddress.toLowerCase()) {


                const rawMaterialRecord = {
                  method: 'POST',
                  headers: { 'Content-Type': 'application/json' },
                  body: JSON.stringify({
                    "hashAddress": RawMaterialSupplierData.RawMaterialSupplierID,
                  })
                };

                await fetch("http://162.215.222.118:5151/location", rawMaterialRecord)
                  .then(res => res.json())
                  .then(data => {
                    if (data) {
                      rawMaterialuserrec = data.username;
                    }
                  })
                  .catch((error) => {
                    console.error('Error:', error);
                  });


                const retailerRecord = {
                  method: 'POST',
                  headers: { 'Content-Type': 'application/json' },
                  body: JSON.stringify({
                    "hashAddress": data2.retailer,
                  })
                };

                await fetch("http://162.215.222.118:5151/location", retailerRecord)
                  .then(res => res.json())
                  .then(data => {
                    if (data) {
                      retaileruserrec = data.username;
                    }
                  })
                  .catch((error) => {
                    console.error('Error:', error);
                  });

                  const factoryRecord = {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                      "hashAddress": productData.factory,
                    })
                  };
  
                  await fetch("http://162.215.222.118:5151/location", factoryRecord)
                    .then(res => res.json())
                    .then(data => {
                      if (data) {
                        factoryuserrec = data.username;
                      }
                    })
                    .catch((error) => {
                      console.error('Error:', error);
                    });

                let hour = await dateContract.getHour(
                  data2.timeStamp12.toNumber()
                );
                let minute = await dateContract.getMinute(
                  data2.timeStamp12.toNumber()
                );
                let second = await dateContract.getSecond(
                  data2.timeStamp12.toNumber()
                );
                let day = await dateContract.getDay(
                  data2.timeStamp12.toNumber()
                );
                let month = await dateContract.getMonth(
                  data2.timeStamp12.toNumber()
                );
                let year = await dateContract.getYear(
                  data2.timeStamp12.toNumber()
                );
                if (hour + 5 > 24) {
                  hour = hour + 5 - 24;
                } else {
                  hour += 5;
                }
                if (minute + 35 > 60) {
                  hour++;
                  minute = minute + 35 - 60;
                } else {
                  minute = minute + 35;
                }

                allsupplymateriallist.push(
                  <><tr>
                    <td>{productData.productId.toNumber()}</td>
                    <td>{rawMaterialuserrec}</td>
                    <td>{factoryuserrec}</td>
                    <td>{retaileruserrec}</td>
                    <td>{data2.quantity.toNumber()}</td>
                    <td>{productData.Description}</td>
                    <td>{day}-{month}-{year} {hour}:{minute}:{second}</td>

                    <td>
                      <Button variant="outline-success">View</Button>
                      {/* <Button variant="outline-success" onClick={() => navigate('/viewBatchStatus', { state: { i } })}>View</Button> */}
                    </td>
                  </tr></>
                )
              } else {

                allsupplymateriallist.push(
                  <>
                    <tr>
                      <td colSpan="6">No Record Found</td>
                    </tr>
                  </>
                )
              }
              j++;
            } catch (error) {
              break;
            }
          }
        }
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
                  <th>Supplier</th> 
                  <th>Factory</th>
                  <th>Retailer</th>
                  <th>Quantity</th>
                  <th>Product Description</th>
                  <th>Date</th>
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
