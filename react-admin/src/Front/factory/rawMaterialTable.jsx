import React, { useEffect, useState, useContext } from 'react';
import '../../style/front/viewSupplyTable.scss'
import { DarkModeContext } from "../../context/darkModeContext";
import { useNavigate } from "react-router-dom";
import Button from 'react-bootstrap/Button';

const RawMaterialTable = () => {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [materiallist, setMateriallist] =  useState(null);

  const { dispatch, metaMask, supplyChainContract, supplyChainTokenContract, ownSupplyChainAddress } = useContext(DarkModeContext);

  const allsupplymateriallist = [];
  const getSupplyChainHandler = async (event) => { 
    let userdatarec = '';
    const totalbatchids = (await supplyChainContract.totalBatchs()).toNumber();
    var checkvalue = 0;
    if(totalbatchids>0){
      for (let i = 0; i < totalbatchids; i++) {
      let object = await supplyChainContract.items(i);
      let OGObject = await supplyChainContract.OGDetails(object.supplyChainId);
      //console.log("myrecord", OGObject);
      let OGPolyesterAmount = OGObject.OGPolyesterAmount.toNumber();
      let OGCottonAmount = OGObject.OGCottonAmount.toNumber();
      let OGWoolAmount = OGObject.OGWoolAmount.toNumber();
      if (object.itemState === 0 || object.itemState === 1 && object.factoryID.toLowerCase() == ownSupplyChainAddress.toLowerCase()) {
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
        })
        .catch((error) => {
          console.error('Error:', error);
        });
        allsupplymateriallist.push(
          <><tr>  
            <td>{i}</td> 
            <td>{userdatarec && userdatarec}</td>
            <td>{OGObject.OGPolyesterAmount.toNumber()}</td>
            <td>{OGObject.OGCottonAmount.toNumber()}</td>
            <td>{OGObject.OGWoolAmount.toNumber()}</td>
            <td>{object.itemState === 0 ?<Button variant="outline-success" onClick={() => navigate('/BuyRawMaterial',{state:{i}})}>Buy</Button>:<Button variant="outline-info" onClick={() => navigate('/rawMaterialQualityCheck',{state:{id:i,OGPolyesterAmount:OGPolyesterAmount,OGCottonAmount:OGCottonAmount,OGWoolAmount:OGWoolAmount}})}>Quality Check</Button> }
              </td>
          </tr></>
        )
       
      } 
     
    }
    if(checkvalue == 0) {
      allsupplymateriallist.push(
        <><tr>
          <td colSpan="5">No Record Found</td>
        </tr></>
      )
  }
  }else {
      allsupplymateriallist.push(
        <><tr>
          <td colSpan="5">No Record Found</td>
        </tr></>
      )
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
            <h4>Raw Material List</h4>
          </div>
          <div className="bottom">
            <div className="right">
              
              <table>
                <tr>
                <th>Batch ID</th>
                <th>Raw Material Supplier Address</th>
                  <th>Polyster Amount</th>
                  <th>Cotton Amount</th>
                  <th>Wool Amount</th>
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

export default RawMaterialTable;


