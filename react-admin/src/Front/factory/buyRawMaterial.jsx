
import React, { useEffect, useState, useContext } from 'react';
import Navbar from "../../components/front_navbar/Navbar";
import Sidebar from "../../components/front_sidebar/Sidebar";
import '../../style/front/viewSupplyTable.scss'
import { DataGrid } from "@mui/x-data-grid";
import { Link } from "react-router-dom";
import { DarkModeContext } from "../../context/darkModeContext";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";

import {useForm} from 'react-hook-form';
import { yupResolver } from "@hookform/resolvers/yup"; 
import { BuyRawMaterialSchema } from '../../Validations/Schema';

const BuyRawMaterial = () =>{
  let data = useLocation();
  data = data.state.i;
  //console.log("Comming data is",data)
  const {register, handleSubmit, setError, formState: { errors }} = useForm({
    defaultValues: {
      whHashAdr: ''
      // buyPolysterAmount: '',
      // buyCottonAmount:'',
      // buyWoolAmount:''
    },
    resolver: yupResolver(BuyRawMaterialSchema),
  })

 

  const navigate = useNavigate();
  const { dispatch, metaMask, supplyChainContract, supplyChainTokenContract, ownSupplyChainAddress } = useContext(DarkModeContext);
  const buyMaterialHandler = async (event) => {
  console.log("batchid",event.whHashAdr);
    const tx = supplyChainContract.factoryBuyRawMaterial(data, event.whHashAdr);
    //console.log((await tx.wait()));
    if(tx){
       navigate("/availableRawMaterialToBuy")
    }
  }
 
   
    
    const ConfirmShow = (props) =>{
      //const data = props.data
      //const data = props.i
        return(
          <div className="new">
            <div className="newContainer">
              <div className="top">
              <h4>Buy Raw Material</h4>
              </div>
            <div className="bottom">
            <div className="right">
              <form onSubmit={handleSubmit(buyMaterialHandler)}>
                <div className="formInput">
                  <label>Warehouse Address</label>                  
                  <input id="whHashAdr" name="whHashAdr" type="text" {...register("whHashAdr", { required: true })}/>
                  {errors.whHashAdr && <span className='error'> {console.log(errors)} {errors?.whHashAdr?.message}</span>}
                </div>
                {/* <div className="formInput">
                  <label>Buy Polyster Amount</label>                  
                  <input id="buyPolysterAmount" name="buyPolysterAmount"  type="text" {...register("buyPolysterAmount", { required: true })} />
                  {errors.buyPolysterAmount && <span className='error'> {console.log(errors)} {errors?.buyPolysterAmount?.message}</span>}

                </div>
                <div className="formInput">
                  <label>Buy Cotton Amount</label>                  
                  <input id="buyCottonAmount" name="buyCottonAmount"  type="text" {...register("buyCottonAmount", { required: true })} />
                  {errors.buyCottonAmount && <span className='error'> {console.log(errors)} {errors?.buyCottonAmount?.message}</span>}

                </div>
                <div className="formInput">
                  <label>Buy Wool Amount</label>                  
                  <input id="buyWoolAmount" name="buyWoolAmount"  type="text" {...register("buyWoolAmount", { required: true })} />
                  {errors.buyWoolAmount && <span className='error'> {console.log(errors)} {errors?.buyWoolAmount?.message}</span>}

                </div> */}
                <div className='formInput'>
                <button type={"submit"}> Submit </button>
                {/* <span className='left'><button  type='reset' >Reset</button></span> */}
                </div>   
              </form>
            </div>
          </div>
          </div>
          </div>
        )
    }

    return(
        <div className="new">
            <Sidebar txt={"avlRawMatforBuy"} />
            <div className="newContainer">
                <Navbar />
                <ConfirmShow data ={data} />
            </div>
            
        </div>
    )
}

export default BuyRawMaterial