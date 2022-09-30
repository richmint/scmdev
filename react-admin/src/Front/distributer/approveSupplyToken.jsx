import React, { useEffect, useState, useContext } from 'react';
import Navbar from "../../components/front_navbar/Navbar";
import Sidebar from "../../components/front_sidebar/Sidebar";
import '../../style/front/list.scss'
import '../../pages/new/new.scss'
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { DarkModeContext } from "../../context/darkModeContext";
// import RawMaterialTable from "./rawMaterialTable";
//import { fetch, success } from './LoginSlice'

 


const ApproveSupplyToken = () =>{
  const navigate = useNavigate();
  const { dispatch, metaMask, supplyChainContract, supplyChainTokenContract, ownSupplyChainAddress } = useContext(DarkModeContext);
  const [disable,setDisable] = useState();  
  const addWarehouseHandler = async(event) => {
        //console.log("The coming dats is ",event);
        //event.preventDefault();
        const tx = await supplyChainTokenContract.setApprovalForAll(supplyChainContract.address, true);
        console.log(("status",await tx.wait()));
      if(tx){
        navigate("/approveFactorySupplier")
      }

        //await supplyChainToken.connect(factorySigner).setApprovalForAll(supplyChainContract.address,true);
        // console.log(await supplyChainToken.isApprovedForAll(factorySigner.address,supplychain.address))
  }

  useEffect(()=>{
    (async () => {
        const res = await supplyChainTokenContract.isApprovedForAll('0x15d34aaf54267db7d7c367839aaf71a00a2c6a65',supplyChainContract.address);
        setDisable(res);
        console.log("Coming res",res)
    })();

  },[supplyChainTokenContract])

    const {register, handleSubmit, formState: { errors }} = useForm({
     
      })


      // const [errorMessage, setErrorMessage] = useState(null);
      // const [allWarehouse, setAllWarehouse] = useState(null);
      // const [defaultAccount, setDefaultAccount] = useState(null);
      // const [whContract, setContract] = useState(warehouseContract);


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
    //   fetch('http://192.168.1.101:5150/register', requestOptions)
    //       .then(response => response.json());



    return (
        <div className="new">
           <Sidebar txt={"DistApprovetoken"} />
          <div className="newContainer">
            <Navbar />
            <div className="top">          
            </div>
            <div className="bottom">
              <div className="right">
                <form onSubmit={handleSubmit(addWarehouseHandler)}>
                  <div className="formInput">
                    <label>You have to approve this plateform to manage your supplychain tokens for the factory to buy. This is to be done only once.</label>
                    
                  </div>
                  <div className='formInput'>
                  <button disabled={disable} style={disable?{backgroundColor:"gray",cursor:"none"}:{}}  type={"submit"}> Approve </button>
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