import React, { useEffect, useState, useContext } from 'react';
import '../../style/front/viewSupplyTable.scss'
import { DataGrid } from "@mui/x-data-grid";
import { Link } from "react-router-dom";
import { DarkModeContext } from "../../context/darkModeContext";
import { useNavigate } from "react-router-dom";
import Button from 'react-bootstrap/Button';

const AvailabeProductCustomerTable = () => {
  
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [materiallist, setMateriallist] = useState(null);
  const [retailrHash, setretailrHash] = useState(null);
  
  const { dispatch, metaMask, supplyChainContract, supplyChainTokenContract, ownSupplyChainAddress, dateContract } = useContext(DarkModeContext);

  const allsupplymateriallist = [];
  const getProductListHandler = async (event) => {

    const totalbatch = (await supplyChainContract.totalBatchs());
    if (totalbatch > 0) {
      for (let i = 0; i < totalbatch; i++) {

        let retailers = await supplyChainContract.getRetailers(i);
        if (retailers.length > 0) {
          for (let k = 0; k < retailers.length; k++) {
              let object = await supplyChainContract.items(i);
             // console.log("retailers", retailers[k]);
              //console.log("Record", object)
              const requestOptions = {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({       
                      "location":localStorage.address,
                      "role":"Retailer"
                      })
                    } 
                    fetch("http://127.0.0.1:5150/retailerbylocation",requestOptions)    
                    .then(result => result.json())
                    .then(resultdata => {
                      if(resultdata){ 
                        setretailrHash(resultdata.hashAddress);
                      }else{
                        console.log("error");
                      } 
                     }
                     )

           if(retailrHash == retailers[k]){
              if (object.itemState === 7) {
                //console.log("sdfsdfsdf", object)
                let runits = await supplyChainContract.getRetailersUnits(i)
                //console.log("Retailer Unit", runits[k].toNumber());
                let rcounter = await supplyChainContract.getRetailersCounters(i)
                //console.log("Availeble Product", rcounter[k].toNumber());
                //console.log("PRoduct Detail",await supplyChainContract.OGDetails(object.supplyChainId));
                const data = await supplyChainContract.timeStamps(object.supplyChainId, object.itemState);
                //console.log(await dateContract.getDay(data.toNumber()),await dateContract.getMonth(data.toNumber()),await dateContract.getYear(data.toNumber()));

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
                   <th>Retailer Address</th>
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
