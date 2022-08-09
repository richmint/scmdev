import React, { useEffect, useState, useContext } from 'react';
import '../../style/front/viewSupplyTable.scss'
import { DataGrid } from "@mui/x-data-grid";
import { Link } from "react-router-dom";
import { DarkModeContext } from "../../context/darkModeContext";
import { useNavigate } from "react-router-dom";
import Button from 'react-bootstrap/Button';

const AvailabeProductTable = () => {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [materiallist, setMateriallist] = useState(null);

  const { dispatch, metaMask, supplyChainContract, supplyChainTokenContract, ownSupplyChainAddress, dateContract } = useContext(DarkModeContext);



  const allsupplymateriallist = [];
  const getSupplyChainHandler = async (event) => {

    const totalbatch = (await supplyChainContract.totalBatchs());
    //console.log("totalbatch",totalbatch);
    if (totalbatch > 0) {
      for (let i = 0; i < totalbatch; i++) {

        let retailers = await supplyChainContract.getRetailers(i);
        if (retailers.length > 0) {

          for (let k = 0; k < retailers.length; k++) {
           
            if (retailers[k].toLowerCase() == ownSupplyChainAddress.toLowerCase()) {
              let object = await supplyChainContract.items(i);
              //console.log("myrecord",object);
              if (object.itemState === 7) {
 
                console.log("sdfsdfsdf", object)
                let runits = await supplyChainContract.getRetailersUnits(i)
                //console.log("Retailer Unit", runits[k].toNumber());

                let rcounter = await supplyChainContract.getRetailersCounters(i)
                console.log("Availeble Product", rcounter[k].toNumber());

                //console.log("PRoduct Detail",await supplyChainContract.OGDetails(object.supplyChainId));
                const data = await supplyChainContract.timeStamps(object.supplyChainId, object.itemState);
                //console.log(await dateContract.getDay(data.toNumber()),await dateContract.getMonth(data.toNumber()),await dateContract.getYear(data.toNumber()));

                allsupplymateriallist.push(
                  <><tr>
                    <td>{i}</td>
                    <td>{object.factoryID}</td>
                    <td>{object.distributorId}</td>
                    {/* <td>{object.totalUnits.toNumber()}</td> */}
                    <td>{runits[k].toNumber()}</td>
                    {/* <td>{rcounter[k].toNumber()}</td> */}
                    {/*<td>{object.WoolAmount.toNumber()}</td> */}
                    <td>{object.Description}</td>
                    {/* <td>
                      <Button variant="outline-primary" onClick={() => navigate('/viewBatchStatus', { state: { i } })}>View</Button>
                    </td> */}
                  </tr></>
                )

              }
            }
          }
        }
      }
    } else {
      allsupplymateriallist.push(
        <><tr>
          <td colSpan="6">No Record Found</td>
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
            <h4>Available Product List</h4>
          </div>
          <div className="bottom">
            <div className="right">

              <table>
                <tr>
                  <th>Batch ID</th>
                  <th>Factory Address</th>
                  <th>Distributer Address</th>
                  {/* <th>Total Product</th> */}
                  <th>Total Quantities</th>
                  <th>Product Description</th>
                  {/* <th>Sold Product</th> */}
                  {/* <th>Action</th> */}
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

export default AvailabeProductTable
