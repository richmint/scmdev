import React, { useEffect, useState, useContext } from "react";
import "../../pages/new/new.scss";
import "../../style/front/new.scss";
import { DarkModeContext } from "../../context/darkModeContext";

const GarmentBatchList = () => {
  const {dispatch,metaMask,supplyChainContract,supplyChainTokenContract,ownSupplyChainAddress} = useContext(DarkModeContext);

   const [cottonBatchList,setCottonBatchList] = useState();
   const [polysterBatchList,setPolysterBatchList] = useState();
   const [woolBatchList,setWoolBatchList] = useState();
  const cottonBatch = [];
  const polyesterBatch = [];
  const woolBatch = [];

  const getSupplyChainHandler = async (event) => {
    const totalbatchids = (await supplyChainContract.totalBatchs()).toNumber();
    if (totalbatchids > 0) {
      for (let i = 0; i < totalbatchids; i++) {
        let object = await supplyChainContract.items(i);
        if (object.itemState === 4 && object.factoryID1.toLowerCase() == ownSupplyChainAddress.toLowerCase() || object.factoryID2.toLowerCase() == ownSupplyChainAddress.toLowerCase() || object.factoryID3.toLowerCase() == ownSupplyChainAddress.toLowerCase()) {
          let OGObject = await supplyChainContract.RawMaterialDetails(object.supplyChainId);

          if (OGObject.rawMaterialType.toNumber() == 1) {
            const cottonBatchId = object.supplyChainId.toNumber();
            cottonBatch.push(
              <option>{cottonBatchId}</option>
            )
          } 
          if (OGObject.rawMaterialType.toNumber() == 2) {
            const polysterBatchId = object.supplyChainId.toNumber();
            polyesterBatch.push(
              <option>{polysterBatchId}</option>
            )
          }
          if (OGObject.rawMaterialType.toNumber() == 3) {
            const woolBatchId = object.supplyChainId.toNumber();
            woolBatch.push(
              <option>{woolBatchId}</option>
            )
          }
        }
      }
      setCottonBatchList(cottonBatch);
      setPolysterBatchList(polyesterBatch)
      setWoolBatchList(woolBatch)
    }
  };

  useEffect(() => {
    getSupplyChainHandler();
  }, []);

  return (
    
    <div style={{ width: "100%" }}>
      <div className="selectformInput">
        <label>Select Cotton Batches</label>
        <select>
          {cottonBatchList}
        </select>
      </div>
      <div className="selectformInput">
        <label>Select Polyester Batches</label>
        <select>
          {polysterBatchList}
        </select>
      </div>
      <div className="selectformInput">
        <label>Select Wool Batches</label>
        <select>
        {woolBatchList}
        </select>
      </div>
    </div>
  );
};
export default GarmentBatchList;
