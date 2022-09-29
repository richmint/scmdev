import React, { useEffect, useState, useContext, useMemo } from 'react';
import '../../style/front/viewSupplyTable.scss'
import { DataGrid } from "@mui/x-data-grid";
import { Link } from "react-router-dom";
import { DarkModeContext } from "../../context/darkModeContext";
import { useNavigate } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import { useLocation } from "react-router-dom";
import Card from 'react-bootstrap/Card';

const ViewBatchStatusTable = () => {
  let data = useLocation();
  const navigate = useNavigate();
  const { dispatch, metaMask, supplyChainContract, ownSupplyChainAddress, dateContract } = useContext(DarkModeContext);
  useEffect(() => {
    getSupplyChainHandler();
  }, []);
  const [batchRecord, setbatchRecord] = useState();
  const [ogBatchRecord, setogBatchRecord] = useState();
  const [garbagePolyesterAmount, setgarbagePolyesterAmount] = useState();
  const [garbageCottonAmount, setgarbageCottonAmount] = useState();
  const [garbageWoolAmount, setgarbageWoolAmount] = useState();
  
  const [rawcreatedday, setrawcreatedday] = useState();
  const [rawcreatemonth, setrawcreatemonth] = useState();
  const [rawcreatedyear, setrawcreatedyear] = useState(); 

  const [spinningcreatedday, setspinningcreatedday] = useState();
  const [spinningcreatemonth, setspinningcreatemonth] = useState();
  const [spinningcreatedyear, setspinningcreatedyear] = useState(); 
  
  const [manufactureGarmentday, setmanufactureGarmentday] = useState();
  const [manufactureGarmentmonth, setmanufactureGarmentmonth] = useState();
  const [manufactureGarmentyear, setmanufactureGarmentyear] = useState();

  const [sellitemday, setsellitemday] = useState();
  const [sellitemmonth, setsellitemmonth] = useState();
  const [sellitemyear, setsellitemyear] = useState();

  const [rawlocation, setrawlocation] = useState();
  const [warelocation, setwarelocation] = useState();
  const [factlocation, setfactlocation] = useState();

  const [rawName, setrawName] = useState();
  const [wareName, setwareName] = useState();
  const [factName, setfactName] = useState();

  const [batchTypeRec, setbatchTypeRec] = useState();
  
  const getSupplyChainHandler = async (event) => {
    const viewBatchRecord = await supplyChainContract.items(data.state.i);
    setbatchRecord(viewBatchRecord);

    let OGViewBatchRecord = await supplyChainContract.RawMaterialDetails(viewBatchRecord.supplyChainId);
    setogBatchRecord(OGViewBatchRecord)

    const batchType = OGViewBatchRecord.rawMaterialType.toNumber();
    setbatchTypeRec(batchType)


    for (let i = 0; i < viewBatchRecord.itemState; i++) {
      const dateObjectrec =await supplyChainContract.timeStamps(data.state.i,i);
      const createdday = await dateContract.getDay(dateObjectrec.toNumber())
      const createmonth = await dateContract.getMonth(dateObjectrec.toNumber())
      const createdyear = await dateContract.getYear(dateObjectrec.toNumber())
      if(i == 0){
        setrawcreatedday(createdday);
        setrawcreatemonth(createmonth);
        setrawcreatedyear(createdyear);
      }else if(i == 3){
        setspinningcreatedday(createdday);
        setspinningcreatemonth(createmonth);
        setspinningcreatedyear(createdyear);
      }else if(i == 4){
        setmanufactureGarmentday(createdday);
        setmanufactureGarmentmonth(createmonth);
        setmanufactureGarmentyear(createdyear);
      }else if(i == 6){
        setsellitemday(createdday);
        setsellitemmonth(createmonth);
        setsellitemyear(createdyear);
      }
    }
   
    // const garbagePolAmount = OGViewBatchRecord.OGPolyesterAmount.toNumber() - viewBatchRecord.PolyesterAmount.toNumber() 
    // setgarbagePolyesterAmount(garbagePolAmount)
    // const garbageCottonAmount = OGViewBatchRecord.OGCottonAmount.toNumber() - viewBatchRecord.CottonAmount.toNumber() 
    // setgarbageCottonAmount(garbageCottonAmount)
    // const garbageWAmount = OGViewBatchRecord.OGWoolAmount.toNumber() - viewBatchRecord.WoolAmount.toNumber() 
    // setgarbageWoolAmount(garbageWAmount)

      const rawmaterialLocation = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({       
          "hashAddress":viewBatchRecord.RawMaterialSupplierID,       
          })
      };
  
     await fetch("http://162.215.222.118:5151/location",rawmaterialLocation)    
      .then(res => res.json())
      .then(data => {
        if(data){
          setrawName(data.username)
          setrawlocation(data.location);
        }
      })
      .catch((error) => {
        console.error('Error:', error);
      });
      const warehouseLocation = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({       
          "hashAddress":viewBatchRecord.warehouseID,       
          })
      };
      await fetch("http://162.215.222.118:5151/location",warehouseLocation)    
      .then(res => res.json())
      .then(data => {
        if(data){
          setwareName(data.username)
          setwarelocation(data.location);
        }
      })
      .catch((error) => {
        console.error('Error:', error);
      });
      const factoryLocation = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({       
          "hashAddress":viewBatchRecord.factoryID1,       
          })
      };
      await fetch("http://162.215.222.118:5151/location",factoryLocation)    
      .then(res => res.json())
      .then(data => {
        if(data){
          setfactName(data.username);
          setfactlocation(data.location);
        }
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }
  const PendingContinue = (props) =>{
    const data = props.data;
    const path = props.path;
    return(
    <>
    <Button variant="outline-danger">Pending</Button>
    </>
    )
  }
  return (
    <>
      <div className="new">
        <div className="newContainer">
          <div className="top">
          <h4>View Batch Details</h4>
          </div>
          <div className="bottom">
            <div className="right">
              <Card style={{ width: '80rem' }}>
                <Card.Body>
                  <Card.Title>Spinning Material Detail</Card.Title>
                  <Card.Text style={{ width: '50%', float: 'left' }}>
                    <>
                      <p><b>Batch ID : </b>{data.state.i}</p>
                      <p><b>Batch Type : </b>{batchTypeRec == 1 ? "Cotton": batchTypeRec == 2 ? "Polyester" :  batchTypeRec == 3 ? "Wool" : " "  }</p>
                      
                      <p><b>Raw Material Supplier : </b>
                      {rawName} 
                      </p>
                      <p><b>Warehouse Address : </b> 
                      {batchRecord && batchRecord.itemState == 0 ? "Not Added" :wareName} 
                      </p>
                      <p><b>Factory Address : </b> 
                      {batchRecord && batchRecord.itemState == 0 ? "Not Added" : factName}
                      </p>
                      {/* <p><b>Polyster Amount : </b> {ogBatchRecord && ogBatchRecord.OGPolyesterAmount.toNumber()}</p>
                      <p><b>Cotton Amount : </b> {ogBatchRecord && ogBatchRecord.OGCottonAmount.toNumber()}</p>
                      <p><b>Wool Amount : </b> {ogBatchRecord && ogBatchRecord.OGWoolAmount.toNumber()}</p>
                      <p><b>Quality Check Polyster Amount : </b> {batchRecord && batchRecord.PolyesterAmount.toNumber() == 0 ? "Not Checked":batchRecord && batchRecord.PolyesterAmount.toNumber() }</p>
                      <p><b>Quality Check Cotton Amount : </b> {batchRecord && batchRecord.CottonAmount.toNumber() == 0 ? "Not Checked":batchRecord && batchRecord.CottonAmount.toNumber()}</p>
                      <p><b>Quality Check Wool Amount : </b> {batchRecord && batchRecord.WoolAmount.toNumber()== 0 ? "Not Checked":batchRecord && batchRecord.WoolAmount.toNumber()}</p>
                      <p><b>Garbage Polyster Amount : </b>{batchRecord && batchRecord.PolyesterAmount.toNumber()== 0 ? "Not Checked":garbagePolyesterAmount}</p>
                      <p><b>Garbage Cotton Amount : </b> {batchRecord && batchRecord.CottonAmount.toNumber()== 0 ? "Not Checked":garbageCottonAmount}</p>
                      <p><b>Garbage Wool Amount : </b> {batchRecord && batchRecord.WoolAmount.toNumber()== 0 ? "Not Checked":garbageWoolAmount}</p> */}
                    </>
                  </Card.Text>
                  <Card.Text style={{ width: '50%', float: 'left' }}>
                    <>
                    { rawcreatedday && rawcreatedday !== " " ?  <p><b>Buy Raw Material Date : </b>{rawcreatedday}-{rawcreatemonth}-{rawcreatedyear}</p>:<p></p> }
                    { spinningcreatedday && spinningcreatedday !== " " ?  <p><b>Spinning Date : </b>{spinningcreatedday}-{spinningcreatemonth}-{spinningcreatedyear}</p>:<p></p> }
                    { manufactureGarmentday && manufactureGarmentday !== " " ?  <p><b>Manufacture Date : </b>{manufactureGarmentday}-{manufactureGarmentmonth}-{manufactureGarmentyear}</p>:<p></p> }
                    { sellitemday && sellitemday !== " " ?  <p><b>Factory Sell Date : </b>{sellitemday}-{sellitemmonth}-{sellitemyear}</p>: <p></p> }

                    { rawlocation && rawlocation !== " " ?  <p><b>Raw Material Location : </b>{rawlocation}</p>:<p></p> }
                    { warelocation && warelocation !== " " ?  <p><b>Warehouse Location  : </b>{warelocation}</p>:<p></p> }
                    { factlocation && factlocation !== " " ?  <p><b>Factory Location  : </b>{factlocation}</p>:<p></p> }
                      <p><b>Buy Raw Material Status : </b>{batchRecord && batchRecord.itemState == 0 ?<PendingContinue path= {'/BuyRawMaterial'} data={data.state.i}/> :<Button variant="outline-success">Completed</Button> }</p>
                      <p><b>Available Raw Material Quality Check Status : </b>{batchRecord && batchRecord.itemState == 0 || batchRecord && batchRecord.itemState == 1 ?<PendingContinue path= {'/BuyRawMaterial'} data={data.state.i}/> :<Button variant="outline-success">Completed</Button> }</p>
                      <p><b>Spinning Weaving Status : </b> {batchRecord && batchRecord.itemState == 0 || batchRecord && batchRecord.itemState == 1 || batchRecord && batchRecord.itemState == 2 ?<PendingContinue path= {'/garmentBatchCompleteForm'} data={data.state.i}/> :<Button variant="outline-success">Completed</Button> }</p>
                      <p><b>Manufacture Garment Status : </b> {batchRecord && batchRecord.itemState == 0 || batchRecord && batchRecord.itemState == 1 || batchRecord && batchRecord.itemState == 2 || batchRecord && batchRecord.itemState == 3 ?<PendingContinue path= {'/garmentBatchCompleteForm'} data={data.state.i}/> :<Button variant="outline-success">Completed</Button> }</p>
                      <p><b>Available Sell Item Quality Check : </b> {batchRecord && batchRecord.itemState == 0 || batchRecord && batchRecord.itemState == 1 || batchRecord && batchRecord.itemState == 2 || batchRecord && batchRecord.itemState == 3 || batchRecord && batchRecord.itemState == 4 ?<PendingContinue path= {'/garmentBatchCompleteForm'} data={data.state.i}/> :<Button variant="outline-success">Completed</Button> }</p>
                      <p><b>Sell Item Status : </b>  {batchRecord && batchRecord.itemState == 0 || batchRecord && batchRecord.itemState == 1 || batchRecord && batchRecord.itemState == 2 || batchRecord && batchRecord.itemState == 3 || batchRecord && batchRecord.itemState == 4 || batchRecord && batchRecord.itemState == 5 ?<PendingContinue path= {'/SellItemFormData'} data={data.state.i} /> :<Button variant="outline-success">Completed</Button> }</p>                      
                    </>
                  </Card.Text>
                </Card.Body>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export default ViewBatchStatusTable
