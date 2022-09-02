import React,{useEffect, useState,useContext} from 'react';
import { useSelector, useDispatch } from 'react-redux'
import './AddMaterialForm.scss'
import { useNavigate } from "react-router-dom";
import "../../pages/new/new.scss";
import { DarkModeContext } from "../../context/darkModeContext";
import {useForm} from 'react-hook-form';
import { yupResolver } from "@hookform/resolvers/yup"; 
import { WoolMaterialSchema } from '../../Validations/Schema';

const CottonSupplierForm = ({ inputs, title, value }) => {
  const { dispatch, metaMask,supplyChainContract } = useContext(DarkModeContext);
  const navigate = useNavigate();  
  const {register, handleSubmit, setError, formState: { errors }} = useForm({
    defaultValues: {
      woolDialmeter: '',
      woolStapleLength: '',
      woolFiberLength: '',
      woolCrimpiness: '',
    },
    resolver: yupResolver(WoolMaterialSchema),
  }) 
  const [SChainContract, setSChainContract] = useState(supplyChainContract);
  const [user,setUser] = useState(JSON.parse(sessionStorage.getItem('user'))); 
  const addSupplyWoolHandler = async (event) => {
    console.log("SChainContract",event);
    //console.log(await SChainContract.totalBatchs())
    const tx = await SChainContract.rawMaterialSupplierSuppliesRM(3,[event.woolDialmeter, event.woolStapleLength, event.woolFiberLength, event.woolCrimpiness,0]);
    if(tx){
       navigate("/supplyToken")
    }
  }
  return (
            <form onSubmit={handleSubmit(addSupplyWoolHandler)}>
              <div className='wool-section'>
                <div className="formInput">
                  <label>Fibre diameter or Grade (mm)</label>
                  <input id="woolDialmeter" name="woolDialmeter"  {...register("woolDialmeter", { required: true })} type="text" />
                  {errors.woolDialmeter && <span className='error'> {console.log(errors)} {errors?.woolDialmeter?.message}</span>}
                </div>
                <div className="formInput">
                  <label>Staple length (mm)</label>
                  <input id="woolStapleLength" name="woolStapleLength"  {...register("woolStapleLength", { required: true })} type="text" />
                  {errors.woolStapleLength && <span className='error'> {console.log(errors)} {errors?.woolStapleLength?.message}</span>}
                </div>
                <div className="formInput">
                  <label>Fibre length (mm)</label>
                  <input id="woolFiberLength" name="woolFiberLength"  {...register("woolFiberLength", { required: true })} type="text" />
                  {errors.woolFiberLength && <span className='error'> {console.log(errors)} {errors?.woolFiberLength?.message}</span>}
                </div>
                <div className="formInput">
                  <label>Crimpiness (cm)</label>
                  <input id="woolCrimpiness" name="woolCrimpiness"  {...register("woolCrimpiness", { required: true })} type="number" />
                  {errors.woolCrimpiness && <span className='error'> {console.log(errors)} {errors?.woolCrimpiness?.message}</span>}
                </div>
              </div>
              <div className='formInput'>
              <button type={"submit"}> Submit </button>
              </div>          
            </form>
  );
};
export default CottonSupplierForm;
