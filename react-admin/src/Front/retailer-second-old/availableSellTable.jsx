import React, { useEffect, useState, useContext } from "react";
import "../../style/front/viewSupplyTable.scss";
import { DataGrid } from "@mui/x-data-grid";
import { Link } from "react-router-dom";
import { DarkModeContext } from "../../context/darkModeContext";
import Button from "react-bootstrap/Button";

const SellTable = () => {
  var checkMatVal = 0;
  const [materiallist, setMateriallist] = useState(null);
  const {
    dispatch,
    metaMask,
    supplyChainContract,
    ownSupplyChainAddress,
    dateContract,
  } = useContext(DarkModeContext);
  const allsupplymateriallist = [];

  const getSupplyChainHandler = async (event) => {
    let distributeruserrec = "";
    let factoryuserrec = "";

    const totalbatch = await supplyChainContract.totalBatchs();
    if (totalbatch.toNumber() > 0) {
      for (let i = 0; i < totalbatch; i++) {
        let retailers = await supplyChainContract.Product(i);

        if (retailers.productState == 1) {
          let j = 1;
          while (j) {
            try {
              const data = await supplyChainContract.ProductIdToRetailer(
                i,
                j - 1
              );
              if (
                data.retailer.toLowerCase() == ownSupplyChainAddress && data.retailerState == 1) {
                let hour = await dateContract.getHour(
                  data.timeStamp10.toNumber()
                );
                let minute = await dateContract.getMinute(
                  data.timeStamp10.toNumber()
                );
                let second = await dateContract.getSecond(
                  data.timeStamp10.toNumber()
                );
                let day = await dateContract.getDay(
                  data.timeStamp10.toNumber()
                );
                let month = await dateContract.getMonth(
                  data.timeStamp10.toNumber()
                );
                let year = await dateContract.getYear(
                  data.timeStamp10.toNumber()
                );
                if (hour + 5 > 24) {
                  hour = hour + 5 - 24;
                } else {
                  hour += 5;
                }
                if (minute + 35 > 60) {
                  hour++;
                  minute = minute + 35 - 60;
                } else {
                  minute = minute + 35;
                }
                const batchId = retailers.productId.toNumber();
                checkMatVal = 1;
                allsupplymateriallist.push(
                  <>
                    <tr>
                      <td>{batchId}</td>
                      <td>{data.distributor}</td>
                      <td>{retailers.factory}</td>
                      <td>{data.quantity.toNumber()}</td>
                      <td>{retailers.Description}</td>
                      <td>
                        {day}-{month}-{year} {hour}:{minute}:{second}
                      </td>
                      <td>
                        <Button
                          variant="outline-success"
                          onClick={"() => batchRecieve(batchId)"}
                        >
                          Sell
                        </Button>
                      </td>
                    </tr>
                  </>
                );
              }
              j++;
            } catch (err) {
              break;
            }
          }
        }
      }
    }
    if (checkMatVal == 0) {
      allsupplymateriallist.push(
        <>
          <tr>
            <td colSpan="7">No Record Found</td>
          </tr>
        </>
      );
    }

    setMateriallist(allsupplymateriallist);
  };

  useEffect(() => {
    getSupplyChainHandler();
  }, []);

  return (
    <>
      <div className="new">
        <div className="newContainer">
          <div className="top">
            <h4>Sell List</h4>
          </div>
          <div className="bottom">
            <div className="right">
              <table>
                <tr>
                  <th>Batch ID</th>
                  <th>Distributer Address</th>
                  <th>Factory Address</th>
                  <th>Total Quantities</th>
                  <th>Product Description</th>
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
};
export default SellTable;
