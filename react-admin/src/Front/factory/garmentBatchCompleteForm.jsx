import React, { useEffect, useState, useContext } from "react";
import Navbar from "../../components/front_navbar/Navbar";
import Sidebar from "../../components/front_sidebar/Sidebar";
import '../../style/front/new.scss'

import { DarkModeContext } from "../../context/darkModeContext";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import {useForm} from 'react-hook-form';
import { yupResolver } from "@hookform/resolvers/yup"; 
import { GarmentBatchCompleteFormSchema } from '../../Validations/Schema';

import GarmentBatchList from "./getTotalBatch";
import { useMemo } from "react";
const GarmentBatchCompleteForm = () =>{
  const [CottonBatchId,setCottonBatchId] = useState();
  const [polysterBatchId,setPolysterBatchId] = useState();
  const [woolBatchId,setWoolBatchId] = useState();
  const [error , seterror]  = useState('')

  let data = useLocation();
  data = data.state.i;
  
  const {register, handleSubmit, setError, formState: { errors }} = useForm({
    defaultValues: { 
      totalitems: '',
      description: '',
    },
    resolver: yupResolver(GarmentBatchCompleteFormSchema),
  })
  

  const navigate = useNavigate();
  const { dispatch, metaMask, supplyChainContract, supplyChainTokenContract } = useContext(DarkModeContext);
  const [SChainContract, setSChainContract] = useState(supplyChainContract);

  const garmentcompleteHandler = async (event) => { 
    if(CottonBatchId != undefined || woolBatchId != undefined || polysterBatchId != undefined ){
      let CottonBatchId = '';
       console.log("woolBatchId",woolBatchId)
       console.log("polysterBatchId",polysterBatchId)
      // console.log("Event",event)
    const tx = await SChainContract.factoryCompleteGarmentManufacturing([0,1,2],event.totalitems,event.description);
    if(tx){
      navigate("/manufactureGarmentMaterial")
   }
    }else{
      seterror("*Select at least one Batch")
    }
  }

  useMemo(() =>{
    seterror('')
  },[CottonBatchId,woolBatchId,polysterBatchId])

    const DataTable = (props)=>{
        const data = props.data;
        return(
            <div className="bottom">
          <div className="right">
            <form onSubmit={handleSubmit(garmentcompleteHandler)}>
            <GarmentBatchList cotfun={setCottonBatchId} polyfun={setPolysterBatchId} woolfun={setWoolBatchId}  />
              <div className="formInput">
                <label>Total Items</label>
                <input id="totalitems"  type="text"  name="totalitems" {...register("totalitems", { required: true })}></input>
                {errors.totalitems && <span className='error'> {console.log(errors)} {errors?.totalitems?.message}</span>}
              </div>
              <div className="formInput">
                <label>Description</label>
                <textarea rows={4} id="description"  type="text" name="description" {...register("description", { required: true })}></textarea>
                {errors.description && <span className='error'> {console.log(errors)} {errors?.description?.message}</span>}
              </div>
              {<span style={{color:"red"}}>{error}</span>}
              <div className='formInput'>
              <button type={"submit"}> Submit </button>
              </div>          
            </form>
          </div>
        </div>
        )
    }
    return(
            <div className="new">
                <Sidebar txt={"facManuGarment"}  />
                <div className="newContainer">
                    <Navbar />
                    <DataTable data={data}  />
                </div>
            </div>
    )
}

export default GarmentBatchCompleteForm