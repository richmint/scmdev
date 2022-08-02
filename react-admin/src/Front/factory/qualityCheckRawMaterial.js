import React, { useEffect, useState, useContext } from "react";
import Navbar from "../../components/front_navbar/Navbar";
import Sidebar from "../../components/front_sidebar/Sidebar";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { DarkModeContext } from "../../context/darkModeContext";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { AddMaterialSchema } from "../../Validations/Schema";
// import './AddMaterialForm.scss'
import '../supplier/AddMaterialForm.scss';
import '../../pages/new/new.scss';

const QualityCheckRawMaterail = () => {
    let data = useLocation();
    console.log("asdasdasd",data)
    const { register, handleSubmit, setError, formState: { errors } } = useForm({
        defaultValues: { 
            polysteramount: '',
            cottonamount: '',
            woolamount: '', 
        },
        resolver: yupResolver(AddMaterialSchema),
    })

    const navigate = useNavigate();
  const { dispatch, metaMask, supplyChainContract, supplyChainTokenContract } = useContext(DarkModeContext);
  const [SChainContract, setSChainContract] = useState(supplyChainContract);

    const addSupplyChainHandler = async (event) => {
        //event.preventDefault(); 
        // console.log("SChainContract",SChainContract);
        // console.log(await SChainContract.totalBatchs())
        const tx = await SChainContract.factoryQCRawMaterials(data.state.id, event.polysteramount, event.cottonamount, event.woolamount);
        console.log((await tx.wait()));
        if(tx){
           navigate("/rawMaterialQualityCheck")
        }
    }



    return (
        <diV className="new">
            <Sidebar txt={"qcCheckRawMat"} />
            <div className="newContainer">
                <Navbar />
                <div className="bottom">
                    <div className="right">
                        <form onSubmit={handleSubmit(addSupplyChainHandler)} >
                            <div className="formInput">
                                <label>Polyster Amount</label>
                                <input id="polysteramount" name="polysteramount" type="number" value={data.state.OGPolyesterAmount} {...register("polysteramount", { required: true })} />
                                {errors.polysteramount && <span className='error'> {console.log(errors)} {errors?.polysteramount?.message}</span>}
                            </div>
                            <div className="formInput">
                                <label>Cotton Amount</label>
                                <input id="cottonamount" name="cottonamount" type="number" value={data.state.OGCottonAmount}  {...register("cottonamount", { required: true })} />
                                {errors.cottonamount && <span className='error'> {console.log(errors)} {errors?.cottonamount?.message}</span>}
                            </div>
                            <div className="formInput ">
                                <label>Wool Amount</label>
                                <input id="woolamount" name="woolamount" type="number" value={data.state.OGWoolAmount} {...register("woolamount", { required: true })} />
                                {errors.woolamount && <span className='error'> {console.log(errors)} {errors?.woolamount?.message}</span>}
                            </div>
                            <div className='formInput'>
                                <button type={"submit"}> Submit </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </diV>
    )
}

export default QualityCheckRawMaterail