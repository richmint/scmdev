import React from 'react';
import { useDispatch } from 'react-redux'
import {useForm} from 'react-hook-form';
import { setToken } from './LoginSlice'
import "./login.scss"
import { useNavigate } from "react-router-dom";
import { useSignInMutation } from '../../API/adminAuth';
import { useCallback } from 'react';
import { useEffect } from 'react';
const Login = () => {
  const [signIn,{data,isError,error,isSuccess,isLoading}] = useSignInMutation();
  const navigate = useNavigate();
  const {register, handleSubmit, formState: { errors }} = useForm({
    defaultValues: {
      email: '',
      password: ''
    }
  });
 
  const dispatch = useDispatch();
  useEffect(()=> {
    if(isSuccess && data){
        localStorage.setItem("auth_token",data.token)
        dispatch(setToken(data));
        navigate("/admin/home");
    }
  },[isSuccess]) 

  const onSubmit = (values) => {
    signIn({...values, "role":"Supplier"});
  }
 
  const renderForm = () => (
    <div className="form admin-login">
     <form onSubmit={handleSubmit(onSubmit)}>
        <div className="input-container">
          <label>Username </label>
          <input type="text"  {...register("email", { required: true })} />
          {errors.email && <span>This field is required</span>}
        </div>
        <div className="input-container">
          <label>Password </label>
          <input type="password" {...register("password", { required: true })} />
          {errors.password && <span>This field is required</span>}
        </div>
        {!isLoading &&
          <div className="button-container">
            <input type="submit" />
          </div>
        }
      </form>
    </div>
  );

  return (
    <div className="app">
      <div className="login-form">
        <div className="title">Admin Login</div>
        {renderForm()}
      </div>
    </div>
  );
}

export default Login