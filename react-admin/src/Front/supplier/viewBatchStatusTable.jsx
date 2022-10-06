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
  let rawMaterial1AfterQC = 0;
  let rawMaterial2AfterQC = 0;
  let rawMaterial3AfterQC = 0;
  let rawMaterial4AfterQC = 0;
  let rawMaterial5AfterQC = 0;

  let factorybuyrawMaterial1 = 0;
  let factorybuyrawMaterial2 = 0;
  let factorybuyrawMaterial3 = 0;
  let factorybuyrawMaterial4 = 0;
  let factorybuyrawMaterial5 = 0;

  let rawMaterial1Garbage = 0;
  let rawMaterial2Garbage = 0;
  let rawMaterial3Garbage = 0;
  let rawMaterial4Garbage = 0;
  let rawMaterial5Garbage = 0;
  

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

  const [totalrawMaterial1AfterQC, setTotalrawMaterial1AfterQC] = useState();
  const [totalrawMaterial2AfterQC, setTotalrawMaterial2AfterQC] = useState();
  const [totalrawMaterial3AfterQC, setTotalrawMaterial3AfterQC] = useState();
  const [totalrawMaterial4AfterQC, setTotalrawMaterial4AfterQC] = useState();
  const [totalrawMaterial5AfterQC, setTotalrawMaterial5AfterQC] = useState();


  const [totalfactorybuyrawMaterial1, setTotalfactorybuyrawMaterial1] = useState();
  const [totalfactorybuyrawMaterial2, setTotalfactorybuyrawMaterial2] = useState();
  const [totalfactorybuyrawMaterial3, setTotalfactorybuyrawMaterial3] = useState();
  const [totalfactorybuyrawMaterial4, setTotalfactorybuyrawMaterial4] = useState();
  const [totalfactorybuyrawMaterial5, setTotalfactorybuyrawMaterial5] = useState();

  const [totalrawMaterial1Garbage, setTotalrawMaterial1Garbage] = useState();
  const [totalrawMaterial2Garbage, setTotalrawMaterial2Garbage] = useState();
  const [totalrawMaterial3Garbage, setTotalrawMaterial3Garbage] = useState();
  const [totalrawMaterial4Garbage, setTotalrawMaterial4Garbage] = useState();
  const [totalrawMaterial5Garbage, setTotalrawMaterial5Garbage] = useState();

  

  



  const [afterQCrawMaterial1, setafterQCrawMaterial1] = useState();
  const [afterQCrawMaterial2, setafterQCrawMaterial2] = useState();
  const [afterQCrawMaterial3, setafterQCrawMaterial3] = useState();
  const [afterQCrawMaterial4, setafterQCrawMaterial4] = useState();
  const [afterQCrawMaterial5, setafterQCrawMaterial5] = useState();

  const [createdhourRecord, setcreatedhourRecord] = useState();
  const [createdminuteRecord, setcreatedminuteRecord] = useState();
  const [createdsecondRecord, setcreatedsecondRecord] = useState();

  const [createddayRecord, setcreateddayRecord] = useState();
  const [createmonthRecord, setcreatemonthRecord] = useState();
  const [createdyearRecord, setcreatedyearRecord] = useState();

  const [supplyCreatedhourRecord, setSupplyCreatedhourRecord] = useState();
  const [supplyCreatedminuteRecord, setSupplyCreatedminuteRecord] = useState();
  const [supplyCreatedsecondRecord, setSupplyCreatedsecondRecord] = useState();

  const [supplyCreateddayRecord, setSupplyCreateddayRecord] = useState();
  const [supplyCreatemonthRecord, setSupplyCreatemonthRecord] = useState();
  const [supplyCreatedyearRecord, setSupplyCreatedyearRecord] = useState();

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

    //console.log("viewBatchRecord", viewBatchRecord)

    let supplyCreatedhour = await dateContract.getHour(viewBatchRecord.timeStamp0.toNumber())
    let supplyCreatedminute = await dateContract.getMinute(viewBatchRecord.timeStamp0.toNumber())
    let supplyCreatedsecond = await dateContract.getSecond(viewBatchRecord.timeStamp0.toNumber())


    setSupplyCreatedhourRecord(supplyCreatedhour);
    setSupplyCreatedminuteRecord(supplyCreatedminute);
    setSupplyCreatedsecondRecord(supplyCreatedsecond);

    if (supplyCreatedhour + 5 > 24) {
      supplyCreatedhour = ((supplyCreatedhour + 5) - 24);
      setSupplyCreatedhourRecord(supplyCreatedhour);
    } else {
      supplyCreatedhour += 5;
      setSupplyCreatedhourRecord(supplyCreatedhour);

    }
    if (supplyCreatedminute + 31 > 60) {
      supplyCreatedhour++;
      supplyCreatedminute = ((supplyCreatedminute + 31) - 60);
      setSupplyCreatedminuteRecord(supplyCreatedminute);

    } else {
      supplyCreatedminute = supplyCreatedminute + 31;
      setSupplyCreatedminuteRecord(supplyCreatedminute);

    }

    setSupplyCreateddayRecord(await dateContract.getDay(viewBatchRecord.timeStamp0.toNumber()));
    setSupplyCreatemonthRecord(await dateContract.getMonth(viewBatchRecord.timeStamp0.toNumber()));
    setSupplyCreatedyearRecord(await dateContract.getYear(viewBatchRecord.timeStamp0.toNumber()));

    let j = 1;
    while (j) {
      try {
        const data = await supplyChainContract.IdToFactory(viewBatchRecord.supplyChainId.toNumber(), j - 1);
        //console.log("Factory address :", data.factory); 

        //console.log("Date at which the factory bought raw materials");
        //console.log(await dateContract.getDay(data.timeStamp1.toNumber()), await dateContract.getMonth(data.timeStamp1.toNumber()), await dateContract.getYear(data.timeStamp1.toNumber()));

        //console.log("Time which the factory bought raw materials");
        //console.log(await dateContract.getHour(data.timeStamp1.toNumber()), await dateContract.getMinute(data.timeStamp1.toNumber()), await dateContract.getSecond(data.timeStamp1.toNumber()));

        let createdhour = await dateContract.getHour(data.timeStamp1.toNumber())
        let createdminute = await dateContract.getMinute(data.timeStamp1.toNumber())
        let createdsecond = await dateContract.getSecond(data.timeStamp1.toNumber())


        setcreatedhourRecord(createdhour);
        setcreatedminuteRecord(createdminute);
        setcreatedsecondRecord(createdsecond);

        if (createdhour + 5 > 24) {
          createdhour = ((createdhour + 5) - 24);
          setcreatedhourRecord(createdhour);
        } else {
          createdhour += 5;
          setcreatedhourRecord(createdhour);

        }
        if (createdminute + 31 > 60) {
          createdhour++;
          createdminute = ((createdminute + 31) - 60);
          setcreatedminuteRecord(createdminute);

        } else {
          createdminute = createdminute + 31;
          setcreatedminuteRecord(createdminute);

        }

        setcreateddayRecord(await dateContract.getDay(data.timeStamp1.toNumber()));
        setcreatemonthRecord(await dateContract.getMonth(data.timeStamp1.toNumber()));
        setcreatedyearRecord(await dateContract.getYear(data.timeStamp1.toNumber()));

        // const data2 =await supplychain.FactoryRawMaterialsORIGIONAL(item.supplyChainId,data.factory)
        // console.log(data2);
        const factory1buyrawMaterial1DAta = await supplyChainContract.FactoryRawMaterialsORIGIONAL(viewBatchRecord.supplyChainId, data.factory);
        //console.log("factory1buyrawMaterial1DAta", factory1buyrawMaterial1DAta.rawMaterial1.toNumber())

        const rawMaterialAfterQC = await supplyChainContract.FactoryRawMaterialsAferQC(viewBatchRecord.supplyChainId, data.factory);
        //console.log("after quality control", rawMaterialAfterQC.rawMaterial1.toNumber())

        rawMaterial1AfterQC += rawMaterialAfterQC.rawMaterial1.toNumber();
        rawMaterial2AfterQC += rawMaterialAfterQC.rawMaterial2.toNumber();
        rawMaterial3AfterQC += rawMaterialAfterQC.rawMaterial3.toNumber();
        rawMaterial4AfterQC += rawMaterialAfterQC.rawMaterial4.toNumber();
        rawMaterial5AfterQC += rawMaterialAfterQC.rawMaterial5.toNumber();

        factorybuyrawMaterial1 += factory1buyrawMaterial1DAta.rawMaterial1.toNumber()
        factorybuyrawMaterial2 += factory1buyrawMaterial1DAta.rawMaterial2.toNumber()
        factorybuyrawMaterial3 += factory1buyrawMaterial1DAta.rawMaterial3.toNumber()
        factorybuyrawMaterial4 += factory1buyrawMaterial1DAta.rawMaterial4.toNumber()
        factorybuyrawMaterial5 += factory1buyrawMaterial1DAta.rawMaterial5.toNumber()
        

        let rawMaterial1GarbageData = factory1buyrawMaterial1DAta.rawMaterial1.toNumber() - rawMaterialAfterQC.rawMaterial1.toNumber();
        rawMaterial1Garbage += rawMaterial1GarbageData

        let rawMaterial2GarbageData = factory1buyrawMaterial1DAta.rawMaterial2.toNumber() - rawMaterialAfterQC.rawMaterial2.toNumber();
        rawMaterial2Garbage += rawMaterial2GarbageData

        let rawMaterial3GarbageData = factory1buyrawMaterial1DAta.rawMaterial3.toNumber() - rawMaterialAfterQC.rawMaterial3.toNumber();
        rawMaterial3Garbage += rawMaterial3GarbageData

        let rawMaterial4GarbageData = factory1buyrawMaterial1DAta.rawMaterial4.toNumber() - rawMaterialAfterQC.rawMaterial4.toNumber();
        rawMaterial4Garbage += rawMaterial4GarbageData

        let rawMaterial5GarbageData = factory1buyrawMaterial1DAta.rawMaterial5.toNumber() - rawMaterialAfterQC.rawMaterial5.toNumber();
        rawMaterial5Garbage += rawMaterial5GarbageData

        setafterQCrawMaterial1(rawMaterialAfterQC.rawMaterial1.toNumber());
        setafterQCrawMaterial2(rawMaterialAfterQC.rawMaterial2.toNumber());
        setafterQCrawMaterial3(rawMaterialAfterQC.rawMaterial3.toNumber());
        setafterQCrawMaterial4(rawMaterialAfterQC.rawMaterial4.toNumber());
        setafterQCrawMaterial5(rawMaterialAfterQC.rawMaterial5.toNumber());

        setfactory1buyrawMaterial1(factory1buyrawMaterial1DAta.rawMaterial1.toNumber());
        setfactory1buyrawMaterial2(factory1buyrawMaterial1DAta.rawMaterial2.toNumber());
        setfactory1buyrawMaterial3(factory1buyrawMaterial1DAta.rawMaterial3.toNumber());
        setfactory1buyrawMaterial4(factory1buyrawMaterial1DAta.rawMaterial4.toNumber());
        setfactory1buyrawMaterial5(factory1buyrawMaterial1DAta.rawMaterial5.toNumber());



        const factoryLocation = {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            "hashAddress": data.factory,
          })
        };
        await fetch("http://192.168.1.101:5150/location", factoryLocation)
          .then(res => res.json())
          .then(data => {
            if (data) {
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

    setTotalrawMaterial1AfterQC(rawMaterial1AfterQC)
    setTotalrawMaterial2AfterQC(rawMaterial2AfterQC)
    setTotalrawMaterial3AfterQC(rawMaterial3AfterQC)
    setTotalrawMaterial4AfterQC(rawMaterial4AfterQC)
    setTotalrawMaterial5AfterQC(rawMaterial5AfterQC)

    setTotalfactorybuyrawMaterial1(factorybuyrawMaterial1)
    setTotalfactorybuyrawMaterial2(factorybuyrawMaterial2)
    setTotalfactorybuyrawMaterial3(factorybuyrawMaterial3)
    setTotalfactorybuyrawMaterial4(factorybuyrawMaterial4)
    setTotalfactorybuyrawMaterial5(factorybuyrawMaterial5)

    setTotalrawMaterial1Garbage(rawMaterial1Garbage)
    setTotalrawMaterial2Garbage(rawMaterial2Garbage)
    setTotalrawMaterial3Garbage(rawMaterial3Garbage)
    setTotalrawMaterial4Garbage(rawMaterial4Garbage)
    setTotalrawMaterial5Garbage(rawMaterial5Garbage)

    
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
        "hashAddress": viewBatchRecord.RawMaterialSupplierID,
      })
    };

    await fetch("http://192.168.1.101:5150/location", rawmaterialLocation)
      .then(res => res.json())
      .then(data => {
        if (data) {
          setrawName(data.username)
          setrawlocation(data.location);
        }
      })
      .catch((error) => {
        console.error('Error:', error);
      });


  }
  const PendingContinue = (props) => {
    const data = props.data;
    const path = props.path;
    return (
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
                      {rawlocation && rawlocation !== " " ? <p><b>Raw Material Location : </b>{rawlocation}</p> : <p></p>}
                      {supplyCreatedhourRecord !== " " ? <p><b>Add Raw Material Date : </b>{supplyCreateddayRecord}-{supplyCreatemonthRecord}-{supplyCreatedyearRecord} {supplyCreatedhourRecord}:{supplyCreatedminuteRecord}:{supplyCreatedsecondRecord}</p> : <p></p>}
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
                {factName !== undefined ?
                  <Card.Body>
                    <Card.Text>
                      <Card.Title style={{ background: "#dedede", padding: "10px" }}>Buyer Detail</Card.Title>
                      <table>
                        {ogBatchRecord && ogBatchRecord.rawMaterialType.toNumber() == 1 ?
                          <tr>
                            <th>Factory</th>
                            <th>Location </th>
                            <th>Weight / After QC / Garbage</th>
                            <th>Fibre length (mm) / After QC / Garbage</th>
                            <th>Fibre Strength (g/T) / After QC / Garbage</th>
                            <th>Mike(mm) / After QC / Garbage</th>
                            <th>FQI (Rd) / After QC / Garbage</th>
                            <th>Buy Date</th>
                          </tr> : ''}
                        {ogBatchRecord && ogBatchRecord.rawMaterialType.toNumber() == 2 ?
                          <tr>
                            <th>Factory</th>
                            <th>Location </th>
                            <th>FMax (kN) / After QC / Garbage</th>
                            <th>EMax (%) / After QC / Garbage</th>
                            <th>Neps (%) / After QC / Garbage</th>
                            <th>Mike(mm) / After QC / Garbage</th>
                            <th>Buy Date</th>
                          </tr> : ''}
                        {ogBatchRecord && ogBatchRecord.rawMaterialType.toNumber() == 3 ?
                          <tr>
                            <th>Factory</th>
                            <th>Location </th>
                            <th>Fibre diameter or Grade (mm) / After QC / Garbage</th>
                            <th>Staple length (mm) / After QC / Garbage</th>
                            <th>Fibre length (mm) / After QC / Garbage</th>
                            <th>Crimpiness (cm) / After QC / Garbage</th>
                            <th>Buy Date</th>
                          </tr> : ''}
                        <tr>
                          <td>{factName && factName ? factName : ''}</td>
                          <td>{factlocation && factlocation !== " " ? <span>{factlocation}</span> : <span></span>}</td>
                          <td>{factory1buyrawMaterial1 && factory1buyrawMaterial1} / {afterQCrawMaterial1 && afterQCrawMaterial1} / {factory1buyrawMaterial1 - afterQCrawMaterial1}</td>
                          <td>{factory1buyrawMaterial2 && factory1buyrawMaterial2} / {afterQCrawMaterial2 && afterQCrawMaterial2} / {factory1buyrawMaterial2 - afterQCrawMaterial2}</td>
                          <td>{factory1buyrawMaterial3 && factory1buyrawMaterial3} / {afterQCrawMaterial3 && afterQCrawMaterial3} / {factory1buyrawMaterial3 - afterQCrawMaterial3}</td>
                          <td>{factory1buyrawMaterial4 && factory1buyrawMaterial4} / {afterQCrawMaterial4 && afterQCrawMaterial4} / {factory1buyrawMaterial4 - afterQCrawMaterial4}</td>
                          {ogBatchRecord && ogBatchRecord.rawMaterialType.toNumber() == 1 ?
                            <td>{factory1buyrawMaterial5 && factory1buyrawMaterial5} / {afterQCrawMaterial5 && afterQCrawMaterial5} / {factory1buyrawMaterial5 - afterQCrawMaterial5}</td> : ''}
                          <td>{createddayRecord}-{createmonthRecord}-{createdyearRecord} {createdhourRecord}:{createdminuteRecord}:{createdsecondRecord}</td>
                        </tr>
                        <tr className='totalCalculation'>
                          <td colSpan={2}>Total</td>
                          <td>{totalfactorybuyrawMaterial1 && totalfactorybuyrawMaterial1} / {totalrawMaterial1AfterQC && totalrawMaterial1AfterQC} / {totalrawMaterial1Garbage && totalrawMaterial1Garbage}</td>
                          <td>{totalfactorybuyrawMaterial2 && totalfactorybuyrawMaterial2} / {totalrawMaterial2AfterQC && totalrawMaterial2AfterQC} / {totalrawMaterial2Garbage && totalrawMaterial2Garbage}</td>
                          <td>{totalfactorybuyrawMaterial3 && totalfactorybuyrawMaterial3} / {totalrawMaterial3AfterQC && totalrawMaterial3AfterQC} / {totalrawMaterial3Garbage && totalrawMaterial3Garbage}</td>
                          <td>{totalfactorybuyrawMaterial4 && totalfactorybuyrawMaterial4} / {totalrawMaterial4AfterQC && totalrawMaterial4AfterQC} / {totalrawMaterial4Garbage && totalrawMaterial4Garbage}</td>
                          {ogBatchRecord && ogBatchRecord.rawMaterialType.toNumber() == 1 ?
                          <td>{totalfactorybuyrawMaterial5 && totalfactorybuyrawMaterial5} / {totalrawMaterial5AfterQC && totalrawMaterial5AfterQC} / {totalrawMaterial5Garbage && totalrawMaterial5Garbage}</td>
                          : ''}
                        </tr>
                      </table>
                    </Card.Text>
                  </Card.Body> : ''}
              </Card>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export default ViewBatchStatusTable
