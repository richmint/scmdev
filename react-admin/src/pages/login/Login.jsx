import React,{useEffect, useState} from 'react';
import { useSelector, useDispatch } from 'react-redux'
import {useForm} from 'react-hook-form';
import { fetch, success } from './LoginSlice'
import "./login.scss"
import { useNavigate } from "react-router-dom";
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
    console.log("login form values",values)
    dispatch(fetch());
    dispatch(success(values))
    navigate("/admin/home")
  }
 
  const renderErrorMessage = (name) =>
    name === errorMessages.name && (
      <div className="error">{errorMessages.message}</div>
    );
  // JSX code for login form
  const renderForm = (
    <div className="form">
     <form onSubmit={handleSubmit(onSubmit)}>
        <div className="input-container">
          <label>Username </label>
          <input type="text"  {...register("username", { required: true })} />
          {errors.username && <span>This field is required</span>}
        </div>
        <div className="input-container">
          <label>Password </label>
          <input type="password" {...register("password", { required: true })} />
          {errors.password && <span>This field is required</span>}
        </div>
        <div className="button-container">
          <input type="submit" />
        </div>
      </form>
    </div>
  );

  return (
    <div className="app">
      <div className="login-form">
        <div className="title">Sign In</div>
        {isSubmitted ? <div>User is successfully logged in</div> : renderForm}
      </div>
    </div>
  );
}

export default Login