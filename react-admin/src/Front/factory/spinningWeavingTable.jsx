import React, { useEffect, useState, useContext } from 'react';
import '../../style/front/viewSupplyTable.scss'
import { DarkModeContext } from "../../context/darkModeContext";
import { useNavigate } from "react-router-dom";
import Button from 'react-bootstrap/Button';

const SpinningWeavingTable = () => {
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
            const factoryData = await supplyChainContract.IdToFactory(i, j - 1);
            if (factoryData.itemState === 2 && factoryData.factory.toLowerCase() == ownSupplyChainAddress.toLowerCase()) {
              let rawMaterialDetails = await supplyChainContract.RawMaterialDetails(object.supplyChainId);

              let factoryRawMaterialsAferQC = await supplyChainContract.FactoryRawMaterialsAferQC(i, ownSupplyChainAddress.toLowerCase());
              const createdday = await dateContract.getDay(factoryData.timeStamp3.toNumber())
              const createmonth = await dateContract.getMonth(factoryData.timeStamp3.toNumber())
              const createdyear = await dateContract.getYear(factoryData.timeStamp3.toNumber())



              let hour = await dateContract.getHour(factoryData.timeStamp3.toNumber())
              let minute = await dateContract.getMinute(factoryData.timeStamp3.toNumber());
              let second = await dateContract.getSecond(factoryData.timeStamp3.toNumber());

              if (hour + 5 > 24) {
                hour = ((hour + 5) - 24);
              } else {
                hour += 5;
              }
              if (minute + 35 > 60) {
                hour++;
                minute = ((minute + 35) - 60);
              } else {
                minute = minute + 35;
              }

              checkvalue = 1;
              const rawMaterialRecord = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                  "hashAddress": object.RawMaterialSupplierID,
                })
              };
              await fetch("http://192.168.1.101:5150/location", rawMaterialRecord)
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
                  "hashAddress": factoryData.warehouse,
                })
              };
              await fetch("http://192.168.1.101:5150/location", wareHouseDetail)
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
                  <td>
                    {rawMaterialDetails.rawMaterialType.toNumber() == 1 ? "Cotton" : ""}
                    {rawMaterialDetails.rawMaterialType.toNumber() == 2 ? "Polyester" : ""}
                    {rawMaterialDetails.rawMaterialType.toNumber() == 3 ? "Wool" : ""}
                  </td>
                  <td>{wareHousedatarec && wareHousedatarec}</td>
                  <td>{createdday}-{createmonth}-{createdyear} {hour}:{minute}:{second}</td>
                  <td>
                    {/* <Button variant="outline-primary" onClick={() => navigate('/viewBatchStatus', { state: { i } })}>View</Button> */}
                    <Button variant="outline-success" onClick={() => navigate('/spinningBatchCompleteForm', { state: { i } })}>Continue</Button>
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
            <td colSpan="6">No Record Found</td>
          </tr></>
        )
      }
    } else {
      allsupplymateriallist.push(
        <><tr>
          <td colSpan="6">No Record Found dfg</td>
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
            <h4>Spinning Weaving List</h4>
          </div>
          <div className="bottom">
            <div className="right">
              <table>
                <tr>
                  <th>Batch ID</th>
                  <th>Raw Material Supplier</th>
                  <th>Material Type</th>
                  <th>Warehouse</th>
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
export default SpinningWeavingTable
