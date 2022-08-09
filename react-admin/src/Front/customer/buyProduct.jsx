import React, { useEffect, useState, useContext, useMemo } from "react";
import Navbar from "../../components/front_navbar/Navbar";
import Sidebar from "../../components/front_sidebar/Sidebar";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { DarkModeContext } from "../../context/darkModeContext";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { ProductBuyCustomerSchema } from "../../Validations/Schema";
// import './AddMaterialForm.scss'
import '../supplier/AddMaterialForm.scss';
import '../../pages/new/new.scss';

const ProductBuyCustomer = () => {
    let data = useLocation();
    console.log(data);
    const { register, handleSubmit, setError, formState: { errors } } = useForm({
        defaultValues: { 
            productQty: data.state.productQty,
        },
        resolver: yupResolver(ProductBuyCustomerSchema) ,
    })

    const navigate = useNavigate();

    const[productQty,setproductQty] = useState(data.state.productQty);
    const [showError,setShowError] = useState(false);

    useMemo(()=>{
        (productQty >  data.state.productQty)?setShowError(true):setShowError(false); 
    },[productQty])

  const { dispatch, metaMask, supplyChainContract, supplyChainTokenContract } = useContext(DarkModeContext);
  const [SChainContract, setSChainContract] = useState(supplyChainContract);
    const addSupplyChainHandler = async (event) => {
        //event.preventDefault(); 
        // console.log("SChainContract",SChainContract);
        // console.log(await SChainContract.totalBatchs())
        console.log("Product Qty",event.productQty);
        const tx = await SChainContract.customerBuyItem(data.state.id, data.state.retailerAddress, event.productQty);
        //console.log((await tx.wait()));
        if(tx){
           navigate("/availabeProductforCustomer")
        }
    }

    return (
        <diV className="new">
            <Sidebar txt={"avlprodcustomer"} />
            <div className="newContainer">
                <Navbar />
                <div className="bottom">
                    <div className="right">
                        <form onSubmit={handleSubmit(addSupplyChainHandler)} >
                            <div className="formInput">
                                <label>Product Quantity</label>
                                <input id="productQty" name="productQty" type="number" value={productQty} onChange={(e)=>setproductQty(e.target.value)}  />
                                { showError ? <span className='error'> Quantity is greater</span>:""}
                            </div> 
                            <div className='formInput'>
                                <button disabled={showError} type={"submit"}> Submit </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </diV>
    )
}

export default ProductBuyCustomer