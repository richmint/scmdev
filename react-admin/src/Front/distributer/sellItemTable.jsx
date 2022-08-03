import React, { useEffect, useState, useContext } from 'react';
import '../../style/front/viewSupplyTable.scss'
import { DataGrid } from "@mui/x-data-grid";
import { Link } from "react-router-dom";
import { DarkModeContext } from "../../context/darkModeContext";
import { useNavigate } from "react-router-dom";
import '../distributer/sellItemTable.scss'
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

const SellItemTable = () =>{
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [materiallist, setMateriallist] =  useState(null);

   
  const { dispatch, metaMask, supplyChainContract, supplyChainTokenContract, ownSupplyChainAddress } = useContext(DarkModeContext);

  const allsupplymateriallist = [];
  const getSupplyChainHandler = async (event) => {

    //console.log("supplyChainContract ", supplyChainContract)
    const totalbatchids = (await  supplyChainContract.totalBatchs());
    //console.log("totalbatchids",totalbatchids);
    if(totalbatchids>0){
      for (let i = 0; i < totalbatchids; i++) {
        let object = await supplyChainContract.items(i);
        if (object.itemState === 6 && object.distributorId.toLowerCase() === ownSupplyChainAddress) {
          //console.log("myrecord", object);
          // console.log("inner loop", object.PolyesterAmount.toNumber());
          // console.log("cotton loop", object.CottonAmount.toNumber());
          allsupplymateriallist.push(
<>
          <div className="bottom">
            <div className="right">
              <Card style={{ width: '80rem' }}>
                <Card.Body>
                  <Card.Text style={{ width: '50%', float: 'left' }}>
                      <p><b>Batch ID : </b> {object && object.supplyChainId.toNumber()} </p>
                      <p><b>Raw Material Supplier : </b> {object && object.RawMaterialSupplierID}</p>
                      <p><b>Warehouse Address : </b> {object && object.warehouseID}</p>
                      <p><b>Factory Address : </b> {object && object.factoryID}</p>
                      
                  </Card.Text>
                  <Card.Text style={{ width: '50%', float: 'left' }}>
                  <p></p>
                    <p><b>Raw Material  : </b> {object.PolyesterAmount.toNumber()} Kg Polyster,{object.CottonAmount.toNumber()} kg Cotton,{object.WoolAmount.toNumber()}Kg Wool</p>
                    <p><b>Product Quantity : </b> {object && object.totalUnits.toNumber()}</p>
                    <p><b>Description : </b> {object && object.Description}</p>
                      
                  </Card.Text>
                  <Card.Text style={{float: 'right' }}>
                  <Button variant="outline-success" onClick={() => navigate('/sellToRetailer',{state:{i}})}>Sell To Retailer</Button>

                  </Card.Text>
                </Card.Body>
              </Card>
            </div>
          </div>
        

        
</>
          )
        }     
      }
    }else {
      allsupplymateriallist.push(
        <><tr>
          <td colSpan="6">No Record Found</td>
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
                <h4>Available Sell Item</h4>
              </div>
                
                <div style={{display:'flex',width:'100%',flexDirection:'column',justifyContent:"center"}}>
                {materiallist}
              </div>
            </div>
          </div>
        </>
      );
  
    
}

export default SellItemTable
