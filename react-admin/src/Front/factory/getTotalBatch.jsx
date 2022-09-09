
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
