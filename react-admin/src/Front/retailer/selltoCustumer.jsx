import React,{ useEffect, useState, useContext, useMemo } from "react";
import Sidebar from "../../components/front_sidebar/Sidebar";
import Navbar from "../../components/front_navbar/Navbar";
import "../../style/front/list.scss";
import { useLocation, useNavigate } from "react-router-dom";
import { DarkModeContext } from "../../context/darkModeContext";
import { useForm } from 'react-hook-form';
import { yupResolver } from "@hookform/resolvers/yup";


const SellToCustumerForm = () => {
  const getData = useLocation();
  const data = getData.state;
  const navigate = useNavigate();

  const DataTable = (props) =>{

    const { dispatch, metaMask, supplyChainContract, supplyChainTokenContract } = useContext(DarkModeContext);
    const [SChainContract, setSChainContract] = useState(supplyChainContract);

    const data = props.data;
    const batchId = data.id;

    const [quantity,setQuantity] = useState(data.value);
    const [custumerList,setCustumerList] = useState();
    const [custumer,setCustumer] = useState('');
    const [custumerErr,setCustumeErr] = useState('');
    const [quantityErr,setQuantityErr] = useState('');

useMemo(() =>{
  (quantity == '')? setQuantityErr("Please Fill value"): (quantity > data.value) ? setQuantityErr("Value is greater"):setQuantityErr(false)
},[quantity])

useMemo(() =>{
  (custumer == '')? setCustumeErr("Please Select an Custumer"): (quantity > data) ? setCustumeErr("Value is greater"):setCustumeErr(false)
},[custumer])

useEffect(() =>{
  getCustumerList()
},[])

function getCustumerList(){
  fetch("http://162.215.222.118:5151/customer").then(result=>result.json()).then(list =>{
    if(list){
      setCustumerList(list)
    }
  })
}

const SelectList = (props) =>{
  const data = props.val;
  console.log("Select list",data)
  return(
    <option value={data.hashAddress}>{data.name}</option>
  )
}

const handleSubmit = (e) => {
  e.preventDefault();
  if(custumer == ''){
    setCustumeErr("Select an Custumer")
  }else{
    const data = {
      productBatchId: batchId,
      ProductQty: quantity,
      custumerAddress: custumer
    }
    sellItemToDistributerHandler(data)
  }
}

const sellItemToDistributerHandler = async (event) => {
  // event.preventDefault();
  console.log("Detail", event);
  const tx = await SChainContract.retailerSellToCustomer(event.productBatchId,event.custumerAddress,event.ProductQty);
  if (tx) {
    navigate("/viewSellItem")
  }
}


    return(
     <div className="bottom">
        <div className="right">
          <form onSubmit={handleSubmit}>
            <div className="formInput">
            <label>Custumer Address</label>
            <select id="distributeradrs" defaultValue={custumer} onChange={(e) =>setCustumer(e.target.value)} name="distributeradrs" style={{ width: "100%", height: "40px" }}>
              <option value={''}>Select Custumer</option>
              {custumerList && custumerList.map((val) => {return <SelectList val={val} />})}
              </select>  
              <span className='error'> {custumerErr}</span>
            </div>
            <div className="formInput">
              <label>Sell Product Quantity</label>
              <input id="sellProductQty" value={quantity} onChange = {(e) => setQuantity(e.target.value)} name="sellProductQty" type="text"  />
              {quantityErr == '' ? '' : <span className='error'> {quantityErr}</span>}
            </div>
            <div className='formInput'>
              <button type={"submit"}> Submit </button>
            </div>
          </form>
        </div>
     </div>
    )
  }

  return (
    <>
      <div className="new">
        <Sidebar txt={"avlSellretailer"} />
        <div className="newContainer">
          <Navbar />
          <DataTable data={data} />
        </div>
      </div>
    </>
  );
};
export default SellToCustumerForm;
