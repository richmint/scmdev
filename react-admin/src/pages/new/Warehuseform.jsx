import React, { useContext } from 'react';
import "./new.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import { useState } from "react";
import { DarkModeContext } from "../../context/darkModeContext";
import { useNavigate } from "react-router-dom";
import { useForm } from 'react-hook-form';
import { AddNewUserByAdminSchema } from '../../Validations/Schema';
import { yupResolver } from '@hookform/resolvers/yup';

const Warehouseform = ({ inputs, title, value }) => {
  const navigate = useNavigate(); 
  const { dispatch, metaMask, supplyChainContract } = useContext(DarkModeContext);
  const [errorMessage, setErrorMessage] = useState(null);
  const [SCContract, setSCContract] = useState(supplyChainContract);


  const {register, handleSubmit, setError, formState :{errors}} = useForm({
    defaultValues:{
      hashAddress:'',
      name:'',
      email:'',
      address:''
    },
    resolver:yupResolver(AddNewUserByAdminSchema),
  });

  //console.log("SCContract",whContract);
  const addWarehouseHandler = async (event) => {
    console.log("email is ",event);
    console.log("name is ",event);
    // event.preventDefault();
    // console.log("SC Contract", SCContract);
    console.log("Hash add",event.hashAddress)
    const waretxn = await SCContract.addWarehouse(event.hashAddress);
    if(waretxn){
      navigate("/warehouse")
    }
      const requestOptions = {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            "hashAddress":event.hashAddress,
            "name":event.name,
            "email":event.email,
            "address":event.address,
            "password":event.hashAddress,
            "role":'Warehouse'
            })
      };
      fetch('http://162.215.222.118:5150/register', requestOptions)
          .then(response => response.json());
  }


  return (
    <div className="new">
      <Sidebar />
      <div className="newContainer">
        <Navbar />
        <div className="top">
          <h1>{title}</h1>
        </div>
        <div className="bottom">
          <div className="right">
            <form onSubmit={handleSubmit(addWarehouseHandler)}>
              <div className="formInput">
                <label>Warehouse Hash Address</label>
                <input id="hashAddress" name='hashAddress' type="text" { ...register("hashAddress", { required:true })} />
                {errors.hashAddress && <span className='error'> {console.log(errors)} {errors?.hashAddress?.message}</span>}
              </div>
              <div className="formInput">
                <label>Warehouse Name</label>
                <input id="name" name='name' type="text" { ...register("name", {required:true})} />
                {errors.name && <span className='error'> {console.log(errors)} {errors?.name?.message}</span>}
              </div>
              <div className="formInput">
                <label>Email</label>
                <input id="email" name='email' type="email" {...register("email" ,{required:true})} />
                {errors.email && <span className='error'> {console.log(errors)} {errors?.email?.message}</span>}
              </div>
              <div className="formInput">
                <label>Location</label>
                <input id="address" name='address' type="text" {...register('address',{required:true})} />
                {errors.address && <span className='error'> {console.log(errors)} {errors?.address?.message}</span>}
              </div>
              <button type={"submit"}> Submit </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Warehouseform;
