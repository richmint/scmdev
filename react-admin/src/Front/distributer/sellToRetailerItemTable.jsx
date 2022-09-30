import React, { useEffect, useState, useContext } from "react";
import "../../style/front/viewSupplyTable.scss";
import { Link, useNavigate } from "react-router-dom";
import { DarkModeContext } from "../../context/darkModeContext";

const ViewListTable = () =>{
    const navigate = useNavigate();
    var checkListVal = 0;
    const {dispatch,metaMask,supplyChainContract,ownSupplyChainAddress,dateContract} = useContext(DarkModeContext);
    const allRetailerList = [];
    const [retailerList, setRetailerList] = useState(null);


    useEffect(() => {
        getSupplyChainHandler();
      }, []);

      const getSupplyChainHandler = async (event) => {
        let factoryuserrec = "";
        let retaileruserrec = "";

        const totalBatches =await supplyChainContract.totalProductBatchs();
        if (totalBatches.toNumber() > 0) {
          for (let i = 0; i < totalBatches.toNumber(); i++) {
            const retailer =await supplyChainContract.Product(i);
            if(retailer.productState == 1){
              //console.log("retailer",retailer)
                let j =1 ;
                while(j){
                    try{
                        const data = await supplyChainContract.ProductIdToRetailer(i,j-1);
                        //console.log("data asdasd",data)
                        if(data.distributor.toLowerCase() ==ownSupplyChainAddress.toLowerCase()){
                          console.log("data asdasd",retailer)
                          const factoryRecord = {
                            method: 'POST',
                            headers: { 'Content-Type': 'application/json' },
                            body: JSON.stringify({       
                              "hashAddress":retailer.factory,       
                              })  
                          };
                          const retailerRecord = {
                            method: 'POST',
                            headers: { 'Content-Type': 'application/json' },
                            body: JSON.stringify({       
                              "hashAddress":data.retailer,       
                              })  
                          };
                          
                          await fetch("http://192.168.1.101:5150/location",factoryRecord)    
                          .then(res => res.json())
                          .then(data => {
                            if(data){
                              factoryuserrec = data.username;
                            } 
                          })
                          .catch((error) => {
                            console.error('Error:', error);
                          });
            
                          await fetch("http://192.168.1.101:5150/location",retailerRecord)    
                          .then(res => res.json())
                          .then(data => {
                            if(data){
                              retaileruserrec = data.username;
                            } 
                          })
                          .catch((error) => {
                            console.error('Error:', error);
                          });

                          let hour = await dateContract.getHour(
                            retailer.timeStamp7.toNumber()
                          );
                          let minute = await dateContract.getMinute(
                            retailer.timeStamp7.toNumber()
                          );
                          let second = await dateContract.getSecond(
                            retailer.timeStamp7.toNumber()
                          );
                          let day = await dateContract.getDay(
                            retailer.timeStamp7.toNumber()
                          );
                          let month = await dateContract.getMonth(
                            retailer.timeStamp7.toNumber()
                          );
                          let year = await dateContract.getYear(
                            retailer.timeStamp7.toNumber()
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
                          const batchId = retailer.productId.toNumber();
                          checkListVal = 1;
                          allRetailerList.push(
                            <>
                            <tr>
                              <td>{batchId}</td>
                              <td>{factoryuserrec}</td>
                              <td>{retaileruserrec}</td>
                              <td>{data.quantity.toNumber()}</td>
                              <td>{retailer.Description}</td>
                              <td>
                                {day}-{month}-{year} {hour}:{minute}:{second}
                              </td>
                            </tr> 
                            </>
                          )
                        }
                        j++;
                    } catch(err){
                        break;
                    }
                }
            }
          }
        }
        if (checkListVal == 0) {
          allRetailerList.push(
            <>
              <tr>
                <td colSpan="6">No Record Found a</td>
              </tr>
            </>
          );
        }
        setRetailerList(allRetailerList);
      };


    return(
        <div className="new">
        <div className="newContainer">
          <div className="top">
            <h4>Sell List</h4>
          </div>
          <div className="bottom">
            <div className="right">
              <table>
                <tr>
                  <th>Product Batch</th>
                  <th>Factory Address</th>
                  <th>Retailer Address</th>
                  <th>Quantities</th>
                  <th>Product Description</th>
                  <th>Date</th>
                </tr>
                {retailerList}
              </table>
            </div>
          </div>
        </div>
      </div>
    )
}

export default ViewListTable