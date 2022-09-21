import React, { useEffect, useState, useContext } from "react";
import "../../pages/new/new.scss";
import "../../style/front/new.scss";
import { DarkModeContext } from "../../context/darkModeContext";

const GarmentBatchList = (props) => {
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
        let j=1;
     while(j){
       try {
        

        let object = await supplyChainContract.items(i);
        const manufactureData = await supplyChainContract.IdToFactory(i, j - 1);

        if (manufactureData.itemState === 3 && manufactureData.factory.toLowerCase() == ownSupplyChainAddress.toLowerCase()) {
          let OGObject = await supplyChainContract.RawMaterialDetails(object.supplyChainId);

          if (OGObject.rawMaterialType.toNumber() == 1) {
            const cottonBatchId = object.supplyChainId.toNumber();
            cottonBatch.push(
              <option value={cottonBatchId}>{cottonBatchId}</option>
            )
          } 
          if (OGObject.rawMaterialType.toNumber() == 2) {
            const polysterBatchId = object.supplyChainId.toNumber();
            polyesterBatch.push(
              <option value={polysterBatchId}>{polysterBatchId}</option>
            )
          }
          if (OGObject.rawMaterialType.toNumber() == 3) {
            const woolBatchId = object.supplyChainId.toNumber();
            woolBatch.push(
              <option value={woolBatchId}>{woolBatchId}</option>
            )
          }
        }
        j++; 
      } catch (error) {
        break;
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
      {cottonBatchList &&  cottonBatchList ?  <div className="selectformInput">
        <label>Select Cotton Batches</label>
        <select  onChange={(e) => props.cotfun(e.target.value)}>
        <option value={''}>Select Batch</option>
          {cottonBatchList}
        </select>
      </div>:''}
      {polysterBatchList && polysterBatchList ?<div className="selectformInput">
        <label>Select Polyester Batches</label>
        <select  onChange={(e) => props.polyfun(e.target.value)} >
        <option value={''}>Select Batch</option>
          {polysterBatchList}
        </select>
      </div> :"" }
      {woolBatchList && woolBatchList ?  <div className="selectformInput">
        <label>Select Wool Batches</label>
        <select  onChange={(e) => props.woolfun(e.target.value)} >
        <option value={''}>Select Batch</option>
        {woolBatchList}
        </select>
      </div>:""}
    </div>
  );
};
export default GarmentBatchList;
