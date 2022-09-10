import React, { useEffect, useState, useContext } from 'react';
import '../../style/front/viewSupplyTable.scss'
import { DarkModeContext } from "../../context/darkModeContext";
import { useNavigate } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const RawMaterialTable = () => {
  const notify = () => toast("Wow so easy!");
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [materiallist, setMateriallist] = useState(null);
  const [polysterlist, setPolysterlist] =  useState(null);
  const [woollist, setWoollist] =  useState(null);

  const { dispatch, metaMask, supplyChainContract, supplyChainTokenContract, ownSupplyChainAddress } = useContext(DarkModeContext);

  const allsupplymateriallist = [];
  const allPolyesterlist = [];
  const allWoollist = [];
  const getSupplyChainHandler = async (event) => {
    let userdatarec = '';
    const totalbatchids = (await supplyChainContract.totalBatchs()).toNumber();
    var checkcottonvalue = 0;
    var checkPolyestervalue = 0;
    var checkWoolvalue = 0;
    if (totalbatchids > 0) {
      for (let i = 0; i < totalbatchids; i++) {
        let object = await supplyChainContract.items(i);
        let OGObject = await supplyChainContract.RawMaterialDetails(object.supplyChainId);
        console.log("myrecord", OGObject);
        // let rawMaterial1 = OGObject.rawMaterial1.toNumber();
        // let rawMaterial2 = OGObject.rawMaterial2.toNumber();
        // let rawMaterial3 = OGObject.rawMaterial3.toNumber();

        if (object.itemState === 0) {
          const rawMaterialRecord = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              "hashAddress": object.RawMaterialSupplierID,
            })
          };
          await fetch("http://162.215.222.118:5150/location", rawMaterialRecord)
            .then(res => res.json())
            .then(data => {
              if (data) {
                userdatarec = data.username
              }
            })
            .catch((error) => {
              console.error('Error:', error);
            });
          if(OGObject.rawMaterialType.toNumber() == 1){
            checkcottonvalue = 1;
            allsupplymateriallist.push(
              <>
                <tr> 
                  <td>{i}</td>
                  <td> {userdatarec && userdatarec}</td>
                  <td>{OGObject.rawMaterial1.toNumber()}</td>
                  <td>{OGObject.rawMaterial2.toNumber()}</td>
                  <td>{OGObject.rawMaterial3.toNumber()}</td>
                  <td>{OGObject.rawMaterial4.toNumber()}</td>
                  <td>{OGObject.rawMaterial5.toNumber()}</td>
                  <td>{object.itemState === 0 ? <Button variant="outline-success" onClick={() => navigate('/BuyRawMaterial', { state: { id:i,materialType:1,rawMaterial1:OGObject.rawMaterial1.toNumber(),rawMaterial2:OGObject.rawMaterial2.toNumber(),rawMaterial3:OGObject.rawMaterial3.toNumber(),rawMaterial4:OGObject.rawMaterial4.toNumber(),rawMaterial5:OGObject.rawMaterial5.toNumber() } })}>Buy</Button> : <Button variant="outline-info" onClick={() => navigate('/rawMaterialQualityCheck', { state: { id: i} })}>Quality Check</Button>}</td>

                </tr>
              </>
            )
        }
        if(OGObject.rawMaterialType.toNumber() == 2){
          checkPolyestervalue = 1;
          allPolyesterlist.push(
            <>
              <tr> 
                <td>{i}</td>
                <td> {userdatarec && userdatarec}</td>
                <td>{OGObject.rawMaterial1.toNumber()}</td>
                <td>{OGObject.rawMaterial2.toNumber()}</td>
                <td>{OGObject.rawMaterial3.toNumber()}</td>
                <td>{OGObject.rawMaterial4.toNumber()}</td>
                <td>{object.itemState === 0 ? <Button variant="outline-success" onClick={() => navigate('/BuyRawMaterial', { state: { id:i,materialType:2,rawMaterial1:OGObject.rawMaterial1.toNumber(),rawMaterial2:OGObject.rawMaterial2.toNumber(),rawMaterial3:OGObject.rawMaterial3.toNumber(),rawMaterial4:OGObject.rawMaterial4.toNumber() } })}>Buy</Button> : <Button variant="outline-info" onClick={() => navigate('/rawMaterialQualityCheck', { state: { id: i} })}>Quality Check</Button>}</td>
              </tr>
            </>
          )
        }
        if(OGObject.rawMaterialType.toNumber() == 3){
          checkWoolvalue = 1;
          allWoollist.push( 
            <>
              <tr> 
                <td>{i}</td>
                <td> {userdatarec && userdatarec}</td>
                <td>{OGObject.rawMaterial1.toNumber()}</td>
                <td>{OGObject.rawMaterial2.toNumber()}</td>
                <td>{OGObject.rawMaterial3.toNumber()}</td>
                <td>{OGObject.rawMaterial4.toNumber()}</td>
                <td>{object.itemState === 0 ? <Button variant="outline-success" onClick={() => navigate('/BuyRawMaterial', { state: { id:i,materialType:3,rawMaterial1:OGObject.rawMaterial1.toNumber(),rawMaterial2:OGObject.rawMaterial2.toNumber(),rawMaterial3:OGObject.rawMaterial3.toNumber(),rawMaterial4:OGObject.rawMaterial4.toNumber() } })}>Buy</Button> : <Button variant="outline-info" onClick={() => navigate('/rawMaterialQualityCheck', { state: { id: i} })}>Quality Check</Button>}</td>
              </tr>
            </>
          )
        }
        }
      }
      if(checkcottonvalue == 0) {
            allsupplymateriallist.push(
              <><tr>
                <td colSpan="8">No Record Found</td>
              </tr></>
            )
        }
    if(checkPolyestervalue == 0) {
          allPolyesterlist.push(
            <><tr>
              <td colSpan="7">No Record Found</td>
            </tr></>
          )
      }
      if(checkWoolvalue == 0) {
          allWoollist.push(
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
      allPolyesterlist.push(
        
        <><tr>
          <td colSpan="7">No Record Found</td>
        </tr></>
      )
      allWoollist.push(
        <><tr>
          <td colSpan="7">No Record Found</td>
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
            <h4>Raw Material List</h4>
          </div>
          {/* <button onClick={notify}>Notify!</button>
          <ToastContainer
            position="bottom-right"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            /> */}
          <div className="bottom">
            <div className="right">
            <h6>Cotton List</h6>
              <table>
                <tr>
                  <th>Batch ID</th>
                  <th>Raw Material Supplier</th>
                  <th>Weight (kg)</th>
                  <th>Fibre length (mm)</th>
                  <th>Fibre Strength (g/T)</th>
                  <th>Mike(mm)</th>
                  <th>FQI (Rd)</th>
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
                  <th>FMax (kN)</th>
                  <th>EMax (%)</th>
                  <th>Neps (%)</th>
                  <th>Cvm (%)</th>
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
                  <th>Fibre diameter or Grade (mm)</th>
                  <th>Staple length (mm)</th>
                  <th>Fibre length (mm)</th>
                  <th>Crimpiness (cm)</th>
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

export default RawMaterialTable;


