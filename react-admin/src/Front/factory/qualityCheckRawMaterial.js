import React, { useEffect, useState, useContext, useMemo } from "react";
import Navbar from "../../components/front_navbar/Navbar";
import Sidebar from "../../components/front_sidebar/Sidebar";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { DarkModeContext } from "../../context/darkModeContext";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { AddMaterialSchema } from "../../Validations/Schema";
import '../supplier/AddMaterialForm.scss';
import '../../pages/new/new.scss';
const QualityCheckRawMaterail = () => {
    let data = useLocation();
    const { register, handleSubmit, setError, formState: { errors } } = useForm({
        defaultValues: {
            polysteramount: data.state.OGPolyesterAmount,
            cottonamount: data.state.OGCottonAmount,
            woolamount: data.state.OGWoolAmount,
        },
        resolver: yupResolver(AddMaterialSchema),
    })
    const navigate = useNavigate();
    const [polysteramount, setPolysteramount] = useState(data.state.OGPolyesterAmount);
    const [cottonamount, setCottonamount] = useState(data.state.OGCottonAmount);
    const [woolamount, setWoolamount] = useState(data.state.OGWoolAmount);
    const [showPolyError, setShowPolyError] = useState(false);
    const [showCottonError, setShowCottonError] = useState(false);
    const [showWollError, setShowWollError] = useState(false);
    useMemo(() => {
        (polysteramount > data.state.OGPolyesterAmount) ? setShowPolyError(true) : setShowPolyError(false);
    }, [polysteramount])
    useMemo(() => {
        (cottonamount > data.state.OGCottonAmount) ? setShowCottonError(true) : setShowCottonError(false);
    }, [cottonamount])
    useMemo(() => {
        (woolamount > data.state.OGWoolAmount) ? setShowWollError(true) : setShowWollError(false);
    }, [woolamount])
    const { dispatch, metaMask, supplyChainContract, supplyChainTokenContract } = useContext(DarkModeContext);
    const [SChainContract, setSChainContract] = useState(supplyChainContract);
    const addSupplyChainHandler = async (event) => {

        const tx = await SChainContract.factoryQCRawMaterials(data.state.id, polysteramount, cottonamount, woolamount);
        //console.log((await tx.wait()));
        if (tx) {
            navigate("/availableRawMaterialToBuy")
        }
    }
    return (
        <diV className="new">
            <Sidebar txt={"avlRawMatforBuy"} />
            <div className="newContainer">
                <Navbar />
                <div className="bottom">
                    <div className="right">
                        <form onSubmit={handleSubmit(addSupplyChainHandler)} >
                            <div className="formInput">
                                <label>Polyster Amount</label>
                                <input id="polysteramount" name="polysteramount" type="number" value={polysteramount} onChange={(e) => setPolysteramount(e.target.value)} />
                                {showPolyError ? <span className='error'> Quantity is greater</span> : ""}
                                
                            </div>
                            <div className="formInput">
                                <label>Cotton Amount</label>
                               
                                <input id="cottonamount" name="cottonamount" type="number" value={cottonamount} onChange={(e) => setCottonamount(e.target.value)} />
                                {showCottonError ? <span className='error'> Quantity is greater</span> : ""}
                            </div>
                            <div className="formInput ">
                                <label>Wool Amount</label>
                                <input id="woolamount" name="woolamount" type="number" value={woolamount} onChange={(e) => setWoolamount(e.target.value)} />
                                {showWollError ? <span className='error'> Quantity is greater</span> : ""}
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