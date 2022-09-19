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
  const [factlocation2, setfactlocation2] = useState();
  const [factlocation3, setfactlocation3] = useState();

  const [rawName, setrawName] = useState();
  const [wareName, setwareName] = useState();
  const [factName, setfactName] = useState();
  const [factName2, setfactName2] = useState();
  const [factName3, setfactName3] = useState();

  const [factory1buyrawMaterial1, setfactory1buyrawMaterial1] = useState();
  const [factory1buyrawMaterial2, setfactory1buyrawMaterial2] = useState();
  const [factory1buyrawMaterial3, setfactory1buyrawMaterial3] = useState();
  const [factory1buyrawMaterial4, setfactory1buyrawMaterial4] = useState();
  const [factory1buyrawMaterial5, setfactory1buyrawMaterial5] = useState();
  const [factory2buyrawMaterial1, setfactory2buyrawMaterial1] = useState();
  const [factory2buyrawMaterial2, setfactory2buyrawMaterial2] = useState();
  const [factory2buyrawMaterial3, setfactory2buyrawMaterial3] = useState();
  const [factory2buyrawMaterial4, setfactory2buyrawMaterial4] = useState();
  const [factory2buyrawMaterial5, setfactory2buyrawMaterial5] = useState();
  const [factory3buyrawMaterial1, setfactory3buyrawMaterial1] = useState();
  const [factory3buyrawMaterial2, setfactory3buyrawMaterial2] = useState();
  const [factory3buyrawMaterial3, setfactory3buyrawMaterial3] = useState();
  const [factory3buyrawMaterial4, setfactory3buyrawMaterial4] = useState();
  const [factory3buyrawMaterial5, setfactory3buyrawMaterial5] = useState();

  const getSupplyChainHandler = async (event) => {
    const viewBatchRecord = await supplyChainContract.items(data.state.id);
    setbatchRecord(viewBatchRecord);


    let OGViewBatchRecord = await supplyChainContract.RawMaterialDetails(viewBatchRecord.supplyChainId);
    setogBatchRecord(OGViewBatchRecord)


    if(viewBatchRecord.factoryID1 != 0x0000000000000000000000000000000000000000){

    const factory1rawMaterial1 = await supplyChainContract.RawMaterialsBoughtByFactory(viewBatchRecord.factoryID1.toLowerCase(),viewBatchRecord.supplyChainId,0);   
    const factory1rawMaterial2 = await supplyChainContract.RawMaterialsBoughtByFactory(viewBatchRecord.factoryID1.toLowerCase(),viewBatchRecord.supplyChainId,1);   
    const factory1rawMaterial3 = await supplyChainContract.RawMaterialsBoughtByFactory(viewBatchRecord.factoryID1.toLowerCase(),viewBatchRecord.supplyChainId,2);   
    const factory1rawMaterial4 = await supplyChainContract.RawMaterialsBoughtByFactory(viewBatchRecord.factoryID1.toLowerCase(),viewBatchRecord.supplyChainId,3);   
    const factory1rawMaterial5 = await supplyChainContract.RawMaterialsBoughtByFactory(viewBatchRecord.factoryID1.toLowerCase(),viewBatchRecord.supplyChainId,4);
    setfactory1buyrawMaterial1(factory1rawMaterial1.toNumber());
    setfactory1buyrawMaterial2(factory1rawMaterial2.toNumber());
    setfactory1buyrawMaterial3(factory1rawMaterial3.toNumber());
    setfactory1buyrawMaterial4(factory1rawMaterial4.toNumber());
    setfactory1buyrawMaterial5(factory1rawMaterial5.toNumber());

    }
    if(viewBatchRecord.factoryID2 != 0x0000000000000000000000000000000000000000){

    const factory2rawMaterial1 = await supplyChainContract.RawMaterialsBoughtByFactory(viewBatchRecord.factoryID2.toLowerCase(),viewBatchRecord.supplyChainId,0);   
    const factory2rawMaterial2 = await supplyChainContract.RawMaterialsBoughtByFactory(viewBatchRecord.factoryID2.toLowerCase(),viewBatchRecord.supplyChainId,1);   
    const factory2rawMaterial3 = await supplyChainContract.RawMaterialsBoughtByFactory(viewBatchRecord.factoryID2.toLowerCase(),viewBatchRecord.supplyChainId,2);   
    const factory2rawMaterial4 = await supplyChainContract.RawMaterialsBoughtByFactory(viewBatchRecord.factoryID2.toLowerCase(),viewBatchRecord.supplyChainId,3);   
    const factory2rawMaterial5 = await supplyChainContract.RawMaterialsBoughtByFactory(viewBatchRecord.factoryID2.toLowerCase(),viewBatchRecord.supplyChainId,4);
    setfactory2buyrawMaterial1(factory2rawMaterial1);
    setfactory2buyrawMaterial2(factory2rawMaterial2);
    setfactory2buyrawMaterial3(factory2rawMaterial3);
    setfactory2buyrawMaterial4(factory2rawMaterial4);
    setfactory2buyrawMaterial5(factory2rawMaterial5);
    }
    if(viewBatchRecord.factoryID3 != 0x0000000000000000000000000000000000000000){

    const factory3rawMaterial1 = await supplyChainContract.RawMaterialsBoughtByFactory(viewBatchRecord.factoryID3.toLowerCase(),viewBatchRecord.supplyChainId,0);   
    const factory3rawMaterial2 = await supplyChainContract.RawMaterialsBoughtByFactory(viewBatchRecord.factoryID3.toLowerCase(),viewBatchRecord.supplyChainId,1);   
    const factory3rawMaterial3 = await supplyChainContract.RawMaterialsBoughtByFactory(viewBatchRecord.factoryID3.toLowerCase(),viewBatchRecord.supplyChainId,2);   
    const factory3rawMaterial4 = await supplyChainContract.RawMaterialsBoughtByFactory(viewBatchRecord.factoryID3.toLowerCase(),viewBatchRecord.supplyChainId,3);   
    const factory3rawMaterial5 = await supplyChainContract.RawMaterialsBoughtByFactory(viewBatchRecord.factoryID3.toLowerCase(),viewBatchRecord.supplyChainId,4);
    setfactory3buyrawMaterial1(factory3rawMaterial1);
    setfactory3buyrawMaterial2(factory3rawMaterial2);
    setfactory3buyrawMaterial3(factory3rawMaterial3);
    setfactory3buyrawMaterial4(factory3rawMaterial4);
    setfactory3buyrawMaterial5(factory3rawMaterial5);
    }

    for (let i = 0; i < viewBatchRecord.itemState; i++) {
      const dateObjectrec =await supplyChainContract.timeStamps(data.state.id,i);
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
  
     await fetch("http://162.215.222.118:5150/location",rawmaterialLocation)    
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

      const factoryLocation = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({       
          "hashAddress":viewBatchRecord.factoryID1,       
          })
      };
      await fetch("http://162.215.222.118:5150/location",factoryLocation)    
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
      if(viewBatchRecord.factoryID2 != 0x0000000000000000000000000000000000000000){
        const factoryLocation2 = {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({       
            "hashAddress":viewBatchRecord.factoryID2,       
            })
        };
        await fetch("http://162.215.222.118:5150/location",factoryLocation2)    
        .then(res => res.json())
        .then(data => {
          if(data){
            setfactName2(data.username);
            setfactlocation2(data.location);
          }
        })
        .catch((error) => {
          console.error('Error:', error);
        });
      }else if(viewBatchRecord.factoryID3 != 0x0000000000000000000000000000000000000000){
        const factoryLocation3 = {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({       
            "hashAddress":viewBatchRecord.factoryID3,       
            })
        };
        await fetch("http://162.215.222.118:5150/location",factoryLocation3)    
        .then(res => res.json())
        .then(data => {
          if(data){
            setfactName3(data.username);
            setfactlocation3(data.location);
          }
        })
        .catch((error) => {
          console.error('Error:', error);
        });
      }
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
                  <Card.Title>Raw Material Detail</Card.Title>
                  <Card.Text style={{ width: '50%', float: 'left' }}>
                    <>
                      <p><b>Batch ID : </b>{data.state.id}</p>
                      <p><b>Raw Material Supplier : </b>{rawName} </p>
                      { rawlocation && rawlocation !== " " ?  <p><b>Raw Material Location : </b>{rawlocation}</p>:<p></p> }
                      { rawcreatedday && rawcreatedday !== " " ?  <p><b>Add Raw Material Date : </b>{rawcreatedday}-{rawcreatemonth}-{rawcreatedyear}</p>:<p></p> }
                      {/* { rawcreatedday && rawcreatedday !== " " ?  <p><b>Buy Raw Material Date : </b>{rawcreatedday}-{rawcreatemonth}-{rawcreatedyear}</p>:<p></p> } */}
                      <p><b>Buy Raw Material Status : </b>{batchRecord && batchRecord.itemState == 0 ?<PendingContinue path= {'/BuyRawMaterial'} data={data.state.id}/> :<Button variant="outline-success">Completed</Button> }</p>
                      {/* <p><b>Quality Check Polyster Amount : </b> {ogBatchRecord && ogBatchRecord.rawMaterial1.toNumber() == 0 ? "Not Checked":batchRecord && batchRecord.PolyesterAmount.toNumber() }</p>
                      <p><b>Quality Check Cotton Amount : </b> {batchRecord && batchRecord.rawMaterial1.toNumber() == 0 ? "Not Checked":batchRecord && batchRecord.CottonAmount.toNumber()}</p>
                      <p><b>Quality Check Wool Amount : </b> {batchRecord && batchRecord.rawMaterial1.toNumber()== 0 ? "Not Checked":batchRecord && batchRecord.WoolAmount.toNumber()}</p>
                      <p><b>Garbage Polyster Amount : </b>{batchRecord && batchRecord.rawMaterial1.toNumber()== 0 ? "Not Checked":garbagePolyesterAmount}</p>
                      <p><b>Garbage Cotton Amount : </b> {batchRecord && batchRecord.rawMaterial1.toNumber()== 0 ? "Not Checked":garbageCottonAmount}</p>
                      <p><b>Garbage Wool Amount : </b> {batchRecord && batchRecord.rawMaterial1.toNumber()== 0 ? "Not Checked":garbageWoolAmount}</p> */}
                    </>
                  </Card.Text>
                  <Card.Text style={{ width: '50%', float: 'left' }}>
                  <Card.Title>Remaining Raw Material</Card.Title>
                  {ogBatchRecord && ogBatchRecord.rawMaterialType.toNumber() == 1 ?
                    <>
                    <p><b>Weight	:</b> {ogBatchRecord && ogBatchRecord.rawMaterial1.toNumber()}</p>
                    <p><b>Fibre length (mm) :</b> {ogBatchRecord && ogBatchRecord.rawMaterial2.toNumber()}</p>
                    <p><b>Fibre Strength (g/T) :</b> {ogBatchRecord && ogBatchRecord.rawMaterial3.toNumber()}</p>
                    <p><b>Mike(mm) :</b> {ogBatchRecord && ogBatchRecord.rawMaterial4.toNumber()}</p>
                    <p><b>FQI (Rd) :</b> {ogBatchRecord && ogBatchRecord.rawMaterial5.toNumber()}</p> 
                    </>
                    : ''}
                    {ogBatchRecord && ogBatchRecord.rawMaterialType.toNumber() == 2 ?
                    <>
                    <p><b>FMax (kN)	:</b> {ogBatchRecord && ogBatchRecord.rawMaterial1.toNumber()}</p>
                    <p><b>EMax (%) :</b> {ogBatchRecord && ogBatchRecord.rawMaterial2.toNumber()}</p>
                    <p><b>Neps (%) :</b> {ogBatchRecord && ogBatchRecord.rawMaterial3.toNumber()}</p>
                    <p><b>Cvm (%) :</b> {ogBatchRecord && ogBatchRecord.rawMaterial4.toNumber()}</p>
                    </>
                    : ''}
                    {ogBatchRecord && ogBatchRecord.rawMaterialType.toNumber() == 3 ?
                    <>
                    <p><b>Fibre diameter or Grade (mm)	:</b> {ogBatchRecord && ogBatchRecord.rawMaterial1.toNumber()}</p>
                    <p><b>Staple length (mm) :</b> {ogBatchRecord && ogBatchRecord.rawMaterial2.toNumber()}</p>
                    <p><b>Fibre length (mm) :</b> {ogBatchRecord && ogBatchRecord.rawMaterial3.toNumber()}</p>
                    <p><b>Crimpiness (cm) :</b> {ogBatchRecord && ogBatchRecord.rawMaterial4.toNumber()}</p>
                    </>
                    : ''}
                  </Card.Text>
                  
                </Card.Body>
                <Card.Body>
                <Card.Text>
                  <Card.Title style={{background: "#dedede", padding: "10px"}}>Buyer Detail</Card.Title>
                      <table>
                        {ogBatchRecord && ogBatchRecord.rawMaterialType.toNumber() == 1 ?
                        <tr>
                        <th>Factory</th>
                          <th>Location </th>
                          <th>Weight</th>
                          <th>Fibre length (mm)</th>
                          <th>Fibre Strength (g/T)</th>
                          <th>Mike(mm)</th>
                          <th>FQI (Rd)</th>
                        </tr> : ''}
                        {ogBatchRecord && ogBatchRecord.rawMaterialType.toNumber() == 2 ?
                        <tr>
                        <th>Factory</th>
                          <th>Location </th>
                          <th>FMax (kN)</th>
                          <th>EMax (%)</th>
                          <th>Neps (%)</th>
                          <th>Mike(mm)</th>
                        </tr> : ''}
                        {ogBatchRecord && ogBatchRecord.rawMaterialType.toNumber() == 3 ?
                        <tr>
                        <th>Factory</th>
                          <th>Location </th>
                          <th>Fibre diameter or Grade (mm)</th>
                          <th>Staple length (mm)</th>
                          <th>Fibre length (mm)</th>
                          <th>Crimpiness (cm)</th>
                        </tr> : ''}
                        <tr> 
                          <td>{batchRecord && batchRecord.itemState == 0 ? "Not Added" : factName}</td>
                          <td>{ factlocation && factlocation !== " " ?  <span>{factlocation}</span>:<span></span> }</td>
                          <td>{factory1buyrawMaterial1 && factory1buyrawMaterial1}</td>
                          <td>{factory1buyrawMaterial2 && factory1buyrawMaterial2}</td>
                          <td>{factory1buyrawMaterial3 && factory1buyrawMaterial3}</td>
                          <td>{factory1buyrawMaterial4 && factory1buyrawMaterial4}</td>
                          {ogBatchRecord && ogBatchRecord.rawMaterialType.toNumber() == 1 ?
                          <td>{factory1buyrawMaterial5 && factory1buyrawMaterial5}</td>:''}
                        </tr>
                        {factName2 && factName2 ?
                          <tr> 
                          <td>{batchRecord && batchRecord.itemState == 0 ? "Not Added" : factName2}</td>
                          <td>{ factlocation2 && factlocation2 !== " " ?  <span>{factlocation2}</span>:<span></span> }</td>
                          <td>{factory2buyrawMaterial1 && factory2buyrawMaterial1}</td>
                          <td>{factory2buyrawMaterial2 && factory2buyrawMaterial2}</td>
                          <td>{factory2buyrawMaterial3 && factory2buyrawMaterial3}</td>
                          <td>{factory2buyrawMaterial4 && factory2buyrawMaterial4}</td>
                          {ogBatchRecord && ogBatchRecord.rawMaterialType.toNumber() == 1 ?
                          <td>{factory2buyrawMaterial5 && factory2buyrawMaterial5}</td>:''}
                        </tr> : ''}
                        {factName3 && factName3 ?
                          <tr> 
                          <td>{batchRecord && batchRecord.itemState == 0 ? "Not Added" : factName3}</td>
                          <td>{ factlocation3 && factlocation3 !== " " ?  <span>{factlocation3}</span>:<span></span> }</td>
                          <td>{factory3buyrawMaterial1 && factory3buyrawMaterial1}</td>
                          <td>{factory3buyrawMaterial2 && factory3buyrawMaterial2}</td>
                          <td>{factory3buyrawMaterial3 && factory3buyrawMaterial3}</td>
                          <td>{factory3buyrawMaterial4 && factory3buyrawMaterial4}</td>
                          {ogBatchRecord && ogBatchRecord.rawMaterialType.toNumber() == 1 ?
                          <td>{factory3buyrawMaterial5 && factory3buyrawMaterial5}</td>:''}
                        </tr> : ''}
                      </table>
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
