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
const GarmentBatchCompleteForm = () =>{
  const [CottonBatchId,setCottonBatchId] = useState();
  const [polysterBatchId,setPolysterBatchId] = useState();
  const [woolBatchId,setWoolBatchId] = useState();

  let data = useLocation();
  data = data.state.i;
  //console.log("Coming data is ",data);
  
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
    // event.preventDefault();
    console.log("CottonBatchId",CottonBatchId)
     console.log("batchid",event);
    
    const tx = SChainContract.factoryCompleteGarmentManufacturing(0,1, event.totalitems,event.description);
    //console.log((await tx.wait()));
    if(tx){
       navigate("/manufactureGarmentMaterial")
    }
  }

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