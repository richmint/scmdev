import React, { useEffect, useState, useContext } from 'react';
import '../../style/front/viewSupplyTable.scss'
import { DarkModeContext } from "../../context/darkModeContext";
import { useNavigate } from "react-router-dom";
import Button from 'react-bootstrap/Button';
const AvailabeProductCustomerTable = () => {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [materiallist, setMateriallist] = useState(null);
  const { dispatch, metaMask, supplyChainContract, ownSupplyChainAddress, dateContract } = useContext(DarkModeContext);
  const allsupplymateriallist = [];
  const getProductListHandler = async (event) => {
    let retailrHash = ''
    const totalbatch = (await supplyChainContract.totalBatchs());
    if (totalbatch.toNumber() > 0) {
      for (let i = 0; i < totalbatch; i++) {
        let retailers = await supplyChainContract.getRetailers(i);
        if (retailers.length > 0) {
          for (let k = 0; k < retailers.length; k++) {
              let object = await supplyChainContract.items(i);
              const requestOptions = { 
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({       
                      "location":localStorage.address,
                      "role":"Retailer"
                      })
                    }  
                  await fetch("http://192.168.1.101:5150/retailerbylocation",requestOptions)    
                    .then(result => result.json())
                    .then(resultdata => {
                      if(resultdata){ 
                        retailrHash = resultdata.hashAddress
                      }else{
                        console.log("error");
                      } 
                     }
                     )   
           if(retailrHash == retailers[k]){
            console.log("fgdfgdfg",object.itemState);
            let runits = await supplyChainContract.getRetailersUnits(i)
              if (object.itemState === 7 && runits[k].toNumber() !== 0) { 
                
                let rcounter = await supplyChainContract.getRetailersCounters(i)
                const data = await supplyChainContract.timeStamps(object.supplyChainId, object.itemState);
                allsupplymateriallist.push(
                  <><tr> 
                    <td>{i}</td>
                   <td>{retailrHash}</td> 
                    <td>{runits[k].toNumber()}</td>
                     <td>{object.Description}</td>
                    <td><Button variant="outline-success" onClick={() => navigate('/productBuyCustomer', {state:{id:i,retailerAddress:retailrHash,productQty:runits[k].toNumber()}})}>Buy</Button></td> 
                  </tr>
                  </>     
                )
              }else {
                allsupplymateriallist.push(
                  <><tr>
                    <td colSpan="6">No Record Found</td>
                  </tr></>
                )
              }
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
    getProductListHandler();
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
                   <th>Retailer</th>
                  <th>Total Quantities</th>
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
export default AvailabeProductCustomerTable
