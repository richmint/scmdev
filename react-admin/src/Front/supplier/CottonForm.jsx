import React,{useEffect, useState,useContext} from 'react';
import { useSelector, useDispatch } from 'react-redux'
import './AddMaterialForm.scss'
import { useNavigate } from "react-router-dom";
import "../../pages/new/new.scss";
import { DarkModeContext } from "../../context/darkModeContext";
import {useForm} from 'react-hook-form';
import { yupResolver } from "@hookform/resolvers/yup"; 
import { CottonMaterialSchema } from '../../Validations/Schema';

const CottonSupplierForm = ({ inputs, title, value }) => {
  const { dispatch, metaMask,supplyChainContract } = useContext(DarkModeContext);
  const navigate = useNavigate();  
  const {register, handleSubmit, setError, formState: { errors }} = useForm({
    defaultValues: {
      CottonWeight: '',
      fiberlength: '',
      fiberStrength: '',
      cottonMike:'',
      fqi: '',
    },
    resolver: yupResolver(CottonMaterialSchema),
  })
  const [SChainContract, setSChainContract] = useState(supplyChainContract);
  const [user,setUser] = useState(JSON.parse(sessionStorage.getItem('user'))); 
  const addSupplyCottonHandler = async (event) => {
    const tx = await SChainContract.rawMaterialSupplierSuppliesRM(event.polysteramount, event.cottonamount, event.woolamount);
    if(tx){
       navigate("/supplyToken")
    }
  }
  return (
            <form onSubmit={handleSubmit(addSupplyCottonHandler)}>
              <div className='cotton-section'>
                <div className="formInput">
                  <label>Weight(kg)</label>
                  <input id="CottonWeight" name="CottonWeight"  {...register("CottonWeight", { required: true })} type="text" />
                  {errors.CottonWeight && <span className='error'> {console.log(errors)} {errors?.CottonWeight?.message}</span>}
                </div>
                <div className="formInput">
                  <label>Fibre length(mm)</label>
                  <input id="fiberlength" name="fiberlength"  {...register("fiberlength", { required: true })} type="text" />
                  {errors.fiberlength && <span className='error'> {console.log(errors)} {errors?.fiberlength?.message}</span>}
                </div>
                <div className="formInput">
                  <label>Fibre Strength(g/T)</label>
                  <input id="fiberStrength" name="fiberStrength"  {...register("fiberStrength", { required: true })} type="text" />
                  {errors.fiberStrength && <span className='error'> {console.log(errors)} {errors?.fiberStrength?.message}</span>}
                </div>
                <div className="formInput">
                  <label>Mike(mm)</label>
                  <input id="cottonMike" name="cottonMike"  {...register("cottonMike", { required: true })} type="text" />
                  {errors.cottonMike && <span className='error'> {console.log(errors)} {errors?.cottonMike?.message}</span>}
                </div>
                <div className="formInput">
                  <label>FQI (Rd)</label>
                  <input id="fqi" name="fqi"  {...register("fqi", { required: true })} type="text" />
                  {errors.fqi && <span className='error'> {console.log(errors)} {errors?.fqi?.message}</span>}
                </div>
              </div>
              <div className='formInput'>
              <button type={"submit"}> Submit </button>
              </div>          
            </form>
  );
};
export default CottonSupplierForm;
