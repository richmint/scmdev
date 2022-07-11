import React,{useEffect, useState} from 'react';
import { useSelector, useDispatch } from 'react-redux'
import {useForm} from 'react-hook-form';
//import { fetch, success } from './LoginSlice'
import "./login.scss"
import { useNavigate } from "react-router-dom";

// import { row } from 'bootstrap-4-react';
const Login = () => { 
  
  const navigate = useNavigate();
  const {register, handleSubmit, formState: { errors }} = useForm({
    defaultValues: {
      username: '',
      password: ''
    }
  })
  const state = useSelector((state) => state);
  const dispatch = useDispatch();

  const [errorMessages, setErrorMessages] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);
 


  
 
  const onSubmit = (values) => {
    console.log("login form values",values.username)
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({       
        "email":values.username,       
        "password":values.password
        })
    };

    fetch("http://162.215.222.118:5150/login",requestOptions)    
    .then(res => res.json())
    .then(data => {
      if(data && data.token){
        console.log('Success2:', data.token);
        sessionStorage.setItem('user',JSON.stringify(values));
        navigate("/material-supplier")
      }else{
        navigate("/userlogin")
      }
     
    })
    .catch((error) => {
      console.error('Error11:', error);
    });
    //dispatch();
    //dispatch(success(data))
    
  }
 
  const renderErrorMessage = (name) =>
    name === errorMessages.name && (
      <div className="error">{errorMessages.message}</div>
    );
  // JSX code for login form
  const renderForm = (
    <div className='form' >
     <form onSubmit={handleSubmit(onSubmit)}>
        <div className='box' >
          <label>Username </label>
          <input style={{width:300,height:20}} type="text"  {...register("username", { required: true })} />
          {errors.username && <span className='error'> *UserName is required</span>}
        </div>
        <div className='box' >
          <label>Password </label>
          <input type="password" style={{width:300,height:20}}  {...register("password", { required: true })} />
          {errors.password && <span className='error'> *password is required</span>}
        </div>
        <div className='btnDiv' style={{marginTop:10}} >
          <input style={{width:80, height:30 ,color:"gray"}}  type="submit" />
        </div>
      </form>
    </div>
  );

  return (
    <div className='mainDiv'>
      <div className="login-form">
        <div className="title">Sign In</div>
        {isSubmitted ? <div>User is successfully logged in</div> : renderForm}
      </div>
    </div>
      
  );
}

export default Login