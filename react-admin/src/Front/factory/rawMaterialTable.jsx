import React, { useEffect, useState, useContext } from 'react';
import '../../style/front/viewSupplyTable.scss'
import { DataGrid } from "@mui/x-data-grid";
import { Link } from "react-router-dom";
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

    //console.log("Factory Address ", ownSupplyChainAddress)
    const totalbatchids = (await supplyChainContract.totalBatchs()).toNumber();
    if(totalbatchids>0){  for (let i = 0; i < totalbatchids; i++) {
      let object = await supplyChainContract.items(i);
      let OGObject = await supplyChainContract.OGDetails(object.supplyChainId);
      //console.log("myrecord", OGObject);
      let OGPolyesterAmount = OGObject.OGPolyesterAmount.toNumber();
      let OGCottonAmount = OGObject.OGCottonAmount.toNumber();
      let OGWoolAmount = OGObject.OGWoolAmount.toNumber();
      if (object.itemState === 0 || object.itemState === 1) {

        allsupplymateriallist.push(
          <><tr> 
            <td>{i}</td>
            <td>{object.RawMaterialSupplierID}</td>
            <td>{OGObject.OGPolyesterAmount.toNumber()}</td>
            <td>{OGObject.OGCottonAmount.toNumber()}</td>
            <td>{OGObject.OGWoolAmount.toNumber()}</td>
            <td>{object.itemState ===0 ?<Button variant="outline-success" onClick={() => navigate('/BuyRawMaterial',{state:{i}})}>Buy</Button>:<Button variant="outline-info" onClick={() => navigate('/rawMaterialQualityCheck',{state:{id:i,OGPolyesterAmount:OGPolyesterAmount,OGCottonAmount:OGCottonAmount,OGWoolAmount:OGWoolAmount}})}>Quality Check</Button> }
              </td>
          </tr></>
        )
       
      } 
     
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


