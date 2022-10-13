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

const FinalSellToDistributor = () => {
    let productBatchData = useLocation();
    const productId = productBatchData.state.productBatchId;
    const productQty = productBatchData.state.productQty;
    const productBatchId = productBatchData.state.productBatchId;

    const { register, setError, formState: { errors } } = useForm({
        defaultValues: {
            retaileradrs: '',
        },
        resolver: yupResolver(SellItemFormDataSchema),
    })

    const navigate = useNavigate();
    const { dispatch, metaMask, supplyChainContract, supplyChainTokenContract } = useContext(DarkModeContext);
    const [SChainContract, setSChainContract] = useState(supplyChainContract);

    // const sellItemToDistributerHandler = async (event) => {
    //     console.log("batchid", event);
    //     const tx = SChainContract.factorySellItemToDistributor(event.productBatchId, event.distributeradrs, event.sellProductQty);
    //     if (tx) {
    //         navigate("/sellItemToDistributer")
    //     }
    // }
    const DataTable = (props) => {

        const [sellProductQty, setSellProductQty] = useState(productQty);
        const [productBatchIds, setProductBatchIds] = useState(productBatchData.state.productBatchId);
        const [retaileradrs, setRetaileradrs] = useState('');
        const [retailerList, setRetailerList] = useState();
        const [showSellProductQtyError, setShowSellProductQtyError] = useState("");
        const [showRetailerSelectError, setShowRetailerSelectError] = useState("");

        const handleSubmit = (e) => {
            e.preventDefault();
            if (retaileradrs == '') {
                setShowRetailerSelectError("Select an Retailer")
            } 
            else {
                const data = {
                    productBatchId: productBatchIds,
                    sellProductQty: sellProductQty,
                    retaileradrs: retaileradrs
                }
                sellItemToRetailerHandler(data) 
            }
        }

        const sellItemToRetailerHandler = async (event) => {
            // event.preventDefault();
            console.log("Detail", event);
            const tx = SChainContract.distributorSellsToRetailer(event.productBatchId, event.retaileradrs, event.sellProductQty);
            if (tx) {
                navigate("/availabelItemToSellRetailer")
            }
        }

        useMemo(() => {
            (sellProductQty == '') ? setShowSellProductQtyError("Please fill value") : (sellProductQty > productQty) ? setShowSellProductQtyError("Value is greater") : setShowSellProductQtyError(false);
        }, [sellProductQty])

        useMemo(() => {
            setShowRetailerSelectError('');
        }, [retaileradrs])

        useEffect(() => {
            getRetailerList()
        }, [])
        

        function getRetailerList() {
            fetch("http://162.215.222.118:5151/retailer")
                .then(result => result.json())
                .then(data => {
                    if (data) {
                        setRetailerList(data)
                    }
                })
        }

        const SelectList = (props) => {
            const data = props.val;
            console.log("Select list", data)
            return (
                <option value={data.hashAddress}>{data.name}</option>
            )
        }
        const data = props.data;
        return (
            <div className="bottom">
                <div className="right">
                    <form onSubmit={handleSubmit} > 
                        <div className="formInput">
                            <label>Retailer Address</label>
                            <select id="retaileradrs" defaultValue={retaileradrs} onChange={(e) => setRetaileradrs(e.target.value)} name="retaileradrs" style={{ width: "100%", height: "40px" }}>
                                <option value={''}>Select An Retailer</option>
                                {retailerList && retailerList.map((val) => { return <SelectList val={val} /> })}
                            </select>
                            <span className='error'> {showRetailerSelectError}</span>
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
            <Sidebar txt={"FecItemToRetailer"} />
            <div className="newContainer">
                <Navbar />
                <DataTable data={productBatchData} />
            </div>
        </div>
    )
}

export default FinalSellToDistributor






