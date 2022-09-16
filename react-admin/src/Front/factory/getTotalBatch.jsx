
import React,{useEffect, useState,useContext} from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from "react-router-dom";
import "../../pages/new/new.scss";
import '../../style/front/new.scss';
import { DarkModeContext } from "../../context/darkModeContext";
import {useForm} from 'react-hook-form';
import { yupResolver } from "@hookform/resolvers/yup"; 
import { CottonMaterialSchema } from '../../Validations/Schema';



const GarmentBatchList = () => {
  const { dispatch, metaMask, supplyChainContract, supplyChainTokenContract, ownSupplyChainAddress } = useContext(DarkModeContext);

  const getSupplyChainHandler = async (event) =>{
    let userdatarec = '';
    const totalbatchids = (await supplyChainContract.totalBatchs()).toNumber();
    console.log("Total bathc",totalbatchids)
    var checkcottonvalue = 0;
    var checkPolyestervalue = 0;
    var checkWoolvalue = 0;
    if(totalbatchids > 0 ){
      for(let i = 0; i<totalbatchids; i++ ){
        let object = await supplyChainContract.items(i);
        // console.log("/indise",object.itemState)
        let OGObject = await supplyChainContract.RawMaterialDetails(object.supplyChainId);
         //console.log("myrecord", OGObject); 
        if(OGObject.rawMaterialType.toNumber() == 1){
          //console.log("0 item value",object)
        }
        let abc = OGObject.filter(x => x.rawMaterialType.toNumber() == 1)
        //console.log("abc valye after filter is ",abc);

        if(OGObject.rawMaterialType.toNumber() == 2){
          //console.log("1 item value",object)
        }
        if(OGObject.rawMaterialType.toNumber() == 3){
          //console.log("2 item value",object)
        }
      }
    }
  }
  useEffect(()=>{
    getSupplyChainHandler();
  },[])
  return (
           <div style={{width: "100%"}}>
            <div className="selectformInput">
                <label>Select Cotton Batches</label>
                <select>
                  <option>1</option>
                  <option>2</option>
                  <option>3</option>
                </select>

                <label>Cotton Value</label>

                <input id="totalitems"  type="text"  name="totalitems1" style={{width: "100%"}}></input>
              </div>
              <div className="selectformInput">
                <label>Select Polyester Batches</label>
                <select>
                  <option>1</option>
                  <option>2</option>
                  <option>3</option>
                </select>
                <label>Polyester Value</label>

                <input id="totalitems"  type="text"  name="totalitems2" style={{width: "100%"}}></input>
              </div>
              <div className="selectformInput">
              <label>Select Wool Batches</label>
              <select>
                <option>1</option>
                <option>2</option>
                <option>3</option>
              </select>
              <label>Wool Value</label>

              <input id="totalitems"  type="text"  name="totalitems3" style={{width: "100%"}}></input>
              </div>
           </div>
  );
};
export default GarmentBatchList;
