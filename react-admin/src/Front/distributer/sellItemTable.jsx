import React, { useEffect, useState, useContext } from 'react';
import '../../style/front/viewSupplyTable.scss'
import { DarkModeContext } from "../../context/darkModeContext";
import { useNavigate } from "react-router-dom";
import '../distributer/sellItemTable.scss'
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

const SellItemTable = () => {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [materiallist, setMateriallist] = useState(null);
  const { dispatch, metaMask, supplyChainContract, supplyChainTokenContract, ownSupplyChainAddress, dateContract } = useContext(DarkModeContext);
  const allsupplymateriallist = [];
  const getSupplyChainHandler = async (event) => {
    let userdatarec = '';
    let wareuserdatarec = '';
    let factorydatarec = '';
    const totalProductBatches = await supplyChainContract.totalProductBatchs();
    var checkvalue = 0;
    if (totalProductBatches > 0) {
      for (let i = 0; i < totalProductBatches; i++) {
        const productData = await supplyChainContract.Product(i);
        if (productData.productState === 1) {

          let j = 1;
          while (j) {
            try {
              const recieveProductData = await supplyChainContract.ProductIdToDistributor(i,j-1);
                console.log("productData", productData);
                console.log("recieveProductData", recieveProductData);
               if(recieveProductData.distributor.toLowerCase() == ownSupplyChainAddress.toLowerCase() && recieveProductData.distributorState==1 && recieveProductData.quantityLeft.toNumber() > 0){
              var checkvalue = 1;
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
              const warehouseRecord = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                  "hashAddress": productData.factory,
                })
              };
              await fetch("http://162.215.222.118:5151/location", warehouseRecord)
                .then(res => res.json())
                .then(data => {
                  if (data) {
                    wareuserdatarec = data.username
                  }
                }).catch((error) => {
                  console.error('Error:', error);
                });
              const factoryRecord = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                  "hashAddress": productData.factory,
                })
              };
              await fetch("http://162.215.222.118:5151/location", factoryRecord)
                .then(res => res.json())
                .then(data => {
                  if (data) {
                    factorydatarec = data.username
                  }
                }).catch((error) => {
                  console.error('Error:', error);
                });


                let hour =await dateContract.getHour(recieveProductData.timeStamp8.toNumber())
            let minute =await dateContract.getMinute(recieveProductData.timeStamp8.toNumber());
            let second =await dateContract.getSecond(recieveProductData.timeStamp8.toNumber());

            if(hour+5>24){
              hour = ((hour+5) -24);
            }else{
              hour +=5;
            }
            if(minute+35> 60){
              hour++;
              minute = ((minute+35)-60);
            }else{
              minute=minute+35;
            }

            const createdday = await dateContract.getDay(recieveProductData.timeStamp8.toNumber())
            const createmonth = await dateContract.getMonth(recieveProductData.timeStamp8.toNumber())
            const createdyear = await dateContract.getYear(recieveProductData.timeStamp8.toNumber())



            const batchReceiveHandler = async (event) => {
              const tx = supplyChainContract.distributorReceivesProductBatch(event.productBatch);
              console.log("event",event);
              if(tx){
                 navigate("/availabelItemToSellRetailer")
              }
            }

            const handleSubmit = (e) =>{
              e.preventDefault();
              const data = {
                productBatch:productData.productId.toNumber(),
              }
              batchReceiveHandler(data)
            }

            const productBatchId = productData.productId.toNumber();
              allsupplymateriallist.push(
                <>
                  <div className="bottom">
                    <div className="right">
                      <Card style={{ width: '80rem' }}>
                        <Card.Body>
                          <Card.Text style={{ width: '50%', float: 'left' }}>
                            <p><b>Product ID : </b> {productData && productData.productId.toNumber()} </p>
                            <p><b>Raw Material Supplier : </b>Babulal Saini</p>
                            <p><b>Warehouse Address : </b> Vipin Yadav</p>
                            <p><b>Factory Address : </b> {factorydatarec && factorydatarec}</p>
                          </Card.Text>
                          <Card.Text style={{ width: '50%', float: 'left' }}>
                            <p></p>
                            {/* <p><b>Raw Material  : </b> {object.PolyesterAmount.toNumber()} Kg Polyster,{object.CottonAmount.toNumber()} kg Cotton,{object.WoolAmount.toNumber()}Kg Wool</p>*/}
                            <p><b>Product Quantity : </b> {recieveProductData && recieveProductData.quantityLeft.toNumber()}</p> 
                            <p><b>Description : </b> {productData && productData.Description}</p>
                            <p><b>Date : </b> {createdday}-{createmonth}-{createdyear} {hour}:{minute}:{second}</p>
                          </Card.Text> 
                          <Card.Text style={{ float: 'right' }}>
                            <Button variant="outline-success" onClick={() => navigate('/sellToRetailer', { state: { productBatchId:productBatchId,productQty:recieveProductData.quantityLeft.toNumber() } })}>Sell To Retailer</Button>
                          </Card.Text>
                        </Card.Body>
                      </Card>
                    </div>
                  </div>
                </>
              )
                  }
              j++;
            } catch (error) {
              break;
            }
          }
        }

      }
      if (checkvalue == 0) {
        allsupplymateriallist.push(
          <><div className="bottom">
            <div className="right">
              <p>No Record Found</p>
            </div>
          </div>
          </>
        )
      }
    } else {
      allsupplymateriallist.push(
        <><div className="bottom">
          <div className="right">
            <p>No Record Found</p>
          </div>
        </div></>
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
            <h4>Available Sell Item</h4>
          </div>
          <div style={{ display: 'flex', width: '100%', flexDirection: 'column', justifyContent: "center" }}>
            {materiallist}
          </div>
        </div>
      </div>
    </>
  );
}
export default SellItemTable
