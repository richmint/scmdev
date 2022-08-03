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
  //console.log("data record", data.state.i);
  const navigate = useNavigate();
  const { dispatch, metaMask, supplyChainContract, supplyChainTokenContract, ownSupplyChainAddress, dateContract } = useContext(DarkModeContext);
  useEffect(() => {
    getSupplyChainHandler();
  }, []);
  //console.log("date contract",dateContract);
  const [batchRecord, setbatchRecord] = useState();
  const [ogBatchRecord, setogBatchRecord] = useState();
  const [garbagePolyesterAmount, setgarbagePolyesterAmount] = useState();
  const [garbageCottonAmount, setgarbageCottonAmount] = useState();
  const [garbageWoolAmount, setgarbageWoolAmount] = useState();
  
  const [createdday, setcreatedday] = useState();
  const [createmonth, setcreatemonth] = useState();
  const [createdyear, setcreatedyear] = useState(); 
  
  const getSupplyChainHandler = async (event) => {
    console.log("supplyChainContract ", supplyChainContract)
    const viewBatchRecord = await supplyChainContract.items(data.state.i);
    setbatchRecord(viewBatchRecord);

    let OGViewBatchRecord = await supplyChainContract.OGDetails(viewBatchRecord.supplyChainId);
    setogBatchRecord(OGViewBatchRecord)

    console.log("sdsdf",viewBatchRecord);

    const dateObject =await supplyChainContract.timeStamps(data.state.i,viewBatchRecord.itemState);

    const createdday = await dateContract.getDay(dateObject.toNumber())
    setcreatedday(createdday)
    const createmonth = await dateContract.getMonth(dateObject.toNumber())
    setcreatemonth(createmonth)
    const createdyear = await dateContract.getYear(dateObject.toNumber())
    setcreatedyear(createdyear)

    const garbagePolAmount = OGViewBatchRecord.OGPolyesterAmount.toNumber() - viewBatchRecord.PolyesterAmount.toNumber() 
    setgarbagePolyesterAmount(garbagePolAmount)
    const garbageCottonAmount = OGViewBatchRecord.OGCottonAmount.toNumber() - viewBatchRecord.CottonAmount.toNumber() 
    setgarbageCottonAmount(garbageCottonAmount)
    const garbageWAmount = OGViewBatchRecord.OGWoolAmount.toNumber() - viewBatchRecord.WoolAmount.toNumber() 
    setgarbageWoolAmount(garbageWAmount)
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
    //console.log("date rec   ", ogBatchRecord);
    // console.log("date day",createdday);
    // console.log("date month",createmonth);
    // console.log("date year",createdyear);
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
                      <p><b>Raw Material Supplier : </b> {batchRecord && batchRecord.RawMaterialSupplierID}</p>
                      <p><b>Warehouse Address : </b> {batchRecord && batchRecord.itemState == 0 ? "Not Added" :batchRecord && batchRecord.warehouseID}</p>
                      <p><b>Factory Address : </b> {batchRecord && batchRecord.itemState == 0 ? "Not Added" : batchRecord && batchRecord.factoryID}</p>
                      <p><b>Polyster Amount : </b> {ogBatchRecord && ogBatchRecord.OGPolyesterAmount.toNumber()}</p>
                      <p><b>Cotton Amount : </b> {ogBatchRecord && ogBatchRecord.OGCottonAmount.toNumber()}</p>
                      <p><b>Wool Amount : </b> {ogBatchRecord && ogBatchRecord.OGWoolAmount.toNumber()}</p>
                      <p><b>Quality Check Polyster Amount : </b> {batchRecord && batchRecord.PolyesterAmount.toNumber() == 0 ? "Not Checked":batchRecord && batchRecord.PolyesterAmount.toNumber()}</p>
                      <p><b>Quality Check Cotton Amount : </b> {batchRecord && batchRecord.CottonAmount.toNumber() == 0 ? "Not Checked":batchRecord && batchRecord.CottonAmount.toNumber()}</p>
                      <p><b>Quality Check Wool Amount : </b> {batchRecord && batchRecord.WoolAmount.toNumber()== 0 ? "Not Checked":batchRecord && batchRecord.WoolAmount.toNumber()}</p>
                      <p><b>Garbage Polyster Amount : </b>{batchRecord && batchRecord.PolyesterAmount.toNumber()== 0 ? "Not Checked":garbagePolyesterAmount}</p>
                      <p><b>Garbage Cotton Amount : </b> {batchRecord && batchRecord.CottonAmount.toNumber()== 0 ? "Not Checked":garbageCottonAmount}</p>
                      <p><b>Garbage Wool Amount : </b> {batchRecord && batchRecord.WoolAmount.toNumber()== 0 ? "Not Checked":garbageWoolAmount}</p>
                    </>
                  </Card.Text>
                  <Card.Text style={{ width: '50%', float: 'left' }}>
                    <>
                      <p><b>Date : </b>{createdday}-{createmonth}-{createdyear}</p>
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
