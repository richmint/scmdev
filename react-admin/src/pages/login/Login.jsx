import React from 'react';
import { useDispatch } from 'react-redux'
import {useForm} from 'react-hook-form';
import { setToken } from './LoginSlice'
import "./login.scss"
import { useNavigate } from "react-router-dom";
import { useSignInMutation } from '../../API/adminAuth';
import { useEffect } from 'react';
import { yupResolver } from "@hookform/resolvers/yup"; 
import { LoginSchema } from '../../Validations/Schema';
import LoadingButton from '@mui/lab/LoadingButton';
const Login = () => {
  const [signIn,{data,isError,error,isSuccess,isLoading}] = useSignInMutation();
  const navigate = useNavigate();
  const {register, handleSubmit, setError, formState: { errors, }} = useForm({
    defaultValues: {
      email: '',
      password: ''
    },
    resolver: yupResolver(LoginSchema),
  });


  useEffect(()=> {
    if(isError && error){
        let errorMsg = error?.data?.error;
        setError("password",{ message: errorMsg });
    }
  },[isError]) 

  const dispatch = useDispatch();
  useEffect(()=> {
    if(isSuccess && data){
        localStorage.setItem("auth_token",data.token)
        dispatch(setToken(data));
        navigate("/admin/home");
    }
  },[isSuccess]) 

  const onSubmit = (values) => {
    signIn({...values, "role":"admin"});
  }
 
  const renderForm = () => (
    <div className="form">
     <form onSubmit={handleSubmit(onSubmit)}>
        <div className="box">
          <label>Username </label>
          <input type="text" style={{width:300,height:20}}  {...register("email")} />
          {errors.email && <span className='error'> {errors?.email?.message}</span>}
        </div>
        <div className="box">
          <label>Password </label>
          <input type="password" style={{width:300,height:20}} {...register("password")} />
          {errors.password && <span className='error'> {errors?.password?.message}</span>}
        </div>
        <div className='btnDiv' style={{marginTop:10}}>
          <LoadingButton onClick={handleSubmit(onSubmit)} loading={isLoading} variant="contained">
            Submit
          </LoadingButton>
        </div>
      </form>
    </div>
  );

  return (
    <div className='mainDiv'>
      <div className="login-form">
        <div className="title">Admin Login</div>
        {renderForm()}
      </div>
    </div>
      
  );
}

export default Login