import React, { useEffect, useState, useContext } from 'react';
import '../../style/front/viewSupplyTable.scss'
import { DarkModeContext } from "../../context/darkModeContext";
import { useNavigate } from "react-router-dom";
import Button from 'react-bootstrap/Button';


const SellItemTable = () => {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [materiallist, setMateriallist] = useState(null);

  const { dispatch, metaMask, supplyChainContract, supplyChainTokenContract, ownSupplyChainAddress } = useContext(DarkModeContext);

  const allsupplymateriallist = [];
  const getSupplyChainHandler = async (event) => {
    let userdatarec = '';
    const totalbatchids = (await supplyChainContract.totalBatchs());
    var checkvalue = 0;
    if (totalbatchids > 0) {
      for (let i = 0; i < totalbatchids; i++) {
        const productData = await supplyChainContract.Product(i);
        if (productData.productState === 0 && productData.factory.toLowerCase() === ownSupplyChainAddress.toLowerCase()) {
          checkvalue = 1;

          let j = 1;
          while (j) {
            try {

              const supplychainID =await supplyChainContract.ProductIds(i,j-1);

              console.log("isdjlfjklgjkl",supplychainID.toNumber());
          const productDataBatchRecord = await supplyChainContract.items(supplychainID.toNumber());


              //console.log("productData",productDataBatchRecord)
              //let OGObject = await supplyChainContract.OGDetails(productData.supplyChainId);

              let totalmanufactured = productData.totalUnits.toNumber();
              const rawMaterialRecord = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                  "hashAddress": productDataBatchRecord.RawMaterialSupplierID,
                })
              };
              await fetch("http://162.215.222.118:5150/location", rawMaterialRecord)
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
                  <td>{supplychainID.toNumber()}</td>
                  <td>{productData.productId.toNumber()}</td>
                  <td>{userdatarec && userdatarec }</td>
                  <td>{productData.totalUnits.toNumber()}</td>
                  <td>{productData.Description}</td>
                  <td></td>
                  <td><Button variant="outline-primary" onClick={() => navigate('/viewBatchStatus', { state: { i } })}>View</Button>
                    {productData.productState === 5 ? <Button variant="outline-success" onClick={() => navigate('/SellItemFormData', { state: { i } })}>Continue</Button> : <Button variant="outline-info" onClick={() => navigate('/productQualityCheck', { state: { batchid: i, totalmanufactured: totalmanufactured } })}>Quality Check</Button>}
                  </td>
                </tr></>
              )
              j++;
            } catch (error) {
              break;
            }
          }
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
                  <th>Total Manufactured Item</th>
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
