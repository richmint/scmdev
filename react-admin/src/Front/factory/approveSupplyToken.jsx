import React from "react";
import Navbar from "../../components/navbar/Navbar";
import Sidebar from "../../components/front_sidebar/Sidebar";
import '../../style/front/list.scss'
import '../../pages/new/new.scss'
import { useForm } from "react-hook-form";
import { useState,useContext } from "react";
import { DarkModeContext } from "../../context/darkModeContext";
// import RawMaterialTable from "./rawMaterialTable";
//import { fetch, success } from './LoginSlice'




const ApproveSupplyToken = () =>{
    // const [user,setUser] = useState(JSON.parse(sessionStorage.getItem('user')));
    // const name = localStorage.userName;
    // const role = localStorage.userRole;
  // console.log("NAme and role is ",name.role);

    const { dispatch, metaMask, warehouseContract } = useContext(DarkModeContext); 

    const addWarehouseHandler = (event) => {
        console.log("The coming dats is ",event);
        event.preventDefault();
    }

    const {register, handleSubmit, formState: { errors }} = useForm({
        defaultValues: {
          pollyster: '',
          cotton: '',
          wool: ''
        }
      })


      const [errorMessage, setErrorMessage] = useState(null);
      const [allWarehouse, setAllWarehouse] = useState(null);
      const [defaultAccount, setDefaultAccount] = useState(null);
      const [whContract, setContract] = useState(warehouseContract);


    //  console.log('sending ' + event.target.hashAddress.value + ' to the whContract');
    // warehouseContract.addWarehouse(event.target.hashAddress.value);

    //   const requestOptions = {
    //       method: 'POST',
    //       headers: { 'Content-Type': 'application/json' },
    //       body: JSON.stringify({
    //         "hashAddress":event.target.hashAddress.value,
    //         "name":event.target.name.value,
    //         "email":event.target.email.value,
    //         "address":event.target.location.value,
    //         "password":event.target.hashAddress.value,
    //         "role":'Warehouse'
    //         })
    //   };
    //   fetch('http://162.215.222.118:5150/register', requestOptions)
    //       .then(response => response.json());



    return (
        <div className="new">
           <Sidebar />
          <div className="newContainer">
            <Navbar />
            <div className="top">          
              <h1>Hi, </h1>
            </div>
            <div className="bottom">
              <div className="right">
                <form onSubmit={handleSubmit(addWarehouseHandler)}>
                  <div className="formInput">
                    <label>You have to approve this plateform to manage your supplychain tokens for the factory to buy. This is to be done only once.</label>
                    
                  </div>
                  <div className='formInput'>
                  <button type={"submit"}> Approve </button>
                  {/* <span className='left'><button  type='reset' >Reset</button></span> */}
                  </div>          
                </form>
              </div>
            </div>
          </div>
        </div>
      );
}

export default ApproveSupplyToken