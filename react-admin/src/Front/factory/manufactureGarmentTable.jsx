import React, { useEffect, useState, useContext } from 'react';
import '../../style/front/viewSupplyTable.scss'
import { DataGrid } from "@mui/x-data-grid";
import { Link } from "react-router-dom";
import { DarkModeContext } from "../../context/darkModeContext";
import { useNavigate } from "react-router-dom";
import Button from 'react-bootstrap/Button';

const ManufactureGarmentTable = () => {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [materiallist, setMateriallist] = useState(null);
  const { dispatch, metaMask, supplyChainContract, supplyChainTokenContract, ownSupplyChainAddress, dateContract } = useContext(DarkModeContext);
  const allsupplymateriallist = [];
  const getSupplyChainHandler = async (event) => {
    let userdatarec = '';
    let wareHousedatarec = '';
    const totalbatchids = (await supplyChainContract.totalBatchs());
    var checkvalue = 0;
    if (totalbatchids > 0) {
      for (let i = 0; i < totalbatchids; i++) {

        let j = 1;
        while (j) {
          try {

            let object = await supplyChainContract.items(i);
            const manufactureData = await supplyChainContract.IdToFactory(i, j - 1);

            console.log("manufactureData.itemState",manufactureData.itemState)


            if (manufactureData.itemState === 3 && manufactureData.factory.toLowerCase() == ownSupplyChainAddress.toLowerCase()) {
              checkvalue = 1;

              let rawMaterialDetails = await supplyChainContract.RawMaterialDetails(object.supplyChainId);
              let factoryRawMaterialsAferQC = await supplyChainContract.FactoryRawMaterialsAferQC(i,ownSupplyChainAddress.toLowerCase());


              const createdday = await dateContract.getDay(manufactureData.timeStamp4.toNumber())
              const createmonth = await dateContract.getMonth(manufactureData.timeStamp4.toNumber())
              const createdyear = await dateContract.getYear(manufactureData.timeStamp4.toNumber())

              let hour = await dateContract.getHour(manufactureData.timeStamp4.toNumber())
              let minute = await dateContract.getMinute(manufactureData.timeStamp4.toNumber());
              let second = await dateContract.getSecond(manufactureData.timeStamp4.toNumber());

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
              const rawMaterialRecord = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                  "hashAddress": object.RawMaterialSupplierID,
                })
              };
              await fetch("http://162.215.222.118:5151/location", rawMaterialRecord)
                .then(res => res.json())
                .then(data => {
                  if (data) {
                    userdatarec = data.username
                  }
                }).catch((error) => {
                  console.error('Error:', error);
                });
              const wareHouseDetail = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                  "hashAddress": manufactureData.warehouse,
                })
              };
              await fetch("http://162.215.222.118:5151/location", wareHouseDetail)
                .then(res => res.json())
                .then(data => {
                  if (data) {
                    wareHousedatarec = data.username
                  }
                }).catch((error) => {
                  console.error('Error:', error);
                });
              allsupplymateriallist.push(
                <><tr>
                  <td>{i}</td>
                  <td>{userdatarec && userdatarec}</td>
                  <td>{wareHousedatarec && wareHousedatarec}</td>
                  <td>
                    {rawMaterialDetails.rawMaterialType.toNumber() == 1 ? "Cotton" : ""}
                    {rawMaterialDetails.rawMaterialType.toNumber() == 2 ? "Polyester" : ""}
                    {rawMaterialDetails.rawMaterialType.toNumber() == 3 ? "Wool" : ""}</td>
                  <td>{factoryRawMaterialsAferQC && factoryRawMaterialsAferQC.YarnAmount.toNumber()}</td>
                  <td>{factoryRawMaterialsAferQC && factoryRawMaterialsAferQC.YarnColor}</td>
                  <td>{factoryRawMaterialsAferQC && factoryRawMaterialsAferQC.YarnType}</td>
                  <td>{createdday}-{createmonth}-{createdyear} {hour}:{minute}:{second}</td>
                  <td>
                    {/* <Button variant="outline-primary" onClick={() => navigate('/viewBatchStatus', { state: { i } })}>View</Button> */}
                    <Button variant="outline-success" onClick={() => navigate('/garmentBatchCompleteForm', { state: { i } })}>Continue</Button>
                  </td>
                </tr></>
              )
            }

            j++;
          } catch (error) {
            break;
          }
        }

      }
      if (checkvalue == 0) {
        allsupplymateriallist.push(
          <><tr>
            <td colSpan="9">No Record Found</td>
          </tr></>
        )
      }
    } else {
      allsupplymateriallist.push(
        <><tr>
          <td colSpan="9">No Record Found</td>
        </tr></>
      )
    }
    setMateriallist(allsupplymateriallist);
  }
  useEffect(() => {
    getSupplyChainHandler();
  }, []);
  return (
    <>
      <div className="new">
        <div className="newContainer">
          <div className="top">
            <h4>Manufature Garment List</h4>
          </div>
          <div className="bottom">
            <div className="right">
              <table>
                <tr>
                  <th>Batch ID</th>
                  <th>Raw Material Supplier</th>
                  <th>Warehouse</th>
                  <th>Material Type</th>
                  <th>Yarn Quantity</th>
                  <th>Yarn Color</th>
                  <th>Yarn Type</th>
                  <th>Date</th>
                  <th>Action</th>
                </tr>
                {materiallist}
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export default ManufactureGarmentTable
