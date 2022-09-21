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
  const [remainingBatchRecord, setRemainingBatchRecord] = useState();

  
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

  const [createdhourRecord, setcreatedhourRecord] = useState();
  const [createdminuteRecord, setcreatedminuteRecord] = useState();
  const [createdsecondRecord, setcreatedsecondRecord] = useState();
 
  const [createddayRecord, setcreateddayRecord] = useState();
  const [createmonthRecord, setcreatemonthRecord] = useState();
  const [createdyearRecord, setcreatedyearRecord] = useState();
  
 

  const [factory3buyrawMaterial2, setfactory3buyrawMaterial2] = useState();
  const [factory3buyrawMaterial3, setfactory3buyrawMaterial3] = useState();
  const [factory3buyrawMaterial4, setfactory3buyrawMaterial4] = useState();
  const [factory3buyrawMaterial5, setfactory3buyrawMaterial5] = useState();

  const getSupplyChainHandler = async (event) => {
    const viewBatchRecord = await supplyChainContract.items(data.state.id);
    setbatchRecord(viewBatchRecord);


    let OGViewBatchRecord = await supplyChainContract.RawMaterialDetails(viewBatchRecord.supplyChainId);
    setogBatchRecord(OGViewBatchRecord)

    let remainingBatchData = await supplyChainContract.RawMaterialSupplierRawMaterial(viewBatchRecord.supplyChainId);
    setRemainingBatchRecord(remainingBatchData)



    let j=1;
    while(j){
      try {          
        const data =await supplyChainContract.IdToFactory(viewBatchRecord.supplyChainId.toNumber(),j-1);
        //console.log("dasdasdas",data);
        //console.log("Factory address :", data.factory); 

        console.log("Date at which the factory bought raw materials");
        console.log(await dateContract.getDay(data.timeStamp1.toNumber()),await dateContract.getMonth(data.timeStamp1.toNumber()),await dateContract.getYear(data.timeStamp1.toNumber()));
                
        console.log("Time which the factory bought raw materials"); 
        console.log(await dateContract.getHour(data.timeStamp1.toNumber()),await dateContract.getMinute(data.timeStamp1.toNumber()),await dateContract.getSecond(data.timeStamp1.toNumber()));
        

        let createdhour = await dateContract.getHour(data.timeStamp1.toNumber())
        let createdminute = await dateContract.getMinute(data.timeStamp1.toNumber())
        let createdsecond = await dateContract.getSecond(data.timeStamp1.toNumber())

        setcreatedhourRecord(createdhour);
        setcreatedminuteRecord(createdminute);
        setcreatedsecondRecord(createdsecond);

          if(createdhour+5>24){ 
            createdhour = ((createdhour+5) -24);
            setcreatedhourRecord(createdhour);
                }else{
                  createdhour +=5;
                  setcreatedhourRecord(createdhour);

                }
                if(createdminute+35> 60){
                  createdhour++;
                  createdminute = ((createdminute+35)-60);
                  setcreatedminuteRecord(createdminute);

                }else{
                  createdminute=createdminute+35;
                  setcreatedminuteRecord(createdminute);

                }

          setcreateddayRecord(await dateContract.getDay(data.timeStamp1.toNumber()));
          setcreatemonthRecord(await dateContract.getMonth(data.timeStamp1.toNumber()));
          setcreatedyearRecord(await dateContract.getYear(data.timeStamp1.toNumber()));

        // const data2 =await supplychain.FactoryRawMaterialsORIGIONAL(item.supplyChainId,data.factory)
        // console.log(data2);
        const factory1buyrawMaterial1DAta = await supplyChainContract.FactoryRawMaterialsORIGIONAL(viewBatchRecord.supplyChainId,data.factory);
          setfactory1buyrawMaterial1(factory1buyrawMaterial1DAta.rawMaterial1.toNumber());
          setfactory1buyrawMaterial2(factory1buyrawMaterial1DAta.rawMaterial2.toNumber());
          setfactory1buyrawMaterial3(factory1buyrawMaterial1DAta.rawMaterial3.toNumber());
          setfactory1buyrawMaterial4(factory1buyrawMaterial1DAta.rawMaterial4.toNumber());
          setfactory1buyrawMaterial5(factory1buyrawMaterial1DAta.rawMaterial5.toNumber());

          const factoryLocation = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({       
              "hashAddress":data.factory,       
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

        j++;
      } catch (error) {
        break;
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
                  <Card.Text style={{ width: '30%', float: 'left' }}>
                    <>
                      <p><b>Batch ID : </b>{data.state.id}</p>
                      <p><b>Raw Material Supplier : </b>{rawName} </p>
                      { rawlocation && rawlocation !== " " ?  <p><b>Raw Material Location : </b>{rawlocation}</p>:<p></p> }
                      { rawcreatedday && rawcreatedday !== " " ?  <p><b>Add Raw Material Date : </b>{rawcreatedday}-{rawcreatemonth}-{rawcreatedyear}</p>:<p></p> }
                      {/* { rawcreatedday && rawcreatedday !== " " ?  <p><b>Buy Raw Material Date : </b>{rawcreatedday}-{rawcreatemonth}-{rawcreatedyear}</p>:<p></p> } */}
                      {/* <p><b>Buy Raw Material Status : </b>{batchRecord && batchRecord.itemState == 0 ?<PendingContinue path= {'/BuyRawMaterial'} data={data.state.id}/> :<Button variant="outline-success">Completed</Button> }</p> */}
                      {/* <p><b>Quality Check Polyster Amount : </b> {ogBatchRecord && ogBatchRecord.rawMaterial1.toNumber() == 0 ? "Not Checked":batchRecord && batchRecord.PolyesterAmount.toNumber() }</p>
                      <p><b>Quality Check Cotton Amount : </b> {batchRecord && batchRecord.rawMaterial1.toNumber() == 0 ? "Not Checked":batchRecord && batchRecord.CottonAmount.toNumber()}</p>
                      <p><b>Quality Check Wool Amount : </b> {batchRecord && batchRecord.rawMaterial1.toNumber()== 0 ? "Not Checked":batchRecord && batchRecord.WoolAmount.toNumber()}</p>
                      <p><b>Garbage Polyster Amount : </b>{batchRecord && batchRecord.rawMaterial1.toNumber()== 0 ? "Not Checked":garbagePolyesterAmount}</p>
                      <p><b>Garbage Cotton Amount : </b> {batchRecord && batchRecord.rawMaterial1.toNumber()== 0 ? "Not Checked":garbageCottonAmount}</p>
                      <p><b>Garbage Wool Amount : </b> {batchRecord && batchRecord.rawMaterial1.toNumber()== 0 ? "Not Checked":garbageWoolAmount}</p> */}
                    </>
                  </Card.Text>
                  
                  <Card.Text style={{ width: '30%', float: 'left' }}>
                  <Card.Title>Remaining Raw Material</Card.Title>
                  {ogBatchRecord && ogBatchRecord.rawMaterialType.toNumber() == 1 ?
                    <>
                    <p><b>Weight	:</b> {remainingBatchRecord && remainingBatchRecord.rawMaterial1.toNumber()}</p>
                    <p><b>Fibre length (mm) :</b> {remainingBatchRecord && remainingBatchRecord.rawMaterial2.toNumber()}</p>
                    <p><b>Fibre Strength (g/T) :</b> {remainingBatchRecord && remainingBatchRecord.rawMaterial3.toNumber()}</p>
                    <p><b>Mike(mm) :</b> {remainingBatchRecord && remainingBatchRecord.rawMaterial4.toNumber()}</p>
                    <p><b>FQI (Rd) :</b> {remainingBatchRecord && remainingBatchRecord.rawMaterial5.toNumber()}</p> 
                    </>
                    : ''}
                    {ogBatchRecord && ogBatchRecord.rawMaterialType.toNumber() == 2 ?
                    <>
                    <p><b>FMax (kN)	:</b> {remainingBatchRecord && remainingBatchRecord.rawMaterial1.toNumber()}</p>
                    <p><b>EMax (%) :</b> {remainingBatchRecord && remainingBatchRecord.rawMaterial2.toNumber()}</p>
                    <p><b>Neps (%) :</b> {remainingBatchRecord && remainingBatchRecord.rawMaterial3.toNumber()}</p>
                    <p><b>Cvm (%) :</b> {remainingBatchRecord && remainingBatchRecord.rawMaterial4.toNumber()}</p>
                    </>
                    : ''}
                    {ogBatchRecord && ogBatchRecord.rawMaterialType.toNumber() == 3 ?
                    <>
                    <p><b>Fibre diameter or Grade (mm)	:</b> {remainingBatchRecord && remainingBatchRecord.rawMaterial1.toNumber()}</p>
                    <p><b>Staple length (mm) :</b> {remainingBatchRecord && remainingBatchRecord.rawMaterial2.toNumber()}</p>
                    <p><b>Fibre length (mm) :</b> {remainingBatchRecord && remainingBatchRecord.rawMaterial3.toNumber()}</p>
                    <p><b>Crimpiness (cm) :</b> {remainingBatchRecord && remainingBatchRecord.rawMaterial4.toNumber()}</p>
                    </>
                    : ''}
                  </Card.Text>
                  <Card.Text style={{ width: '30%', float: 'left' }}>
                  <Card.Title>Total Raw Material</Card.Title>
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
                          <th>Date</th>
                        </tr> : ''}
                        {ogBatchRecord && ogBatchRecord.rawMaterialType.toNumber() == 2 ?
                        <tr>
                        <th>Factory</th>
                          <th>Location </th>
                          <th>FMax (kN)</th>
                          <th>EMax (%)</th>
                          <th>Neps (%)</th>
                          <th>Mike(mm)</th>
                          <th>Date</th>
                        </tr> : ''}
                        {ogBatchRecord && ogBatchRecord.rawMaterialType.toNumber() == 3 ?
                        <tr>
                        <th>Factory</th>
                          <th>Location </th>
                          <th>Fibre diameter or Grade (mm)</th>
                          <th>Staple length (mm)</th>
                          <th>Fibre length (mm)</th>
                          <th>Crimpiness (cm)</th>
                          <th>Date</th>
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
                           <td>{createddayRecord}-{createmonthRecord}-{createdyearRecord} {createdhourRecord}:{createdminuteRecord}:{createdsecondRecord}</td>
                        </tr>
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
