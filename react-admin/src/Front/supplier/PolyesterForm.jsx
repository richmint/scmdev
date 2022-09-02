import React,{useEffect, useState,useContext} from 'react';
import { useSelector, useDispatch } from 'react-redux'
import './AddMaterialForm.scss'
import { useNavigate } from "react-router-dom";
import "../../pages/new/new.scss";
import { DarkModeContext } from "../../context/darkModeContext";
import {useForm} from 'react-hook-form';
import { yupResolver } from "@hookform/resolvers/yup"; 
import { PolyesterMaterialSchema } from '../../Validations/Schema';

const PolysterSupplierForm = ({ inputs, title, value }) => {
  const { dispatch, metaMask,supplyChainContract } = useContext(DarkModeContext);
  const navigate = useNavigate();  
  const {register, handleSubmit, setError, formState: { errors }} = useForm({
    defaultValues: {
      polyesterFmax: '',
      polyesteremax: '',
      polyesterNeps: '',
      polysterCvm: '',
    },
    resolver: yupResolver(PolyesterMaterialSchema),
  })
  const [SChainContract, setSChainContract] = useState(supplyChainContract);
  const [user,setUser] = useState(JSON.parse(sessionStorage.getItem('user'))); 
  const addSupplyPolyesterHandler = async (event) => {
    console.log("SChainContract",event);
    //console.log(await SChainContract.totalBatchs())
    const tx = await SChainContract.rawMaterialSupplierSuppliesRM(2,[event.polyesterFmax, event.polyesteremax, event.polyesterNeps, event.polysterCvm,0]);
    if(tx){
       navigate("/supplyToken")
    }
  }
  return (
            <form onSubmit={handleSubmit(addSupplyPolyesterHandler)}>
              <div className='polyester-section'>
                <div className="formInput">
                  <label>FMax (kN)</label>
                  <input id="polyesterFmax" name="polyesterFmax"  {...register("polyesterFmax", { required: true })} type="text" />
                  {errors.polyesterFmax && <span className='error'> {console.log(errors)} {errors?.polyesterFmax?.message}</span>}
                </div>
                <div className="formInput">
                  <label>EMax (%)</label>
                  <input id="polyesteremax" name="polyesteremax"  {...register("polyesteremax", { required: true })} type="text" />
                  {errors.polyesteremax && <span className='error'> {console.log(errors)} {errors?.polyesteremax?.message}</span>}
                </div>
                <div className="formInput">
                  <label>Neps (%)</label>
                  <input id="polyesterNeps" name="polyesterNeps"  {...register("polyesterNeps", { required: true })} type="text" />
                  {errors.polyesterNeps && <span className='error'> {console.log(errors)} {errors?.polyesterNeps?.message}</span>}
                </div>
                <div className="formInput">
                  <label>CVm (%)</label>
                  <input id="polysterCvm" name="polysterCvm"  {...register("polysterCvm", { required: true })} type="number" />
                  {errors.polysterCvm && <span className='error'> {console.log(errors)} {errors?.polysterCvm?.message}</span>}
                </div>
              </div>
              <div className='formInput'>
              <button type={"submit"}> Submit </button>
              </div>          
            </form>
  );
};
export default PolysterSupplierForm;
