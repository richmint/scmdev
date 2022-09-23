import React, { useEffect, useState, useContext, useMemo } from "react";
import Navbar from "../../components/front_navbar/Navbar";
import Sidebar from "../../components/front_sidebar/Sidebar";
import '../../style/front/new.scss'

import { DarkModeContext } from "../../context/darkModeContext";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";

import { useForm } from 'react-hook-form';
import { yupResolver } from "@hookform/resolvers/yup";
import { SellItemFormDataSchema } from '../../Validations/Schema';

const SellItemFormData = () => {
  let productBatchData = useLocation();
  const productBatchId = productBatchData.state.productBatchId;


  const { register, setError, formState: { errors } } = useForm({
    defaultValues: {
      distributeradrs: '',
    },
    resolver: yupResolver(SellItemFormDataSchema),
  })

  const navigate = useNavigate();
  const { dispatch, metaMask, supplyChainContract, supplyChainTokenContract } = useContext(DarkModeContext);
  const [SChainContract, setSChainContract] = useState(supplyChainContract);

  const sellItemToDistributerHandler = async (event) => {
    //event.preventDefault();
    console.log("batchid", event);
    const tx = SChainContract.factorySellItemToDistributor(event.productBatchId, event.distributeradrs, event.sellProductQty);
    //const tx = SChainContract.factorySellItemToDistributors(data, 10, [0x15d34AAf54267DB7D7c367839AAf71A00a2C6A65, 0x9965507D1a55bcC2695C58ba16FB37d819B0A4dc], [5, 5]);
    //console.log((await tx.wait()));
    if (tx) {
      navigate("/sellItemToDistributer")
    }
  }

  const DataTable = (props) => {

    const [sellProductQty, setSellProductQty] = useState(productBatchData.state.leftUnits);
    const [productBatchIds, setProductBatchIds] = useState(productBatchData.state.productBatchId);
    const [distributeradrs, setDistributeradrs] = useState();

    const [showSellProductQtyError, setShowSellProductQtyError] = useState("");

    const handleSubmit = (e) => {
      e.preventDefault();
      const data = {
        productBatchId: productBatchIds,
        sellProductQty: sellProductQty,
        distributeradrs: distributeradrs
      }
      sellItemToDistributerHandler(data)
    }

    useMemo(() => {
      (sellProductQty == '') ? setShowSellProductQtyError("Please fill value") : (sellProductQty > productBatchData.state.leftUnits) ? setShowSellProductQtyError("Value is greater") : setShowSellProductQtyError(false);
    }, [sellProductQty])


    const data = props.data;
    return (
      <div className="bottom">
        <div className="right">
          <form onSubmit={handleSubmit} >
            <div className="formInput">
              <label>Distributer Address</label>
              <select id="distributeradrs" defaultValue={distributeradrs} onChange={(e) => setDistributeradrs(e.target.value)} name="distributeradrs" style={{ width: "100%", height: "40px" }}>
                <option value={""}>Select An Distributor</option>
                <option value={'0x15d34AAf54267DB7D7c367839AAf71A00a2C6A65'}>Rao Tavish</option>
              </select>
              {errors.distributeradrs && <span className='error'> {console.log(errors)} {errors?.distributeradrs?.message}</span>}
            </div>
            <div className="formInput">
              <label>Sell Product Quantity</label>
              <input id="sellProductQty" name="sellProductQty" type="text" value={sellProductQty} onChange={(e) => setSellProductQty(e.target.value)} />
              {showSellProductQtyError == '' ? '' : <span className='error'> {showSellProductQtyError}</span>}

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
    <div className="new">
      <Sidebar txt={"FecItemToDistributer"} />
      <div className="newContainer">
        <Navbar />
        <DataTable data={productBatchData} />
      </div>
    </div>
  )
}

export default SellItemFormData