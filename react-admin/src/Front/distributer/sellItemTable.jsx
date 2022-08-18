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
    let userdatarec = '';
    let wareuserdatarec = '';
    let factorydatarec = '';
    const totalbatchids = (await  supplyChainContract.totalBatchs());
    var checkvalue = 0;
    if(totalbatchids>0){
      for (let i = 0; i < totalbatchids; i++) {
        let object = await supplyChainContract.items(i);
        if (object.itemState === 6  && object.distributorId.toLowerCase() == ownSupplyChainAddress.toLowerCase()) {
          var checkvalue = 1;
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
          const warehouseRecord = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({       
              "hashAddress":object.warehouseID,       
              })
          };
          await fetch("http://162.215.222.118:5150/location",warehouseRecord)    
          .then(res => res.json())
          .then(data => {
            if(data){
              wareuserdatarec = data.username
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
              factorydatarec = data.username
            }
          }).catch((error) => { 
            console.error('Error:', error);
          });
          allsupplymateriallist.push(
          <>
          <div className="bottom">
            <div className="right">
              <Card style={{ width: '80rem' }}>
                <Card.Body>
                  <Card.Text style={{ width: '50%', float: 'left' }}>
                      <p><b>Batch ID : </b> {object && object.supplyChainId.toNumber()} </p>
                      <p><b>Raw Material Supplier : </b> {userdatarec && userdatarec }</p>
                      <p><b>Warehouse Address : </b> {wareuserdatarec && wareuserdatarec}</p>
                      <p><b>Factory Address : </b> {factorydatarec && factorydatarec}</p>
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
