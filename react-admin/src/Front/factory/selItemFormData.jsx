import React, { useEffect, useState, useContext } from "react";
import Navbar from "../../components/front_navbar/Navbar";
import Sidebar from "../../components/front_sidebar/Sidebar";
import '../../style/front/new.scss'

import { DarkModeContext } from "../../context/darkModeContext";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";

import {useForm} from 'react-hook-form';
import { yupResolver } from "@hookform/resolvers/yup"; 
import { SellItemFormDataSchema } from '../../Validations/Schema';

const SellItemFormData = () => {
  let data = useLocation();
  data = data.state.i;
  //console.log("Coming data is ",data);
  const {register, handleSubmit, setError, formState: { errors }} = useForm({
    defaultValues: {
      distributeradrs: '',
    },
    resolver: yupResolver(SellItemFormDataSchema),
  })

  const navigate = useNavigate();
  const { dispatch, metaMask, supplyChainContract, supplyChainTokenContract } = useContext(DarkModeContext);
  const [SChainContract, setSChainContract] = useState(supplyChainContract);

  const sellItemToDistributerHandler = async (event) => {
    // event.preventDefault();
    // console.log("batchid", SChainContract);
    const tx = SChainContract.factorySellItemToDistributors(data, event.distributeradrs);
    //const tx = SChainContract.factorySellItemToDistributors(data, 10, [0x15d34AAf54267DB7D7c367839AAf71A00a2C6A65, 0x9965507D1a55bcC2695C58ba16FB37d819B0A4dc], [5, 5]);
    //console.log((await tx.wait()));
    if(tx){
       navigate("/sellItemToDistributer")
    }
  }

  const DataTable = (props) => {
    const data = props.data;
    return (
      <div className="bottom">
        <div className="right">
          <form onSubmit={handleSubmit(sellItemToDistributerHandler)}>
            <div className="formInput">
              <label>Distributer Address</label>
              <input id="distributeradrs" type="text" name="distributeradrs" {...register("distributeradrs", { required: true })}/>
              {errors.distributeradrs && <span className='error'> {console.log(errors)} {errors?.distributeradrs?.message}</span>}
            </div>
            <div className='formInput'>
              <button type={"submit"}> Submit </button>
            </div>
          </form>
        </div>
      </div>
    )
  }
  return (
    <div className="new">
      <Sidebar />
      <div className="newContainer">
        <Navbar />
        <DataTable data={data} />
      </div>
    </div>
  )
}

export default SellItemFormData