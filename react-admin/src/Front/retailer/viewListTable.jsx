import React, { useEffect, useState, useContext } from "react";
import "../../style/front/viewSupplyTable.scss";
import { Link, useNavigate } from "react-router-dom";
import { DarkModeContext } from "../../context/darkModeContext";

const ViewListTable = () =>{
    const navigate = useNavigate();
    var checkListVal = 0;
    const {dispatch,metaMask,supplyChainContract,ownSupplyChainAddress,dateContract} = useContext(DarkModeContext);
    const allcutomerllist = [];
    const [customerList, setCustomerList] = useState(null);


    useEffect(() => {
        getSupplyChainHandler();
      }, []);

      const getSupplyChainHandler = async (event) => {
        let distributeruserrec = "";
        let customeruserrec = "";
    
        const totalBatches =await supplyChainContract.totalProductBatchs();
        if (totalBatches.toNumber() > 0) {
          for (let i = 0; i < totalBatches.toNumber(); i++) {
            const retailer =await supplyChainContract.Product(i);
            if(retailer.productState){
                let j =1 ;
                while(j){
                    try{
                        const data = await supplyChainContract.ProductIdToCustomer(i,j-1);
                        if(data.retailer.toLowerCase() ==ownSupplyChainAddress.toLowerCase()){

                          const distributorRecord = {
                            method: 'POST',
                            headers: { 'Content-Type': 'application/json' },
                            body: JSON.stringify({       
                              "hashAddress":data.distributor,       
                              })  
                          };
                          const customerRecord = {
                            method: 'POST',
                            headers: { 'Content-Type': 'application/json' },
                            body: JSON.stringify({       
                              "hashAddress":data.customer,       
                              })  
                          };
                          
                          await fetch("http://162.215.222.118:5151/location",distributorRecord)    
                          .then(res => res.json())
                          .then(data => {
                            if(data){
                              distributeruserrec = data.username;
                            } 
                          })
                          .catch((error) => {
                            console.error('Error:', error);
                          });
            
                          await fetch("http://162.215.222.118:5151/location",customerRecord)    
                          .then(res => res.json())
                          .then(data => {
                            if(data){
                              customeruserrec = data.username;
                            } 
                          })
                          .catch((error) => {
                            console.error('Error:', error);
                          });

                          let hour = await dateContract.getHour(
                            data.timeStamp12.toNumber()
                          );
                          let minute = await dateContract.getMinute(
                            data.timeStamp12.toNumber()
                          );
                          let second = await dateContract.getSecond(
                            data.timeStamp12.toNumber()
                          );
                          let day = await dateContract.getDay(
                            data.timeStamp12.toNumber()
                          );
                          let month = await dateContract.getMonth(
                            data.timeStamp12.toNumber()
                          );
                          let year = await dateContract.getYear(
                            data.timeStamp12.toNumber()
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
                          allcutomerllist.push(
                            <>
                            <tr>
                              <td>{batchId}</td>
                              <td>{distributeruserrec}</td>
                              <td>{customeruserrec}</td>
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
          allcutomerllist.push(
            <>
              <tr>
                <td colSpan="6">No Record Found</td>
              </tr>
            </>
          );
        }
        setCustomerList(allcutomerllist);
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
                  <th>Batch ID</th>
                  <th>Distributer Address</th>
                  <th>Customer Address</th>
                  <th>Quantities</th>
                  <th>Product Description</th>
                  <th>Date</th>
                </tr>
                {customerList}
              </table>
            </div>
          </div>
        </div>
      </div>
    )
}

export default ViewListTable