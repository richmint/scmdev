import React,{useEffect, useState} from 'react';
import { useSelector, useDispatch } from 'react-redux'
import {useForm} from 'react-hook-form';
import "./login.scss"
import { useNavigate } from "react-router-dom";
import { yupResolver } from "@hookform/resolvers/yup"; 
import { LoginSchema } from '../../Validations/Schema';
import LoadingButton from '@mui/lab/LoadingButton';
import { useSignInMutation } from '../../API/auth';
import { setToken } from './LoginSlice'

const Login = () => { 
  const [signIn,{data,isError,error,isSuccess,isLoading}] = useSignInMutation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {register, handleSubmit, setError, formState: { errors }} = useForm({
    defaultValues: {
      email: '',
      password: ''
    },
    resolver: yupResolver(LoginSchema),
  })

  useEffect(()=> {
    if(isError && error){
        let errorMsg = error?.data?.error;
        setError("password",{ message: errorMsg });
    }
  },[isError]) 

  useEffect(()=> {
    if(isSuccess && data){
      
        localStorage.setItem("token",data.token)
        localStorage.setItem("userId",data.userId)
        localStorage.setItem("userEmail",data.userEmail)
        localStorage.setItem("userRole",data.userRole)
        dispatch(setToken(data));
        navigate("/material-supplier");
    }
  },[isSuccess]) 

  const state = useSelector((state) => state);
 
  const [errorMessages, setErrorMessages] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);
 
  const onSubmit = (values) => {
    signIn({...values});
  }

  // const onSubmit = (values) => {
  //   console.log("login form values",values.username)
  //   const requestOptions = {
  //     method: 'POST',
  //     headers: { 'Content-Type': 'application/json' },
  //     body: JSON.stringify({       
  //       "email":values.username,       
  //       "password":values.password,
  //       "role":'Supplier'
  //       })
  //   };

  //   fetch("http://162.215.222.118:5150/login",requestOptions)    
  //   .then(res => res.json())
  //   .then(data => {
  //     if(data && data.token){
  //       console.log('Success2:', data.token);
  //       sessionStorage.setItem('user',JSON.stringify(values));
  //       navigate("/material-supplier")
  //     }else{
  //       navigate("/userlogin")
  //     }
     
  //   })
  //   .catch((error) => {
  //     console.error('Error11:', error);
  //   });
  //   //dispatch();
  //   //dispatch(success(data))
    
  // }

  // JSX code for login form
  
  const renderForm = () => (
    <div className='form' >
     <form onSubmit={handleSubmit(onSubmit)}>
        <div className='box' >
          <label>Username </label>
          <input style={{width:300,height:20}} type="text"  {...register("email", { required: true })} />
          {errors.email && <span className='error'> {console.log(errors)} {errors?.email?.message}</span>}
        </div>
        <div className='box' >
          <label>Password </label>
          <input type="password" style={{width:300,height:20}}  {...register("password", { required: true })} />
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
        <div className="title">Sign In</div>
        {renderForm()}
      </div>
    </div>
      
  );
}

export default Login