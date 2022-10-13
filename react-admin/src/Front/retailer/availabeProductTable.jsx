import React, { useEffect, useState, useContext } from "react";
import "../../style/front/viewSupplyTable.scss";
import { DataGrid } from "@mui/x-data-grid";
import { Link } from "react-router-dom";
import { DarkModeContext } from "../../context/darkModeContext";
import { useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";

const AvailabeProductTable = () => {
  var checkMatVal = 0
  const [materiallist, setMateriallist] = useState(null);
  const {
    dispatch,
    metaMask,
    supplyChainContract,
    ownSupplyChainAddress,
    dateContract,
  } = useContext(DarkModeContext);
  const allsupplymateriallist = [];

  const batchRecieve = async (e) => {
    await supplyChainContract.retailerReceivesProductBatch(e);
  }

  const getSupplyChainHandler = async (event) => {
    let distributerName = "";
    let factoryuserrec = "";

    const totalbatch = await supplyChainContract.totalBatchs();
    if (totalbatch.toNumber() > 0) {
      for (let i = 0; i < totalbatch; i++) {
        let retailers = await supplyChainContract.Product(i);

        if (retailers.productState == 1) {
          let j = 1;
          while (j) {
            try {
              const data = await supplyChainContract.ProductIdToRetailer(i,j - 1);
              const distributerRecord = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({       
                  "hashAddress":data.distributor,       
                  })  
              };
          
             await fetch("http://162.215.222.118:5151/location",distributerRecord)    
              .then(res => res.json())
              .then(data => {
                if(data){
                  distributerName = data.username;
                } 
              })
              .catch((error) => {
                console.error('Error:', error);
              });
              const factoryRecord = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({       
                  "hashAddress":retailers.factory,       
                  })  
              };
          
             await fetch("http://162.215.222.118:5151/location",factoryRecord)    
              .then(res => res.json())
              .then(data => {
                if(data){
                  factoryuserrec = data.username;
                } 
              })
              .catch((error) => {
                console.error('Error:', error);
              });

              if (data.retailer.toLowerCase() == ownSupplyChainAddress && data.retailerState == 0) {
                let hour = await dateContract.getHour(data.timeStamp10.toNumber())
                let minute = await dateContract.getMinute(data.timeStamp10.toNumber());
                let second = await dateContract.getSecond(data.timeStamp10.toNumber());
                let day = await dateContract.getDay(data.timeStamp10.toNumber())
                let month = await dateContract.getMonth(data.timeStamp10.toNumber())
                let year = await dateContract.getYear(data.timeStamp10.toNumber())
                if (hour + 5 > 24) {
                  hour = ((hour + 5) - 24);
                } else {
                  hour += 5;
                }
                if (minute + 31 > 60) {
                  hour++;
                  minute = ((minute + 31) - 60);
                } else {
                  minute = minute + 31;
                }

                const batchId = retailers.productId.toNumber();
                checkMatVal = 1;
                allsupplymateriallist.push(
                  <>
                    <tr>
                      <td>{batchId}</td>
                      <td>{distributerName}</td> 
                      <td>{factoryuserrec}</td>
                      <td>{data.quantity.toNumber()}</td>
                      <td>{retailers.Description}</td>
                      <td>{day}-{month}-{year} {hour}:{minute}:{second}</td>
                      <td><Button variant="outline-success" onClick={() => batchRecieve(batchId)}>Batch Recieve</Button></td>
                    </tr>
                  </>
                );
              }
              j++;
            } catch (err) {
              break;
            }
          }
        }
      }
    }
    if (checkMatVal == 0) {
      allsupplymateriallist.push(
        <><tr>
          <td colSpan="7">No Record Found</td>
        </tr></>
      )
    }

    setMateriallist(allsupplymateriallist);
  };

  useEffect(() => {
    getSupplyChainHandler();
  }, []);

  return (
    <>
      <div className="new">
        <div className="newContainer">
          <div className="top">
            <h4>Available Product List</h4>
          </div>
          <div className="bottom">
            <div className="right">
              <table>
                <tr>
                  <th>Batch ID</th>
                  <th>Distributer Address</th>
                  <th>Factory Address</th>
                  <th>Total Quantities</th>
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
};

export default AvailabeProductTable;
