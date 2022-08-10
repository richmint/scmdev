import React, { useEffect, useState, useContext } from 'react';
import '../../style/front/viewSupplyTable.scss'
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
    const totalbatchids = (await  supplyChainContract.totalBatchs());
    var checkvalue = 0;
    if(totalbatchids>0){
      for (let i = 0; i < totalbatchids; i++) {
        let object = await supplyChainContract.items(i);
        if (object.itemState === 6 && object.distributorId.toLowerCase() === ownSupplyChainAddress) {
          var checkvalue = 1;
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
      if(checkvalue == 0) {
        allsupplymateriallist.push(
          <><div className="bottom">
              <div className="right">
                <p>No Record Found</p>
              </div>
            </div>
          </>
        )
    }
    }else {
      allsupplymateriallist.push(
        <><div className="bottom">
        <div className="right">
        <p>No Record Found</p>
      </div>
      </div></>
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
