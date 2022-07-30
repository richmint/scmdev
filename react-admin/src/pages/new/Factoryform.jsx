import React, { useContext } from 'react';
import "./new.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import { useState } from "react";
import { DarkModeContext } from "../../context/darkModeContext";
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { AddNewUserByAdminSchema } from '../../Validations/Schema';
const Factoryform = ({ inputs, title, value }) => {
  const { dispatch, metaMask, supplyChainContract } = useContext(DarkModeContext);
  const [errorMessage, setErrorMessage] = useState(null);
  const [SCContract, setSCContract] = useState(supplyChainContract);

  const {register, handleSubmit, setError, formState : {errors}} = useForm({
    defaultValues:{
      hashAddress:'',
      name:'',
      email:'',
      address:''
    },
    resolver:yupResolver(AddNewUserByAdminSchema),
  })

  const addFactoryHandler = (event) => {
    console.log(event);
    SCContract.addFactory(event.hashAddress);

    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        "hashAddress":event.hashAddress,
        "name":event.name,
        "email":event.email,
        "address":event.location,
        "password":event.hashAddress,
        "role":'Factory'
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
            <form onSubmit={handleSubmit(addFactoryHandler)}>
              <div className="formInput">
                <label>Factory Hash Address</label>
                <input id="hashAddress" name='hashAddress' type="text" {...register("hashAddress" ,{required:true})} />
                {errors.hashAddress && <span className='error'> {console.log(errors)} {errors?.hashAddress?.message}</span>}
              </div>
              <div className="formInput">
                <label>Factory Name</label>
                <input id="name" name='name' type="text" {...register("name" ,{required:true})} />
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
              <button type={"submit"}> Add Factory </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Factoryform;
