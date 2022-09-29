import React, { useEffect, useState, useContext } from "react";
import Navbar from "../../components/front_navbar/Navbar";
import Sidebar from "../../components/front_sidebar/Sidebar";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { DarkModeContext } from "../../context/darkModeContext";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import '../supplier/AddMaterialForm.scss';
import '../../pages/new/new.scss';
import { ProductQCSchema } from "../../Validations/Schema";

const ProductQualityCheck = () => {
    let data = useLocation();
    const { register, handleSubmit, setError, formState: { errors } } = useForm({
        defaultValues: {
            product: data.state.totalmanufactured
        },
        resolver: yupResolver(ProductQCSchema),
    })
    const navigate = useNavigate(); 
    const { dispatch, metaMask, supplyChainContract, supplyChainTokenContract } = useContext(DarkModeContext);
    const [SChainContract, setSChainContract] = useState(supplyChainContract);
    const addSupplyChainHandler = async (event) => {
        const tx = await SChainContract.factoryQCFinalItems(data.state.productBatchId, event.product);
        if (tx) {
            navigate("/sellItemToDistributer")
        }
    }
    return (
        <div className="new">
            <Sidebar txt={"FecItemToDistributer"} />
            <div className="newContainer" >
                <Navbar />
                <div className="bottom">
                    <div className="right">
                        <form onSubmit={handleSubmit(addSupplyChainHandler)} >
                            <div className="formInput">
                                <label>Passed Product</label>
                                <input id="product" name="product" type="number" {...register("product", { required: true })} />
                                {errors.product && <span className='error'> {console.log(errors)} {errors?.product?.message}</span>}
                            </div>
                            <div className='formInput'>
                                <button type={"submit"}> Submit </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default ProductQualityCheck