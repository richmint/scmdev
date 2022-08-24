import React, { useEffect, useState, useContext } from 'react';
import '../../style/front/viewSupplyTable.scss'
import { DataGrid } from "@mui/x-data-grid";
import { Link } from "react-router-dom";
import { DarkModeContext } from "../../context/darkModeContext";
import { useNavigate } from "react-router-dom";
import Button from 'react-bootstrap/Button';

const AvailabeProductTable = () => {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [materiallist, setMateriallist] = useState(null);

  const { dispatch, metaMask, supplyChainContract, ownSupplyChainAddress, dateContract } = useContext(DarkModeContext);



  const allsupplymateriallist = [];
  const getSupplyChainHandler = async (event) => {
    let distributeruserrec = '';
    let factoryuserrec = '';





    
  // const total =await supplychain.totalBatchs()
  // for(let i =0; i<total; i++){
  //   let array = await supplychain.getRetailers(i);
  //   if(array.length>0){
  //     for(let k=0; k<array.length; k++){
  //       if(array[k]===retailerSigner1.address){
  //         const object =await supplychain.items(i);
  //         if(object.itemState==7){
  //           console.log(object)
  //           let runits =await supplychain.getRetailersUnits(i)
  //           console.log(runits[k]); 
  //           let rcounter =await supplychain.getRetailersCounters(i)
  //           console.log(rcounter[k]);
  //           console.log(await supplychain.OGDetails(object.supplyChainId));
  //           const data = await supplychain.timeStamps(object.supplyChainId,object.itemState);
  //           console.log(await dateTime.getDay(data.toNumber()),await dateTime.getMonth(data.toNumber()),await dateTime.getYear(data.toNumber()));
  //         }
  //       } 
  //     }
  //   }
  // }







    const totalbatch = (await supplyChainContract.totalBatchs());
    //console.log("totalbatch",totalbatch.toNumber());
    if (totalbatch.toNumber() > 0) {
      for (let i = 0; i < totalbatch; i++) {

        let retailers = await supplyChainContract.getRetailers(i);
        if (retailers.length > 0) {

          for (let k = 0; k < retailers.length; k++) {
           
            if (retailers[k].toLowerCase() == ownSupplyChainAddress.toLowerCase()) {
              let object = await supplyChainContract.items(i);
              //console.log("myrecord",object);
              if (object.itemState === 7) {
 
                let runits = await supplyChainContract.getRetailersUnits(i)
                let rcounter = await supplyChainContract.getRetailersCounters(i)
                //console.log("PRoduct Detail",await supplyChainContract.OGDetails(object.supplyChainId));
                const data = await supplyChainContract.timeStamps(object.supplyChainId, object.itemState);
                //console.log(await dateContract.getDay(data.toNumber()),await dateContract.getMonth(data.toNumber()),await dateContract.getYear(data.toNumber()));


                const distributerRecord = {
                  method: 'POST',
                  headers: { 'Content-Type': 'application/json' },
                  body: JSON.stringify({       
                    "hashAddress":object.distributorId,        
                    })
                };
                await fetch("http://162.215.222.118:5150/location",distributerRecord)    
                .then(res => res.json())
                .then(data => {
                  if(data){
                    distributeruserrec = data.username
                  }
                }).catch((error) => { 
                  console.error('Error:', error);
                });
                const factoryRecord = {
                  method: 'POST',
                  headers: { 'Content-Type': 'application/json' },
                  body: JSON.stringify({       
                    "hashAddress":object.factoryID,       
                    })
                };
                await fetch("http://162.215.222.118:5150/location",factoryRecord)    
                .then(res => res.json())
                .then(data => {
                  if(data){
                    factoryuserrec = data.username
                  }
                }).catch((error) => { 
                  console.error('Error:', error);
                });
                allsupplymateriallist.push(
                  <><tr>
                    <td>{i}</td>
                    <td>{distributeruserrec && distributeruserrec}</td>
                    <td>{factoryuserrec && factoryuserrec}</td>
                    {/* <td>{object.totalUnits.toNumber()}</td> */}
                    <td>{runits[k].toNumber()}</td>
                    {/* <td>{rcounter[k].toNumber()}</td> */}
                    {/*<td>{object.WoolAmount.toNumber()}</td> */}
                    <td>{object.Description}</td>
                    {/* <td>
                      <Button variant="outline-primary" onClick={() => navigate('/viewBatchStatus', { state: { i } })}>View</Button>
                    </td> */}
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
                  {/* <th>Total Product</th> */}
                  <th>Total Quantities</th>
                  <th>Product Description</th>
                  {/* <th>Sold Product</th> */}
                  {/* <th>Action</th> */}
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

export default AvailabeProductTable
