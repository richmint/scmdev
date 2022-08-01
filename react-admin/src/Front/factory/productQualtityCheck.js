import React from "react";
import Navbar from "../../components/front_navbar/Navbar";
import Sidebar from "../../components/front_sidebar/Sidebar";
import { useNavigate } from "react-router-dom";
import { DarkModeContext } from "../../context/darkModeContext";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import '../supplier/AddMaterialForm.scss';
import '../../pages/new/new.scss';
import { ProductQCSchema } from "../../Validations/Schema";


const ProductQualityCheck = () =>{

    const { register, handleSubmit, setError, formState: { errors } } = useForm({
        defaultValues: {
            product: ''
        },
        resolver: yupResolver(ProductQCSchema),
    })

const addSupplyChainHandler = (event) =>{
    console.log("Clicked",event);
}

    return(
        <div className="new">
            <Sidebar txt={"productQC"} />
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