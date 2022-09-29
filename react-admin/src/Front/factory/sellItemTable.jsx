import React, { useEffect, useState, useContext } from 'react';
import '../../style/front/viewSupplyTable.scss'
import { DarkModeContext } from "../../context/darkModeContext";
import { useNavigate } from "react-router-dom";
import Button from 'react-bootstrap/Button';


const SellItemTable = () => {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [materiallist, setMateriallist] = useState(null);

  const { dispatch, metaMask, supplyChainContract, supplyChainTokenContract, ownSupplyChainAddress, dateContract } = useContext(DarkModeContext);

  const allsupplymateriallist = [];
  const getSupplyChainHandler = async (event) => {
    let userdatarec = '';
    const totalbatchids = (await supplyChainContract.totalProductBatchs());
    var checkvalue = 0;
    if (totalbatchids.toNumber() > 0) {
      for (let i = 0; i < totalbatchids; i++) {


        const productData = await supplyChainContract.Product(i);
        if (productData.productState === 0 && productData.factory.toLowerCase() === ownSupplyChainAddress.toLowerCase() || productData.productState === 1 && productData.factory.toLowerCase() === ownSupplyChainAddress.toLowerCase() && productData.leftUnits > 0) {
          checkvalue = 1;

          const productBatchId = productData.productId.toNumber()
          const createdday = await dateContract.getDay(productData.timeStamp6.toNumber())
          const createmonth = await dateContract.getMonth(productData.timeStamp6.toNumber())
          const createdyear = await dateContract.getYear(productData.timeStamp6.toNumber())

          let hour = await dateContract.getHour(productData.timeStamp6.toNumber())
          let minute = await dateContract.getMinute(productData.timeStamp6.toNumber());
          let second = await dateContract.getSecond(productData.timeStamp6.toNumber());

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

          const batchArray = [];
          let j = 1;
          while (j) {
            try {

              const supplychainID = await supplyChainContract.ProductIds(i, j - 1);
              
              //const productDataBatchRecord = await supplyChainContract.items(supplychainID.toNumber());
              batchArray.push(supplychainID.toNumber())
              console.log("supplychainID",supplychainID.toNumber())
              j++;
            } catch (error) {
              break;
            }
          }

          //console.log("productData",productDataBatchRecord)
          //let OGObject = await supplyChainContract.OGDetails(productData.supplyChainId);

          let totalmanufactured = productData.totalUnits.toNumber();
          const rawMaterialRecord = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              "hashAddress": productData.factory,
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
          allsupplymateriallist.push(
            <><tr>
              <td>{batchArray.join(",")}</td>
              <td>{productData.productId.toNumber()}</td>
              <td>{userdatarec && userdatarec}</td>
              <td>{productData.leftUnits.toNumber()}</td>
              <td>{productData.Description}</td>
              <td>{createdday}-{createmonth}-{createdyear} {hour}:{minute}:{second}</td>
              <td>
                {/* <Button variant="outline-primary" onClick={() => navigate('/viewBatchStatus', { state: { productBatchId } })}>View</Button> */}
                {productData.productState === 0 ? <Button variant="outline-info" onClick={() => navigate('/productQualityCheck', { state: { productBatchId: productBatchId, totalmanufactured: totalmanufactured } })}>Quality Check</Button> : <Button variant="outline-success" onClick={() => navigate('/SellItemFormData', { state: { productBatchId: productBatchId, leftUnits: productData.leftUnits.toNumber() } })}>Continue</Button>}
              </td>
            </tr></>
          )

        }
      }
      if (checkvalue == 0) {
        allsupplymateriallist.push(
          <><tr>
            <td colSpan="7">No Record Found</td>
          </tr></>
        )
      }
    } else {
      allsupplymateriallist.push(
        <><tr>
          <td colSpan="7">No Record Found</td>
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
            <h4>Sell Item to Distributer List</h4>
          </div>
          <div className="bottom">
            <div className="right">
              <table>
                <tr>
                  <th>Batch ID</th>
                  <th>Product ID</th>
                  <th>Raw Material Supplier</th>
                  <th>Manufactured Item</th>
                  <th>Item Type</th>
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

export default SellItemTable
