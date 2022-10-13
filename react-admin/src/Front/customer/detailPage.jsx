import React, { useEffect, useState, useContext } from 'react';
import "../../style/front/viewSupplyTable.scss";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router-dom";
import { DarkModeContext } from "../../context/darkModeContext";

const DetailPage = () => {
  const navigate = useNavigate();
  const [materiallist, setMateriallist] = useState(null);
  const { dispatch, metaMask, supplyChainContract, ownSupplyChainAddress, dateContract } = useContext(DarkModeContext);
  const allsupplymateriallist = []; 

  const [productBatch, setproductBatch] = useState();
  const [productDescription, setproductDescription] = useState();
  const [productTotalUnits, setproductTotalUnits] = useState();
  const [producttotalUnitsAfterQC, setproducttotalUnitsAfterQC] = useState();
  const [productLeftUnits, setproductLeftUnits] = useState();
  const [supplierName, setsupplierName] = useState();
  const [supplierlocation, setsupplierlocation] = useState();
  const [factoryName, setfactoryName] = useState();
  const [factorylocation, setfactorylocation] = useState();
  const [distributerName, setdistributerName] = useState();
  const [distributerlocation, setdistributerlocation] = useState();
  const [retailerName, setretailerName] = useState();
  const [retailerlocation, setretailerlocation] = useState();

  const [factoryhour, setfactoryhour] = useState();
  const [factoryminute, setfactoryminute] = useState();
  const [factorysecond, setfactorysecond] = useState();
  const [factoryday, setfactoryday] = useState();
  const [factorymonth, setfactorymonth] = useState();
  const [factoryyear, setfactoryyear] = useState();

  const [distributerhour, setdistributerhour] = useState();
  const [distributerminute, setdistributerminute] = useState();
  const [distributersecond, setdistributersecond] = useState();
  const [distributerday, setdistributerday] = useState();
  const [distributermonth, setdistributermonth] = useState();
  const [distributeryear, setdistributeryear] = useState();

  



  const [customerProductBuyUnits, setcustomerProductBuyUnits] = useState();

  const getOrderHistoryHandler = async (event) => {

    const totalBatches = await supplyChainContract.totalProductBatchs();
    for (let i = 0; i < totalBatches; i++) {
      const data = await supplyChainContract.Product(i);
      if (data.productState == 1) {
        console.log("This data is about i th product",data);
        // This data is about i th product

        let factoryhourrec = await dateContract.getHour(
          data.timeStamp6.toNumber()
        );
        let factoryminuterec = await dateContract.getMinute(
          data.timeStamp6.toNumber()
        );
      
        let factorysecondrec = await dateContract.getSecond(
          data.timeStamp6.toNumber()
        );
        setfactorysecond(factorysecondrec);

        let factorydayrec = await dateContract.getDay(
          data.timeStamp6.toNumber()
        );
        setfactoryday(factorydayrec);

        let factorymonthrec = await dateContract.getMonth(
          data.timeStamp6.toNumber()
        );
        setfactorymonth(factorymonthrec);

        let factoryyearrec = await dateContract.getYear(
          data.timeStamp6.toNumber()
        );
        setfactoryyear(factoryyearrec);

        if (factoryhourrec + 5 > 24) {
          factoryhourrec = factoryhourrec + 5 - 24;
        } else { 
          factoryhourrec += 5; 
        }
        if (factoryminuterec + 31 > 60) {
          factoryhourrec++;
          factoryminuterec = factoryminuterec + 31 - 60;
        } else {
          factoryminuterec = factoryminuterec + 31;
        } 

         setfactoryhour(factoryhourrec);
         setfactoryminute(factoryminuterec);


         let distributerhourrec = await dateContract.getHour(
          data.timeStamp7.toNumber()
        );
        let distributerminuterec = await dateContract.getMinute(
          data.timeStamp7.toNumber()
        );
      
        let distributersecondrec = await dateContract.getSecond(
          data.timeStamp7.toNumber()
        );
        setdistributersecond(distributersecondrec);

        let distributerdayrec = await dateContract.getDay(
          data.timeStamp7.toNumber()
        );
        setdistributerday(distributerdayrec);

        let distributermonthrec = await dateContract.getMonth(
          data.timeStamp7.toNumber()
        );
        setdistributermonth(distributermonthrec);

        let distributeryearrec = await dateContract.getYear(
          data.timeStamp7.toNumber()
        );
        setdistributeryear(distributeryearrec);

        if (distributerhourrec + 5 > 24) {
          distributerhourrec = distributerhourrec + 5 - 24;
        } else { 
          distributerhourrec += 5; 
        }
        if (distributerminuterec + 31 > 60) {
          distributerhourrec++;
          distributerminuterec = distributerminuterec + 31 - 60;
        } else {
          distributerminuterec = distributerminuterec + 31;
        } 

         setdistributerhour(distributerhourrec);
         setdistributerminute(distributerminuterec); 

        let j = 1;
        while (j) {
          try {

            const data2 = await supplyChainContract.ProductIdToCustomer(i, j - 1);
            if (data2.customer.toLowerCase() == ownSupplyChainAddress.toLowerCase()) {
              // Details of this product
              //console.log("Details of this product", data2);

              // Details related to product and customer
              //console.log("Details related to product and customer",data);  

              setproductBatch(data.productId.toNumber())
              setproductDescription(data.Description)
              setproductTotalUnits(data.totalUnits.toNumber())
              setproducttotalUnitsAfterQC(data.totalUnitsAfterQC.toNumber())
              setproductLeftUnits(data.leftUnits.toNumber())
              setcustomerProductBuyUnits(data2.quantity.toNumber())


              const factoryRecord = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                  "hashAddress": data.factory,
                })
              };

              await fetch("http://162.215.222.118:5151/location", factoryRecord)
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


              const distributerRecord = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                  "hashAddress": data2.distributor,
                })
              };

              await fetch("http://162.215.222.118:5151/location", distributerRecord)
                .then(res => res.json())
                .then(data => {
                  if (data) {
                    setdistributerName(data.username)
                    setdistributerlocation(data.location);
                  }
                })
                .catch((error) => {
                  console.error('Error:', error);
                });

              const retailerRecord = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                  "hashAddress": data2.retailer,
                })
              };

              await fetch("http://162.215.222.118:5151/location", retailerRecord)
                .then(res => res.json())
                .then(data => {
                  if (data) {
                    setretailerName(data.username)
                    setretailerlocation(data.location);
                  }
                })
                .catch((error) => {
                  console.error('Error:', error);
                });

              // This loop is for the batches this product is made up of. batch -0 and batch -1 details
              let k = 1;
              let suppiername = '';
              let suppierLocation = '';
              while (k) {
                try {
                  const supplychianId = await supplyChainContract.ProductIds(i, k - 1);
                  // console.log(supplychianId);
                  const itemData = (await supplyChainContract.items(supplychianId));
                  // Raw materal details for this batch original
                  //console.log(await supplyChainContract.RawMaterialDetails(supplychianId));
                  const supplierRecord = {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                      "hashAddress": itemData.RawMaterialSupplierID,
                    })
                  };

                  await fetch("http://162.215.222.118:5151/location", supplierRecord)
                    .then(res => res.json())
                    .then(data => {
                      if (data) {
                        suppiername = data.username
                        suppierLocation = data.location

                      }
                    })
                    .catch((error) => {
                      console.error('Error:', error);
                    });

                  let OGObject = await supplyChainContract.RawMaterialSupplierRawMaterial(supplychianId);
                  // This loop is for the factory details (only run once)
                  let j = 1;
                  while (j) {
                    try {
                      const data3 = await supplyChainContract.IdToFactory(supplychianId, j - 1);
                      if (data3.factory == data.factory) {
                        //console.log("Factory Details",data3);
                        //console.log("Warehouse :",data3); 
                        const yarndata = await supplyChainContract.FactoryRawMaterialsAferQC(supplychianId, data.factory);
                        //console.log("yarndata", yarndata) 

                        //console.log("supplychianId aasasa", supplychianId.toNumber())

                        let hour = await dateContract.getHour(
                          itemData.timeStamp0.toNumber()
                        );
                        let minute = await dateContract.getMinute(
                          itemData.timeStamp0.toNumber()
                        );
                        let second = await dateContract.getSecond(
                          itemData.timeStamp0.toNumber()
                        );
                        let day = await dateContract.getDay(
                          itemData.timeStamp0.toNumber()
                        );
                        let month = await dateContract.getMonth(
                          itemData.timeStamp0.toNumber()
                        );
                        let year = await dateContract.getYear(
                          itemData.timeStamp0.toNumber()
                        );
                        if (hour + 5 > 24) {
                          hour = hour + 5 - 24;
                        } else {
                          hour += 5;
                        }
                        if (minute + 31 > 60) {
                          hour++;
                          minute = minute + 31 - 60;
                        } else {
                          minute = minute + 31;
                        }



                        if (OGObject.rawMaterialType.toNumber() == 1) {
                          allsupplymateriallist.push(
                            <>
                              <table>
                                <tr>
                                  <th>Batch ID</th>
                                  <th>Supplier</th>
                                  <th>Supplier Location</th>
                                  <th>Supplier Listing Date</th>
                                  <th>Yarn Quantity</th>
                                  <th>Yarn Color</th>
                                  <th>Yarn Type</th>
                                  <th>Weight (kg)</th>
                                  <th>Fibre length (mm)</th>
                                  <th>Fibre Strength (g/T)</th>
                                  <th>Mike(mm)</th>
                                  <th>FQI (Rd)</th>
                                </tr>
                                <tr>
                                  <td>{supplychianId.toNumber()}</td>
                                  <td>{suppiername && suppiername}</td>
                                  <td>{suppierLocation && suppierLocation}</td>
                                  <td>{day}-{month}-{year} {hour}:{minute}:{second}</td>
                                  <td>{yarndata.YarnAmount.toNumber()}</td>
                                  <td>{yarndata.YarnColor}</td>
                                  <td>{yarndata.YarnType}</td>
                                  <td>{yarndata.rawMaterial1.toNumber()}</td>
                                  <td>{yarndata.rawMaterial2.toNumber()}</td>
                                  <td>{yarndata.rawMaterial3.toNumber()}</td>
                                  <td>{yarndata.rawMaterial4.toNumber()}</td>
                                  <td>{yarndata.rawMaterial5.toNumber()}</td>
                                </tr>
                              </table>
                            </>
                          )
                        }
                        if (OGObject.rawMaterialType.toNumber() == 2) {
                          allsupplymateriallist.push(
                            <>
                              <table>
                                <tr>
                                  <th>Batch ID</th>
                                  <th>Supplier</th>
                                  <th>Supplier Location</th>
                                  <th>Supplier Listing Date</th>
                                  <th>Yarn Quantity</th>
                                  <th>Yarn Color</th>
                                  <th>Yarn Type</th>
                                  <th>FMax (kN)</th>
                                  <th>EMax (%)</th>
                                  <th>Neps (%)</th>
                                  <th>Cvm (%)</th>
                                </tr>
                                <tr>
                                  <td>{supplychianId.toNumber()}</td>
                                  <td>{suppiername && suppiername}</td>
                                  <td>{suppierLocation && suppierLocation}</td>
                                  <td>{day}-{month}-{year} {hour}:{minute}:{second}</td>
                                  <td>{yarndata.YarnAmount.toNumber()}</td>
                                  <td>{yarndata.YarnColor}</td>
                                  <td>{yarndata.YarnType}</td>
                                  <td>{yarndata.rawMaterial1.toNumber()}</td>
                                  <td>{yarndata.rawMaterial2.toNumber()}</td>
                                  <td>{yarndata.rawMaterial3.toNumber()}</td>
                                  <td>{yarndata.rawMaterial4.toNumber()}</td>
                                </tr>
                              </table>
                            </>
                          )
                        }
                        if (OGObject.rawMaterialType.toNumber() == 3) {
                          allsupplymateriallist.push(
                            <>
                              <table>
                                <tr>
                                  <th>Batch ID</th>
                                  <th>Supplier</th>
                                  <th>Supplier Location</th>
                                  <th>Supplier Listing Date</th>
                                  <th>Yarn Quantity</th>
                                  <th>Yarn Color</th>
                                  <th>Yarn Type</th>
                                  <th>Fibre diameter or Grade (mm)</th>
                                  <th>Staple length (mm)</th>
                                  <th>Fibre length (mm)</th>
                                  <th>Crimpiness (cm)</th>
                                </tr>
                                <tr>
                                  <td>{supplychianId.toNumber()}</td>
                                  <td>{suppiername && suppiername}</td>
                                  <td>{suppierLocation && suppierLocation}</td>
                                  <td>{day}-{month}-{year} {hour}:{minute}:{second}</td>
                                  <td>{yarndata.YarnAmount.toNumber()}</td>
                                  <td>{yarndata.YarnColor}</td>
                                  <td>{yarndata.YarnType}</td>
                                  <td>{yarndata.rawMaterial1.toNumber()}</td>
                                  <td>{yarndata.rawMaterial2.toNumber()}</td>
                                  <td>{yarndata.rawMaterial3.toNumber()}</td>
                                  <td>{yarndata.rawMaterial4.toNumber()}</td>
                                  {OGObject.rawMaterialType.toNumber() == 1 ?
                                    <td>{yarndata.rawMaterial5.toNumber()}</td> : ''}
                                </tr>
                              </table>
                            </>
                          )
                        }
                      }

                      j++;
                    } catch (error) {
                      break;
                    }

                  }

                  k++;
                } catch (error) {
                  break;;
                }
              }
            }
            j++;
          } catch (error) {
            break;
          }
        }
      }
    }

    setMateriallist(allsupplymateriallist);

  }

  console.log("factoryhour factoryhour",factoryhour)

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
                      <p><b>Product Batch : </b>{productBatch}</p>
                      <p><b>Total Product Quantity : </b>{productTotalUnits}</p>
                      <p><b>Total Product Quantity After Quality Check : </b>{producttotalUnitsAfterQC}</p>
                      <p><b>Total Product Left : </b>{productLeftUnits}</p>
                      <p><b>You Purchase : </b>{customerProductBuyUnits}</p>
                      <p><b>Product Description : </b>{productDescription}</p>
                      <p><b>Factory Name : </b>{factoryName}</p>
                      <p><b>Factory Location : </b>{factorylocation}</p>
                    </>
                  </Card.Text>
                  <Card.Text style={{ width: '50%', float: 'left' }}> 
                    <>
                      <p><b>Factory Listing Date : </b>{factoryday}-{factorymonth}-{factoryyear} {factoryhour}:{factoryminute}:{factorysecond}</p>
                      <p><b>WareHouse Name : </b>Vipin</p>
                      <p><b>Distributor Name : </b>{distributerName}</p>
                      <p><b>Distributor Location : </b>{distributerlocation}</p>
                      <p><b>Distributor Listing Date : </b>{distributerday}-{distributermonth}-{distributeryear} {distributerhour}:{distributerminute}:{distributersecond}</p>
                      <p><b>Retailer Name : </b>{retailerName}</p>
                      <p><b>Retailer Location : </b>{retailerlocation}</p>
                      <p><b>Retailer Listing Date : </b>{distributerday}-{distributermonth}-{distributeryear} {distributerhour}:{distributerminute}:{distributersecond}</p>
                    </>
                  </Card.Text>
                </Card.Body>
              </Card>
            </div>
          </div>


          <div className="bottom">
            <div className="right">

              {materiallist}

            </div>
          </div>




        </div>
      </div>
    </>
  );
};

export default DetailPage;
