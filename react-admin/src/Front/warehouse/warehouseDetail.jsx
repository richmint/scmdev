import React, { useEffect, useState, useContext } from 'react';
import "../../style/front/viewSupplyTable.scss";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { DarkModeContext } from "../../context/darkModeContext";

const WarehouseDetail = () => {
  const navigate = useNavigate();
  let detailData = useLocation();

  const [materiallist, setMateriallist] = useState(null);
  const { dispatch, metaMask, supplyChainContract, ownSupplyChainAddress, dateContract } = useContext(DarkModeContext);
  const allsupplymateriallist = [];

  const [batchId, setBatchId] = useState();
  const [typerawMaterial, settyperawMaterial] = useState();


  const [createdhourRecord, setcreatedhourRecord] = useState();
  const [createdminuteRecord, setcreatedminuteRecord] = useState();
  const [createdsecondRecord, setcreatedsecondRecord] = useState();

  const [createddayRecord, setcreateddayRecord] = useState();
  const [createmonthRecord, setcreatemonthRecord] = useState();
  const [createdyearRecord, setcreatedyearRecord] = useState();

  const [warehousecreatedhourRecord, setwarehousecreatedhourRecord] = useState();
  const [warehousecreatedminuteRecord, setwarehousecreatedminuteRecord] = useState();
  const [warehousecreatedsecondRecord, setwarehousecreatedsecondRecord] = useState();

  const [warehousecreateddayRecord, setwarehousecreateddayRecord] = useState();
  const [warehousecreatemonthRecord, setwarehousecreatemonthRecord] = useState();
  const [warehousecreatedyearRecord, setwarehousecreatedyearRecord] = useState();

  


  const [rawMaterial1, setrawMaterial1] = useState();
  const [rawMaterial2, setrawMaterial2] = useState();
  const [rawMaterial3, setrawMaterial3] = useState();
  const [rawMaterial4, setrawMaterial4] = useState();
  const [rawMaterial5, setrawMaterial5] = useState();

  const [afterQCrawMaterial1, setafterQCrawMaterial1] = useState();
  const [afterQCrawMaterial2, setafterQCrawMaterial2] = useState();
  const [afterQCrawMaterial3, setafterQCrawMaterial3] = useState();
  const [afterQCrawMaterial4, setafterQCrawMaterial4] = useState();
  const [afterQCrawMaterial5, setafterQCrawMaterial5] = useState();




  const [productDescription, setproductDescription] = useState();
  const [productTotalUnits, setproductTotalUnits] = useState();
  const [producttotalUnitsAfterQC, setproducttotalUnitsAfterQC] = useState();
  const [productLeftUnits, setproductLeftUnits] = useState();
  const [factoryName, setfactoryName] = useState();
  const [factorylocation, setfactorylocation] = useState();
  const [supplierName, setsupplierName] = useState();
  const [supplierlocation, setsupplierlocation] = useState();
  const [distributerName, setdistributerName] = useState();
  const [distributerlocation, setdistributerlocation] = useState();
  const [retailerName, setretailerName] = useState();
  const [retailerlocation, setretailerlocation] = useState();

  const [customerProductBuyUnits, setcustomerProductBuyUnits] = useState();



  const getOrderHistoryHandler = async (event) => {


    // const totalBatchs =await supplyChainContract.totalBatchs()  
    // for (let i = 0; i < totalBatches; i++) {
    //   const data = await supplyChainContract.Product(i);
    //   if (data.productState == 1) {
    //     //console.log("This data is about i th product",data);
    //     // This data is about i th product



    //     let j = 1;
    //     while (j) {
    //       try {

    //         const data2 = await supplyChainContract.ProductIdToCustomer(i, j - 1);
    //         if (data2.customer.toLowerCase() == ownSupplyChainAddress.toLowerCase()) {
    //           // Details of this product
    //           // console.log("Details of this product",data); 

    //           // Details related to product and customer
    //           //console.log("Details related to product and customer",data);  

    //           setproductBatch(data.productId.toNumber())
    //           setproductDescription(data.Description)
    //           setproductTotalUnits(data.totalUnits.toNumber())
    //           setproducttotalUnitsAfterQC(data.totalUnitsAfterQC.toNumber())
    //           setproductLeftUnits(data.leftUnits.toNumber())
    //           setcustomerProductBuyUnits(data2.quantity.toNumber())


    //           const factoryRecord = {
    //             method: 'POST',
    //             headers: { 'Content-Type': 'application/json' },
    //             body: JSON.stringify({
    //               "hashAddress": data.factory,
    //             })
    //           };

    //           await fetch("http://192.168.1.101:5150/location", factoryRecord)
    //             .then(res => res.json())
    //             .then(data => {
    //               if (data) {
    //                 setfactoryName(data.username)
    //                 setfactorylocation(data.location);
    //               }
    //             })
    //             .catch((error) => {
    //               console.error('Error:', error);
    //             });


    //           const distributerRecord = {
    //             method: 'POST',
    //             headers: { 'Content-Type': 'application/json' },
    //             body: JSON.stringify({
    //               "hashAddress": data2.distributor,
    //             })
    //           };

    //           await fetch("http://192.168.1.101:5150/location", distributerRecord)
    //             .then(res => res.json())
    //             .then(data => {
    //               if (data) {
    //                 setdistributerName(data.username)
    //                 setdistributerlocation(data.location);
    //               }
    //             })
    //             .catch((error) => {
    //               console.error('Error:', error);
    //             });

    //           const retailerRecord = {
    //             method: 'POST',
    //             headers: { 'Content-Type': 'application/json' },
    //             body: JSON.stringify({
    //               "hashAddress": data2.retailer,
    //             })
    //           };

    //           await fetch("http://192.168.1.101:5150/location", retailerRecord)
    //             .then(res => res.json())
    //             .then(data => {
    //               if (data) {
    //                 setretailerName(data.username)
    //                 setretailerlocation(data.location);
    //               }
    //             })
    //             .catch((error) => {
    //               console.error('Error:', error);
    //             });

    //           // This loop is for the batches this product is made up of. batch -0 and batch -1 details
    //           let k = 1;
    //           while (k) {
    //             try {
    //               const supplychianId = await supplyChainContract.ProductIds(i, k - 1);
    //               // console.log(supplychianId);
    //               const itemData = (await supplyChainContract.items(supplychianId));
    //              // console.log("Raw materal details for this batch original", itemData);
    //               // Raw materal details for this batch original
    //               //console.log(await supplyChainContract.RawMaterialDetails(supplychianId));

    //               let OGObject = await supplyChainContract.RawMaterialSupplierRawMaterial(supplychianId);



    //               // This loop is for the factory details (only run once)
    //               let j = 1;
    //               while (j) {
    //                 try {
    //                   const data3 = await supplyChainContract.IdToFactory(supplychianId, j - 1);
    //                   if (data3.factory == data.factory) {
    //                     //console.log("Factory Details",data3);
    //                     //console.log("Warehouse :",data3); 
    //                     const yarndata = await supplyChainContract.FactoryRawMaterialsAferQC(supplychianId, data.factory);
    //                     //console.log("yarndata", yarndata) 

    //                     console.log("supplychianId aasasa", supplychianId.toNumber())
    //                     if (OGObject.rawMaterialType.toNumber() == 1) {
    //                       allsupplymateriallist.push(
    //                         <>
    //                           <table>
    //                             <tr>
    //                               <th>Product Batch ID</th>
    //                               <th>Yarn Quantity</th>
    //                               <th>Yarn Color</th>
    //                               <th>Yarn Type</th>
    //                               <th>Weight (kg)</th>
    //                               <th>Fibre length (mm)</th>
    //                               <th>Fibre Strength (g/T)</th>
    //                               <th>Mike(mm)</th>
    //                               <th>FQI (Rd)</th>
    //                             </tr>
    //                             <tr>
    //                               <td>{supplychianId.toNumber()}</td>
    //                               <td>{yarndata.YarnAmount.toNumber()}</td>
    //                               <td>{yarndata.YarnColor}</td>
    //                               <td>{yarndata.YarnType}</td>
    //                               <td>{yarndata.rawMaterial1.toNumber()}</td>
    //                               <td>{yarndata.rawMaterial2.toNumber()}</td>
    //                               <td>{yarndata.rawMaterial3.toNumber()}</td>
    //                               <td>{yarndata.rawMaterial4.toNumber()}</td>
    //                               <td>{yarndata.rawMaterial5.toNumber()}</td> 
    //                             </tr>
    //                           </table>
    //                         </>
    //                       )
    //                     }
    //                     if (OGObject.rawMaterialType.toNumber() == 2) {
    //                       allsupplymateriallist.push(
    //                         <>
    //                           <table>
    //                             <tr>
    //                               <th>Product Batch ID</th>
    //                               <th>Yarn Quantity</th>
    //                               <th>Yarn Color</th>
    //                               <th>Yarn Type</th>
    //                               <th>FMax (kN)</th>
    //                               <th>EMax (%)</th>
    //                               <th>Neps (%)</th>
    //                               <th>Cvm (%)</th>
    //                             </tr>
    //                             <tr>
    //                               <td>{supplychianId.toNumber()}</td>
    //                               <td>{yarndata.YarnAmount.toNumber()}</td>
    //                               <td>{yarndata.YarnColor}</td>
    //                               <td>{yarndata.YarnType}</td>
    //                               <td>{yarndata.rawMaterial1.toNumber()}</td>
    //                               <td>{yarndata.rawMaterial2.toNumber()}</td>
    //                               <td>{yarndata.rawMaterial3.toNumber()}</td>
    //                               <td>{yarndata.rawMaterial4.toNumber()}</td>
    //                             </tr>
    //                           </table>
    //                         </>
    //                       )
    //                     }
    //                     if (OGObject.rawMaterialType.toNumber() == 3) {
    //                       allsupplymateriallist.push(
    //                         <>
    //                           <table>
    //                             <tr>
    //                               <th>Product Batch ID</th>
    //                               <th>Yarn Quantity</th>
    //                               <th>Yarn Color</th>
    //                               <th>Yarn Type</th>
    //                               <th>Fibre diameter or Grade (mm)</th>
    //                               <th>Staple length (mm)</th>
    //                               <th>Fibre length (mm)</th>
    //                               <th>Crimpiness (cm)</th>
    //                             </tr>
    //                             <tr>
    //                               <td>{0}</td>
    //                               <td>{yarndata.YarnAmount.toNumber()}</td>
    //                               <td>{yarndata.YarnColor}</td>
    //                               <td>{yarndata.YarnType}</td>
    //                               <td>{yarndata.rawMaterial1.toNumber()}</td>
    //                               <td>{yarndata.rawMaterial2.toNumber()}</td>
    //                               <td>{yarndata.rawMaterial3.toNumber()}</td>
    //                               <td>{yarndata.rawMaterial4.toNumber()}</td>
    //                               {OGObject.rawMaterialType.toNumber() == 1 ?
    //                                 <td>{yarndata.rawMaterial5.toNumber()}</td> : ''}
    //                             </tr>
    //                           </table>
    //                         </>
    //                       )
    //                     }
    //                   }

    //                   j++;
    //                 } catch (error) {
    //                   break;
    //                 }

    //               }

    //               k++;
    //             } catch (error) {
    //               break;;
    //             }
    //           }
    //         }
    //         j++;
    //       } catch (error) {
    //         break;
    //       }
    //     }
    //   }
    // }


    if (detailData.state.batchId != null) {

      let j = 1;
      while (j) {
        try {
          const data = await supplyChainContract.IdToFactory(detailData.state.batchId, j - 1);
          const item = await supplyChainContract.items(detailData.state.batchId);

          if (data.warehouse.toLowerCase() == ownSupplyChainAddress.toLowerCase()) {



            const supplierRecord = {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                "hashAddress": item.RawMaterialSupplierID,
              })
            };

            await fetch("http://192.168.1.101:5150/location", supplierRecord)
              .then(res => res.json())
              .then(data => {
                if (data) {
                  setsupplierName(data.username)
                  setsupplierlocation(data.location);
                }
              })
              .catch((error) => {
                console.error('Error:', error);
              });

            const factoryRecord = {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                "hashAddress": data.factory,
              })
            };

            await fetch("http://192.168.1.101:5150/location", factoryRecord)
              .then(res => res.json())
              .then(data => {
                if (data) {
                  setfactoryName(data.username)
                  setfactorylocation(data.location);
                }
              })
              .catch((error) => {
                console.error('Error:', error);
              });



            let createdhour = await dateContract.getHour(item.timeStamp0.toNumber())
            let createdminute = await dateContract.getMinute(item.timeStamp0.toNumber())
            let createdsecond = await dateContract.getSecond(item.timeStamp0.toNumber())


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

            setcreateddayRecord(await dateContract.getDay(item.timeStamp0.toNumber()));
            setcreatemonthRecord(await dateContract.getMonth(item.timeStamp0.toNumber()));
            setcreatedyearRecord(await dateContract.getYear(item.timeStamp0.toNumber()));

            console.log("data data data", data)


            let warehousecreatedhour = await dateContract.getHour(data.timeStamp1.toNumber())
            let warehousecreatedminute = await dateContract.getMinute(data.timeStamp1.toNumber())
            let warehousecreatedsecond = await dateContract.getSecond(data.timeStamp1.toNumber())
    
    
            setwarehousecreatedhourRecord(warehousecreatedhour);
            setwarehousecreatedminuteRecord(warehousecreatedminute);
            setwarehousecreatedsecondRecord(warehousecreatedsecond);
    
            if (warehousecreatedhour + 5 > 24) {
              warehousecreatedhour = ((warehousecreatedhour + 5) - 24);
              setwarehousecreatedhourRecord(warehousecreatedhour);
            } else {
              warehousecreatedhour += 5;
              setwarehousecreatedhourRecord(warehousecreatedhour);
    
            }
            if (warehousecreatedminute + 31 > 60) {
              warehousecreatedhour++;
              warehousecreatedminute = ((warehousecreatedminute + 31) - 60);
              setwarehousecreatedminuteRecord(warehousecreatedminute);
    
            } else {
              warehousecreatedminute = warehousecreatedminute + 31;
              setwarehousecreatedminuteRecord(warehousecreatedminute);
    
            }
    
            setwarehousecreateddayRecord(await dateContract.getDay(data.timeStamp1.toNumber()));
            setwarehousecreatemonthRecord(await dateContract.getMonth(data.timeStamp1.toNumber()));
            setwarehousecreatedyearRecord(await dateContract.getYear(data.timeStamp1.toNumber()));





            const rawMaterialTypeData = (await supplyChainContract.RawMaterialDetails(item.supplyChainId.toNumber())).rawMaterialType.toNumber();
            settyperawMaterial(rawMaterialTypeData)



            const ogRawMaterial = await supplyChainContract.FactoryRawMaterialsORIGIONAL(detailData.state.batchId, data.factory);
            //console.log("Original raw materials.", ogRawMaterial.rawMaterial1.toNumber())

            const rawMaterialAfterQC = await supplyChainContract.FactoryRawMaterialsAferQC(detailData.state.batchId, data.factory);
            //console.log("after quality control", rawMaterialAfterQC.rawMaterial1.toNumber())

            setBatchId(item.supplyChainId.toNumber())
            setrawMaterial1(ogRawMaterial.rawMaterial1.toNumber())
            setrawMaterial2(ogRawMaterial.rawMaterial2.toNumber())
            setrawMaterial3(ogRawMaterial.rawMaterial3.toNumber())
            setrawMaterial4(ogRawMaterial.rawMaterial4.toNumber())
            setrawMaterial5(ogRawMaterial.rawMaterial5.toNumber())

            setafterQCrawMaterial1(rawMaterialAfterQC.rawMaterial1.toNumber())
            setafterQCrawMaterial2(rawMaterialAfterQC.rawMaterial2.toNumber())
            setafterQCrawMaterial3(rawMaterialAfterQC.rawMaterial3.toNumber())
            setafterQCrawMaterial4(rawMaterialAfterQC.rawMaterial4.toNumber())
            setafterQCrawMaterial5(rawMaterialAfterQC.rawMaterial5.toNumber())

          }
          j++;
        } catch (error) {
          break;
        }
      }
    }




    setMateriallist(allsupplymateriallist);

  }

  useEffect(() => {
    getOrderHistoryHandler();
  }, []);
  return (
    <>
      <div className="new">
        <div className="newContainer">
          <div className="top">
            <h4>View Product Details</h4>
          </div>
          <div className="bottom">
            <div className="right">
              <Card style={{ width: "80rem" }}>
                <Card.Body>
                  {/* <Card.Title>Spinning Material Detail</Card.Title> */}
                  <Card.Text style={{ width: '50%', float: 'left' }}>
                    <>
                      <p><b>Batch ID : </b>{batchId}</p>
                      <p><b>Supplier Name : </b>{supplierName}</p>
                      <p><b>Supplier Location : </b>{supplierlocation}</p>
                      <p><b>Supplier Listing Date : </b>{createddayRecord}-{createmonthRecord}-{createdyearRecord} {createdhourRecord}:{createdminuteRecord}:{createdsecondRecord}</p>
                      <p><b>Factory Name : </b>{factoryName}</p>
                      <p><b>Factory Location  : </b>{factorylocation}</p>
                      <p><b>Factory Warehouse Listing Date : </b>{warehousecreateddayRecord}-{warehousecreatemonthRecord}-{warehousecreatedyearRecord} {warehousecreatedhourRecord}:{warehousecreatedminuteRecord}:{warehousecreatedsecondRecord}</p>

                      {/* <p><b>Total Product Quantity : </b>{productTotalUnits}</p>
                      <p><b>Total Product Quantity After Quality Check : </b>{producttotalUnitsAfterQC}</p>
                      <p><b>Total Product Left : </b>{productLeftUnits}</p>
                      <p><b>You Purchase : </b>{customerProductBuyUnits}</p>
                      <p><b>Product Description : </b>{productDescription}</p> */}


                    </>
                  </Card.Text>



                  <Card.Text style={{ width: '50%', float: 'left' }}>
                    {typerawMaterial == 1 ?
                      <>
                        <p><b> Weight (kg) : </b>{rawMaterial1}</p>
                        <p><b> Fibre length (mm) : </b>{rawMaterial2}</p>
                        <p><b> Fibre Strength (g/T): </b>{rawMaterial3}</p>
                        <p><b> Mike(mm): </b>{rawMaterial4}</p>
                        <p><b> FQI (Rd) : </b>{rawMaterial5}</p>

                        <p><b>After Quality Check Weight (kg) : </b>{afterQCrawMaterial1}</p>
                        <p><b>After Quality Check Fibre length (mm) : </b>{afterQCrawMaterial2}</p>
                        <p><b>After Quality Check Fibre Strength (g/T): </b>{afterQCrawMaterial3}</p>
                        <p><b>After Quality Check Mike(mm): </b>{afterQCrawMaterial4}</p>
                        <p><b>After Quality Check FQI (Rd) : </b>{afterQCrawMaterial5}</p>

                      </>
                      : typerawMaterial == 2 ?
                        <>
                          <p><b> FMax (kN) : </b>{rawMaterial1}</p>
                          <p><b> EMax (%) : </b>{rawMaterial2}</p>
                          <p><b> Neps (%): </b>{rawMaterial3}</p>
                          <p><b> Cvm (%): </b>{rawMaterial4}</p>

                          <p><b>After Quality Check FMax (kN) : </b>{afterQCrawMaterial1}</p>
                          <p><b>After Quality Check EMax (%) : </b>{afterQCrawMaterial2}</p>
                          <p><b>After Quality Check Neps (%): </b>{afterQCrawMaterial3}</p>
                          <p><b>After Quality Check Cvm (%): </b>{afterQCrawMaterial4}</p>

                        </>
                        : typerawMaterial == 3 ?
                          <>
                            <p><b> Fibre diameter or Grade (mm) : </b>{rawMaterial1}</p>
                            <p><b> Staple length (mm) : </b>{rawMaterial2}</p>
                            <p><b> Fibre length (mm) : </b>{rawMaterial3}</p>
                            <p><b> Crimpiness (cm): </b>{rawMaterial4}</p>

                            <p><b>After Quality Check Fibre diameter or Grade (mm) : </b>{afterQCrawMaterial1}</p>
                            <p><b>After Quality Check Fibre  Staple length (mm) : </b>{afterQCrawMaterial2}</p>
                            <p><b>After Quality Check Fibre length (mm) : </b>{afterQCrawMaterial3}</p>
                            <p><b>After Quality Check Crimpiness (cm) : </b>{afterQCrawMaterial4}</p>

                          </>
                          : ''}
                  </Card.Text>





                  {/* <Card.Text style={{ width: '50%', float: 'left' }}>
                    <>
                      
                      <p><b>WareHouse Name : </b>Vipin</p>
                      <p><b>Distributor Name : </b>{distributerName}</p>
                      <p><b>Distributor Location : </b>{distributerlocation}</p>
                      <p><b>Distributor Listing Date : </b>25/01/2000</p>
                      <p><b>Retailer Name : </b>{retailerName}</p>
                      <p><b>Retailer Location : </b>{retailerlocation}</p>
                      <p><b>Retailer Listing Date : </b>15/02/2000</p>
                    </>
                  </Card.Text> */}
                </Card.Body>
              </Card>
            </div>
          </div>


          {/* <div className="bottom">
            <div className="right">

              {materiallist}

            </div>
          </div> */}




        </div>
      </div>
    </>
  );
};

export default WarehouseDetail;
