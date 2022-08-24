import React,{useEffect, useState,useContext} from 'react';
import { useSelector, useDispatch } from 'react-redux'
import './AddMaterialForm.scss'
import { useNavigate } from "react-router-dom";
import "../../pages/new/new.scss";
import { DarkModeContext } from "../../context/darkModeContext";
import {useForm} from 'react-hook-form';
import { yupResolver } from "@hookform/resolvers/yup"; 
import { AddMaterialSchema } from '../../Validations/Schema';

const CottonSupplierForm = ({ inputs, title, value }) => {
  const { dispatch, metaMask,supplyChainContract } = useContext(DarkModeContext);
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
    console.log("SChainContract",event);
    //console.log(await SChainContract.totalBatchs())
    const tx = await SChainContract.rawMaterialSupplierSuppliesRM(event.polysteramount, event.cottonamount, event.woolamount);
    if(tx){
       navigate("/supplyToken")
    }
  }
  return (
            <form onSubmit={handleSubmit(addSupplyChainHandler)}>
              <div className='cotton-section'>
                <div className="formInput">
                  <label>Weight(kg)</label>
                  <input id="polysteramount" name="polysteramount"  {...register("polysteramount", { required: true })} type="number" />
                  {errors.polysteramount && <span className='error'> {console.log(errors)} {errors?.polysteramount?.message}</span>}
                </div>
                <div className="formInput">
                  <label>Fibre length(mm)</label>
                  <input id="polysteramount" name="polysteramount"  {...register("polysteramount", { required: true })} type="number" />
                  {errors.polysteramount && <span className='error'> {console.log(errors)} {errors?.polysteramount?.message}</span>}
                </div>
                <div className="formInput">
                  <label>Fibre Strength(g/T)</label>
                  <input id="polysteramount" name="polysteramount"  {...register("polysteramount", { required: true })} type="number" />
                  {errors.polysteramount && <span className='error'> {console.log(errors)} {errors?.polysteramount?.message}</span>}
                </div>
                <div className="formInput">
                  <label>Mike(mm)</label>
                  <input id="polysteramount" name="polysteramount"  {...register("polysteramount", { required: true })} type="number" />
                  {errors.polysteramount && <span className='error'> {console.log(errors)} {errors?.polysteramount?.message}</span>}
                </div>
                <div className="formInput">
                  <label>FQI (Rd)</label>
                  <input id="polysteramount" name="polysteramount"  {...register("polysteramount", { required: true })} type="number" />
                  {errors.polysteramount && <span className='error'> {console.log(errors)} {errors?.polysteramount?.message}</span>}
                </div>
              </div>
              <div className='formInput'>
              <button type={"submit"}> Submit </button>
              </div>          
            </form>
  );
};
export default CottonSupplierForm;
