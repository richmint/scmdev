import React, { useEffect, useState, useContext } from 'react';
import '../../style/front/viewSupplyTable.scss'
import { DarkModeContext } from "../../context/darkModeContext";
import { useNavigate } from "react-router-dom";
import Button from 'react-bootstrap/Button';

const SpinningWeavingTable = () => {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [materiallist, setMateriallist] = useState(null);
  const { dispatch, metaMask, supplyChainContract, supplyChainTokenContract, ownSupplyChainAddress } = useContext(DarkModeContext);
  const allsupplymateriallist = [];





  

  // const totalBatchs =await supplychain.totalBatchs()  
  // for(let i= 0; i<totalBatchs; i++){  
  //   const item = await supplychain.items(i);  
  //   if (item.itemState ==3 && (item.factoryID1 ==factorySigner1.address || item.factoryID2 ==factorySigner1.address || item.factoryID2 ==factorySigner1.address) ){
      
  //     console.log();
  //     console.log(item); 
  //     console.log(await supplychain.RawMaterialDetails(item.supplyChainId));
  //     const object =await supplychain.timeStamps(item.supplyChainId,item.itemState);
  //     console.log(await dateTime.getDay(object.toNumber()),await dateTime.getMonth(object.toNumber()),await dateTime.getYear(object.toNumber()));
  //     console.log();
  //   } 
  // } 




  const getSupplyChainHandler = async (event) => {
    let userdatarec = '';
    const totalbatchids = (await supplyChainContract.totalBatchs());
    var checkvalue = 0;
    if (totalbatchids > 0) {
      for (let i = 0; i < totalbatchids; i++) {
        let object = await supplyChainContract.items(i);
        if (object.itemState === 3 && object.factoryID1.toLowerCase() == ownSupplyChainAddress.toLowerCase() || object.factoryID2.toLowerCase() == ownSupplyChainAddress.toLowerCase() || object.factoryID3.toLowerCase() == ownSupplyChainAddress.toLowerCase()) {
          
          let rawMaterialDetails = await supplyChainContract.RawMaterialDetails(object.supplyChainId);

          console.log("Raw Material Details",rawMaterialDetails);

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
              {/* <td>{rawMaterialDetails.rawMaterial1.toNumber()}</td>
              <td>{rawMaterialDetails.rawMaterial2.toNumber()}</td>
              <td>{rawMaterialDetails.rawMaterial3.toNumber()}</td>
              <td>{rawMaterialDetails.rawMaterial3.toNumber()}</td>
              <td>{rawMaterialDetails.rawMaterial3.toNumber()}</td> */}
              <td>
                <Button variant="outline-primary" onClick={() => navigate('/viewBatchStatus', { state: { i } })}>View</Button>
                <Button variant="outline-success" onClick={() => navigate('/spinningBatchCompleteForm', { state: { i } })}>Continue</Button>
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
    getSupplyChainHandler();
  }, []);
  return (
    <>
      <div className="new">
        <div className="newContainer">
          <div className="top">
            <h4>Spinning Weaving List</h4>
          </div>
          <div className="bottom">
            <div className="right">
              <table>
                <tr>
                  <th>Batch ID</th>
                  <th>Raw Material Supplier</th>
                  {/* <th>Polyster Amount</th>
                  <th>Cotton Amount</th>
                  <th>Wool Amount</th>
                  <th>Wool Amount</th>
                  <th>Wool Amount</th> */}
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
export default SpinningWeavingTable
