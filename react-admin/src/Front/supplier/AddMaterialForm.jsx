import React,{useEffect, useState,useContext} from 'react';
import { useSelector, useDispatch } from 'react-redux'
import './AddMaterialForm.scss'
//import { fetch, success } from './LoginSlice'
//import "./login.scss"
import { useNavigate } from "react-router-dom";

import "../../pages/new/new.scss";
import Navbar from "../../components/front_navbar/Navbar";
import Sidebar from "../../components/front_sidebar/Sidebar"; 

import { DarkModeContext } from "../../context/darkModeContext";

import {useForm} from 'react-hook-form';
import { yupResolver } from "@hookform/resolvers/yup"; 
import { AddMaterialSchema } from '../../Validations/Schema';

const Materialsupplier = ({ inputs, title, value }) => {
  const { dispatch, metaMask,supplyChainContract ,supplyChainTokenContract } = useContext(DarkModeContext);
  const navigate = useNavigate();  
  const {register, handleSubmit, setError, formState: { errors }} = useForm({
    defaultValues: {
      polysteramount: '',
      cottonamount: '',
      woolamount: '',
    },
    resolver: yupResolver(AddMaterialSchema),
  })

  const [SChainContract, setSChainContract] = useState(supplyChainContract);
  const [user,setUser] = useState(JSON.parse(sessionStorage.getItem('user'))); 
  
  const addSupplyChainHandler = async (event) => {
    //event.preventDefault();
   // console.log("SChainContract",SChainContract);
    //console.log(await SChainContract.totalBatchs())
    const tx = await SChainContract.rawMaterialSupplierSuppliesRM(event.polysteramount, event.cottonamount, event.woolamount);
    //console.log((await tx.wait()));
    if(tx){
       navigate("/supplyToken")
    }
  }

 
  return (
    <div className="new">
       <Sidebar txt={"supplierAddBatch"} />
      <div className="newContainer">
        <Navbar />
        <div className="top">          
          <h4>Add Batch</h4>
        </div>
        <div className="bottom">
          <div className="right">
            <form onSubmit={handleSubmit(addSupplyChainHandler)}>
              <div className="formInput">
                <label>Polyster Amount</label>
                <input id="polysteramount" name="polysteramount"  {...register("polysteramount", { required: true })} type="number" />
                {errors.polysteramount && <span className='error'> {console.log(errors)} {errors?.polysteramount?.message}</span>}
              </div>
              <div className="formInput">
                <label>Cotton Amount</label>
                <input id="cottonamount" name="cottonamount" {...register("cottonamount", { required: true })} type="number" />
                {errors.cottonamount && <span className='error'> {console.log(errors)} {errors?.cottonamount?.message}</span>}
              </div>
              <div className="formInput ">
                <label>Wool Amount</label>
                <input id="woolamount" name="woolamount" {...register("woolamount", { required: true })} type="number" />
                {errors.woolamount && <span className='error'> {console.log(errors)} {errors?.woolamount?.message}</span>}
              </div>  
              <div className='formInput'>
              <button type={"submit"}> Submit </button>
              </div>          
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Materialsupplier;
