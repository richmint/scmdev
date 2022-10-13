
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

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const StoreInWarehouse = () =>{

  const notify = () => toast("Wow so easy!");
  //const BuyRawMaterial = async (event) => {
const[wareHouseMaterialList,setwareHouseMaterialList] = useState();
let distributeruserrec = '';
  let storeData = useLocation();
 // console.log("Comming data is",storeData.state.id)
  const {register, handleSubmit, setError, formState: { errors }} = useForm({
    defaultValues: {
      whHashAdr: ''
    },
    resolver: yupResolver(BuyRawMaterialSchema),
  })
  const navigate = useNavigate();
  const { dispatch, metaMask, supplyChainContract, ownSupplyChainAddress } = useContext(DarkModeContext);
  const buyMaterialHandler = async (event) => {
    const tx = supplyChainContract.factoryReceiveRawMaterials(storeData.state.id, event.whHashAdr);
    //console.log((await tx.wait()));
    if(tx){
       navigate("/availableRawMaterialToWarehouse")
    }
  }
  
  useEffect (() =>{
    getWarehouseList()
  },[])
  const listItems = [];
  function getWarehouseList(){
    fetch("http://162.215.222.118:5151/warehouse")
         .then(result=>result.json())
         .then(data => {
          if(data){
            setwareHouseMaterialList(data)
          }
        })
      }
      const SelectList = (props) =>{
        const data = props.val;
        return(
          <option value={data.hashAddress}>{data.name}</option>
        )
      }
    const ConfirmShow = (props) =>{
        return(
          <div className="new">
            <div className="newContainer">
              <div className="top">
              <h4>Buy Raw Material</h4>
              </div>
              {/* <button onClick={notify}>Notify!</button>
        <ToastContainer /> */}
            <div className="bottom">
            <div className="right">
              <form onSubmit={handleSubmit(buyMaterialHandler)}>
                <div className="formInput"> 
                  <label>Warehouse Address</label>  
                  <select id="whHashAdr" name="whHashAdr" {...register("whHashAdr", { required: true })} style={{width: "100%",height: "40px"}}>
                  {wareHouseMaterialList && wareHouseMaterialList.map((val) => {return <SelectList val={val} />})}
                  </select>                 
                   {/* <input id="whHashAdr" name="whHashAdr" value={'0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC'} type="hidden" {...register("whHashAdr", { required: true })}/> */}
                  {errors.whHashAdr && <span className='error'> {console.log(errors)} {errors?.whHashAdr?.message}</span>}
                </div>
                
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
                <ConfirmShow storeData ={storeData} />
            </div>
            
        </div>
    )
}

export default StoreInWarehouse