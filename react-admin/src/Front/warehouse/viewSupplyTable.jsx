import React, { useEffect, useState, useContext } from 'react';
import "./viewSupplyTable.scss";
import { DataGrid } from "@mui/x-data-grid";
import { Link } from "react-router-dom";
import { DarkModeContext } from "../../context/darkModeContext";
import Button from 'react-bootstrap/Button';
import { useNavigate } from "react-router-dom";

const ViewSupplyTable = () => {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [materiallist, setMateriallist] = useState(null);
  const [polysterlist, setPolysterlist] = useState(null);
  const [woollist, setWoollist] = useState(null);
  const { dispatch, metaMask, supplyChainContract, supplyChainTokenContract, ownSupplyChainAddress, dateContract } = useContext(DarkModeContext);

  const allsupplymateriallist = [];
  const allPolyesterlist = [];
  const allWoollist = [];
  const getSupplyChainHandler = async (event) => {
    let userdatarec = '';
    let factoryuserdatarec = '';
    let userdatalocation = '';
    var checkcottonvalue = 0;
    var checkPolyestervalue = 0;
    var checkWoolvalue = 0;
    const totalBatchs = await supplyChainContract.totalBatchs()
    if (totalBatchs > 0) {
      for (let i = 0; i < totalBatchs; i++) {

        let j = 1;
        while (j) {
          try {

            const warehouseData = await supplyChainContract.IdToFactory(i, j - 1);
            const warehouseItem = await supplyChainContract.items(i);
            // console.log("warehouseData.warehouse.toLowerCase()",warehouseData.warehouse.toLowerCase())
            if (warehouseData.warehouse.toLowerCase() == ownSupplyChainAddress.toLowerCase()) {

              const factoryRawMaterialsOriginal = await supplyChainContract.FactoryRawMaterialsORIGIONAL(i, warehouseData.factory);
              const rawMaterialsDetail = await supplyChainContract.RawMaterialDetails(warehouseItem.supplyChainId.toNumber());
              console.log("factoryRawMaterialsOriginal", factoryRawMaterialsOriginal.rawMaterial1.toNumber())
              const factoryRawMaterialsAferQC = await supplyChainContract.FactoryRawMaterialsAferQC(i, warehouseData.factory);
              //console.log("warehouseItem",rawMaterialsDetail.rawMaterialType.toNumber()) 
              let hour = await dateContract.getHour(warehouseItem.timeStamp0.toNumber())
              let minute = await dateContract.getMinute(warehouseItem.timeStamp0.toNumber());
              let second = await dateContract.getSecond(warehouseItem.timeStamp0.toNumber());

              if (hour + 5 > 24) {
                hour = ((hour + 5) - 24);
              } else {
                hour += 5;
              }
              if (minute + 31 > 60) {
                hour++;
                minute = ((minute + 31) - 60);
              } else {
                minute = minute + 31;
              }
              const createdday = await dateContract.getDay(warehouseItem.timeStamp0.toNumber())
              const createmonth = await dateContract.getMonth(warehouseItem.timeStamp0.toNumber())
              const createdyear = await dateContract.getYear(warehouseItem.timeStamp0.toNumber())
              const rawMaterialRecords = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                  "hashAddress": warehouseItem.RawMaterialSupplierID,
                })
              };

              await fetch("http://162.215.222.118:5151/location", rawMaterialRecords)
                .then(res => res.json())
                .then(data => {
                  if (data) {
                    userdatarec = data.username
                  }
                })
                .catch((error) => {
                  console.error('Error:', error);
                });
              const factoryRecords = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                  "hashAddress": warehouseData.factory,
                })
              };
              await fetch("http://162.215.222.118:5151/location", factoryRecords)
                .then(res => res.json())
                .then(data => {
                  if (data) {
                    factoryuserdatarec = data.username
                  }
                })
                .catch((error) => {
                  console.error('Error:', error);
                });

              if (rawMaterialsDetail.rawMaterialType.toNumber() == 1) {
                checkcottonvalue = 1;
                allsupplymateriallist.push(
                  <><tr>
                    <td>{i}</td>
                    <td>{userdatarec && userdatarec}</td>
                    <td>{factoryuserdatarec && factoryuserdatarec}</td>
                    <td>{factoryRawMaterialsOriginal.rawMaterial1.toNumber()}</td>
                    <td>{factoryRawMaterialsOriginal.rawMaterial2.toNumber()}</td>
                    <td>{factoryRawMaterialsOriginal.rawMaterial3.toNumber()}</td>
                    <td>{factoryRawMaterialsOriginal.rawMaterial4.toNumber()}</td>
                    <td>{factoryRawMaterialsOriginal.rawMaterial5.toNumber()}</td>
                    <td>{createdday}-{createmonth}-{createdyear} {hour}:{minute}:{second}</td>
                    <td>
                      <Button variant="outline-info" onClick={() => navigate('/warehouseBatchDetail', { state: { batchId : i } })}>View</Button>
                    </td>
                  </tr></>
                )
              }
              if (rawMaterialsDetail.rawMaterialType.toNumber() == 2) {
                checkPolyestervalue = 1;
                allPolyesterlist.push(
                  <><tr>
                    <td>{i}</td>
                    <td>{userdatarec && userdatarec}</td>
                    <td>{factoryuserdatarec && factoryuserdatarec}</td>
                    <td>{factoryRawMaterialsOriginal.rawMaterial1.toNumber()}</td>
                    <td>{factoryRawMaterialsOriginal.rawMaterial2.toNumber()}</td>
                    <td>{factoryRawMaterialsOriginal.rawMaterial3.toNumber()}</td>
                    <td>{factoryRawMaterialsOriginal.rawMaterial4.toNumber()}</td>
                    <td>{createdday}-{createmonth}-{createdyear} {hour}:{minute}:{second}</td>
                    <td>
                      <Button variant="outline-info" onClick={() => navigate('/warehouseBatchDetail', { state: {batchId : i } })}>View</Button>
                    </td>
                  </tr></>
                )
              }
              if (rawMaterialsDetail.rawMaterialType.toNumber() == 3) {
                checkWoolvalue = 1;
                allWoollist.push(
                  <><tr> 
                    <td>{i}</td>
                    <td>{userdatarec && userdatarec}</td>
                    <td>{factoryuserdatarec && factoryuserdatarec}</td>
                    <td>{factoryRawMaterialsOriginal.rawMaterial1.toNumber()}</td>
                    <td>{factoryRawMaterialsOriginal.rawMaterial2.toNumber()}</td>
                    <td>{factoryRawMaterialsOriginal.rawMaterial3.toNumber()}</td>
                    <td>{factoryRawMaterialsOriginal.rawMaterial4.toNumber()}</td>
                    <td>{createdday}-{createmonth}-{createdyear} {hour}:{minute}:{second}</td>
                    <td>
                      <Button variant="outline-info" onClick={() => navigate('/warehouseBatchDetail', { state: { batchId : i} })}>View</Button>
                    </td>
                  </tr></>
                )
              }
            }
            j++;
          } catch (error) {
            break;
          }
        }
      }

      if (checkcottonvalue == 0) {
        allsupplymateriallist.push(
          <><tr>
            <td colSpan="8">No Record Found</td>
          </tr></>
        )
      }
      if (checkPolyestervalue == 0) {
        allPolyesterlist.push(
          <><tr>
            <td colSpan="8">No Record Found</td>
          </tr></>
        )
      }
      if (checkWoolvalue == 0) {
        allWoollist.push(
          <><tr>
            <td colSpan="8">No Record Found</td>
          </tr></>
        )
      }
    } else {
      allsupplymateriallist.push(
        <><tr>
          <td colSpan="8">No Record Found</td>
        </tr></>
      )
      allPolyesterlist.push(

        <><tr>
          <td colSpan="8">No Record Found</td>
        </tr></>
      )
      allWoollist.push(
        <><tr>
          <td colSpan="8">No Record Found</td>
        </tr></>
      )

    }
    setMateriallist(allsupplymateriallist);
    setPolysterlist(allPolyesterlist);
    setWoollist(allWoollist);
  }
  useEffect(() => {
    getSupplyChainHandler();
  }, []);

  return (
    <>
      <div className="new">
        <div className="newContainer">
          <div className="top">
            <h3>View Supply Token</h3>
          </div>
          <div className="bottom">
            <div className="right">
              <h6>Cotton List</h6>
              <table>
                <tr>
                  <th>Batch ID</th>
                  <th>Raw Material Supplier</th>
                  <th>Factory</th>
                  <th>Weight (kg)</th>
                  <th>Fibre length (mm)</th>
                  <th>Fibre Strength (g/T)</th>
                  <th>Mike(mm)</th>
                  <th>FQI (Rd)</th>
                  <td>Date</td>
                  <th>Action</th>
                </tr>
                {materiallist}
              </table>
            </div>
          </div>
          <div className="bottom">
            <div className="right">
              <h6>Polyester List</h6>
              <table>
                <tr>
                  <th>Batch ID</th>
                  <th>Raw Material Supplier</th>
                  <th>Factory</th>
                  <th>FMax (kN)</th>
                  <th>EMax (%)</th>
                  <th>Neps (%)</th>
                  <th>Cvm (%)</th>
                  <td>Date</td>
                  <th>Action</th>
                </tr>
                {polysterlist}
              </table>
            </div>
          </div>
          <div className="bottom">
            <div className="right">
              <h6>Wool List</h6>
              <table>
                <tr>
                  <th>Batch ID</th>
                  <th>Raw Material Supplier</th>
                  <th>Factory</th>
                  <th>Fibre diameter or Grade (mm)</th>
                  <th>Staple length (mm)</th>
                  <th>Fibre length (mm)</th>
                  <th>Crimpiness (cm)</th>
                  <td>Date</td>
                  <th>Action</th>
                </tr>
                {woollist}
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );

};

export default ViewSupplyTable;


