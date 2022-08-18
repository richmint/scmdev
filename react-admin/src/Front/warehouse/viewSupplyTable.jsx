
import React, { useEffect, useState, useContext } from 'react';
import "./viewSupplyTable.scss";
import { DataGrid } from "@mui/x-data-grid";
import { Link } from "react-router-dom";
import { DarkModeContext } from "../../context/darkModeContext";








////////////////////////////////




  // let object =await supplychain.getWarehouseItems(warehouseSigner.address)   
  // for(let i=0;i <object.length; i++){
  //   if(object[i].itemState==1){
  //     console.log(object[i]);
  //     console.log("factory bought raw materials")
  //   }else if(object[i].itemState==2){
  //     console.log(object[i])
  //     console.log("factory complete Quality Check")
  //     console.log(await supplychain.OGDetails(object[i].supplyChainId));
  //   }else if(object[i].itemState==3){
  //     console.log(object[i])
  //     console.log("factory complete spinning and weaving")
  //     console.log(await supplychain.OGDetails(object[i].supplyChainId));
  //   }else if(object[i].itemState==4){
  //     console.log(object[i])
  //     console.log("factory complete garment production")
  //     console.log(await supplychain.OGDetails(object[i].supplyChainId));
  //   }else if(object[i].itemState==5){
  //     console.log(object[i])
  //     console.log("factory complete final quality check")
  //     console.log(await supplychain.OGDetails(object[i].supplyChainId));
  //   }
  //   const data =await supplychain.timeStamps(object[i].supplyChainId,object[i].itemState);
  //   console.log(await dateTime.getDay(data.toNumber()),".",await dateTime.getMonth(data.toNumber()),".",await dateTime.getYear(data.toNumber()));
  // }





////////////////////////////









const ViewSupplyTable = () => {

  const [data, setData] = useState([]);
  const [materiallist, setMateriallist] =  useState(null);
  const { dispatch, metaMask, supplyChainContract, supplyChainTokenContract, ownSupplyChainAddress, dateContract } = useContext(DarkModeContext);

  const allsupplymateriallist = [];
  const getSupplyChainHandler = async (event) => {
    let userdatarec = '';
    let factoryuserdatarec = '';
    let userdatalocation = '';
    let object =await supplyChainContract.getWarehouseItems(ownSupplyChainAddress)   
  for(let i=0;i <object.length; i++){
    
    if(object[i].itemState==1 || object[i].itemState==2 || object[i].itemState==3){
      console.log("fsdfdsfdsfsaaaaa ssds asasa",object[i])
      const data =await supplyChainContract.timeStamps(object[i].supplyChainId,object[i].itemState);
      //console.log("object i=",object[i]);
      const dateObject = await supplyChainContract.timeStamps(i,0);
        const createdday = await dateContract.getDay(dateObject.toNumber())
        const createmonth = await dateContract.getMonth(dateObject.toNumber())
        const createdyear = await dateContract.getYear(dateObject.toNumber())
      
        const rawMaterialRecord = { 
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({       
            "hashAddress":object[i].RawMaterialSupplierID,       
            })
        };
        await fetch("http://162.215.222.118:5150/location",rawMaterialRecord)    
        .then(res => res.json())
        .then(data => {
          if(data){
            userdatarec = data.username
            userdatalocation = data.location
          }
        }).catch((error) => { 
          console.error('Error:', error);
        });

        const factoryRecord = {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({       
            "hashAddress":object[i].factoryID,       
            })
        };
        await fetch("http://162.215.222.118:5150/location",factoryRecord)    
        .then(res => res.json())
        .then(data => {
          if(data){
            factoryuserdatarec = data.username
          }
        }).catch((error) => { 
          console.error('Error:', error);
        });


      allsupplymateriallist.push(
                  <><tr> 
                    <td>{object[i].supplyChainId.toNumber()}</td>
                    <td>{userdatarec && userdatarec}</td>
                    <td>{factoryuserdatarec && factoryuserdatarec}</td>
                    <td>{object[i].PolyesterAmount.toNumber()}</td>
                    <td>{object[i].CottonAmount.toNumber()}</td>
                    <td>{object[i].WoolAmount.toNumber()}</td>
                    <td>{userdatalocation && userdatalocation}</td>
                    <td>{createdday}:{createmonth}:{createdyear}</td>
                  </tr></>
                )
    }
  }
    setMateriallist(allsupplymateriallist);
  }
  useEffect(()=>{
    getSupplyChainHandler();
  },[]);
 
  return (
    <>
      <div className="new">
        <div className="newContainer">
          <div className="top">
              <h3>View Supply Token</h3>
          </div>
          <div className="bottom">
            <div className="right">
              
              <table>
                <tr>
                 <th>Batch ID</th>
                 <th>Raw Material Supplier</th>
                 <th>Factory Address</th>
                  <th>Polyster Amount</th>
                  <th>Cotton Amount</th>
                  <th>Wool Amount</th>
                  <th>Factory Location</th>
                  <th>Batch Created</th>
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

export default ViewSupplyTable;


