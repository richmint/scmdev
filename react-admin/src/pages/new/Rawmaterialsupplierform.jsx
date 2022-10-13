import React, { useContext } from 'react';
import "./new.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import { useState } from "react"; 
import { DarkModeContext } from "../../context/darkModeContext";
import { useForm } from 'react-hook-form';
import { AddNewUserByAdminSchema } from '../../Validations/Schema';
import { yupResolver } from '@hookform/resolvers/yup';
const RawMaterialSupplier = ({ inputs, title, value }) => {
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


  const addrawmaterialsupplierHandler = (event) => {
    event.preventDefault();
    // console.log(SCContract);
    // SCContract.addRawMaterialSupplier(event.hashAddress);

    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        "hashAddress":event.hashAddress,
        "name":event.name,
        "email":event.email,
        "address":event.address,
        "role":'Supplier'
        })
  };
  fetch('http://162.215.222.118:5151/register', requestOptions)
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
            <form onSubmit={handleSubmit(addrawmaterialsupplierHandler)}>
              <div className="formInput">
                <label>Raw Material Supplier Hash Address</label>
                <input id="hashAddress" name='hashAddress' type="text" { ...register("hashAddress", { required:true })} />
                {errors.hashAddress && <span className='error'> {console.log(errors)} {errors?.hashAddress?.message}</span>}
              </div>
              <div className="formInput">
                <label>Supplier Name</label>
                <input id="name" name='name' type="text" { ...register("name", {required:true})}  />
                {errors.name && <span className='error'> {console.log(errors)} {errors?.name?.message}</span>}
              </div>
              <div className="formInput">
                <label>Email</label>
                <input id="email" name='email' type="text" {...register("email" ,{required:true})} />
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
export default RawMaterialSupplier;
