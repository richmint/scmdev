// import React, { useEffect, useState, useContext } from "react";
// import Sidebar from "../../components/front_sidebar/Sidebar";
// import Navbar from "../../components/front_navbar/Navbar";
// import '../../style/front/list.scss'
// import '../../style/front/new.scss'
// import Multiselect from 'multiselect-react-dropdown';
// import { DarkModeContext } from "../../context/darkModeContext";
// import { useNavigate } from "react-router-dom";
// import { useLocation } from "react-router-dom";
// import { useForm } from 'react-hook-form';
// import { yupResolver } from "@hookform/resolvers/yup";
// import { SellToRetailerFormSchema } from '../../Validations/Schema';
// const FinalSellToDistributor = () => {
//     let data = useLocation();
//     data = data.state.i;
//     const { register, handleSubmit, setError, formState: { errors } } = useForm({
//         defaultValues: {
//             productQty: '',
//         },
//         resolver: yupResolver(SellToRetailerFormSchema),
//     })
//     const navigate = useNavigate();
//     const { dispatch, metaMask, supplyChainContract, supplyChainTokenContract } = useContext(DarkModeContext);
//     const [SChainContract, setSChainContract] = useState(supplyChainContract);
//     const [allSupplier, setallSupplier] = useState([]);
//     const supplierRecord = async () => {
//         return await fetch("http://162.215.222.118:5150/retailer")
//             .then(result => result.json())
//             .then((resp) => resp)
//             .catch((e) => {
//                 console.log("error");
//                 return [];
//             });
//     };
//     useEffect(() => {
//         supplierRecord().then(result => {
//             setallSupplier(result);
//         })
//     }, []);

//     const finalSellItemToDistributor = async (event) => {
//         const retaileraddress = event.productQty;
//         const supplyqty = event.productQty;

//         const tx = SChainContract.distributorSellsToRetailer(data, retaileraddress, supplyqty);
//         //console.log((await tx.wait()));
//         if (tx) {
//             navigate("/availabelItemToSellRetailer")
//         }
//     }
//     const SellItemForm = () => {
//         return (
//             <>
//                 <div className="top">
//                     <h4>Sell To Retailer</h4>
//                 </div>
//                 <div className="bottom">
//                     <div className="right">
//                         <form onSubmit={handleSubmit(finalSellItemToDistributor)} >
//                             <div className="formInput">
//                                 <label >Retailer List</label>
//                                 <select style={{ width: "100%", height: "40px" }}>
//                                     {allSupplier.map((option, index) => (
//                                         <option key={index} value={option.hashAddress}>
//                                             {option.name}
//                                         </option>
//                                     ))}
//                                 </select>
//                             </div>
//                             <div className="formInput">
//                                 <label >Quantity</label>
//                                 <input id="productQty" name="productQty" type="text" {...register("productQty", { required: true })} />
//                                 {errors.productQty && <span className='error'> {console.log(errors)} {errors?.productQty?.message}</span>}
//                             </div>
//                             <div className='formInput'>
//                                 <button type={"submit"}> Submit </button>
//                             </div>
//                         </form>
//                     </div>
//                 </div>
//             </>
//         )
//     }
//     return (
//         <div className="new">
//             <Sidebar txt={"disSellItem"} />
//             <div className="newContainer">
//                 <Navbar />
//                 <SellItemForm />
//             </div>
//         </div>
//     )
// }
// export default FinalSellToDistributor







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

        const [sellProductQty, setSellProductQty] = useState(productBatchData.state.leftUnits);
        const [productBatchIds, setProductBatchIds] = useState(productBatchData.state.productBatchId);
        const [retaileradrs, setRetaileradrs] = useState('');
        const [retailerList, setRetailerList] = useState();
        const [showSellProductQtyError, setShowSellProductQtyError] = useState("");
        const [showRetailerSelectError, setShowRetailerSelectError] = useState("");

        const handleSubmit = (e) => {
            e.preventDefault();
            if (retaileradrs == '') {
                setShowRetailerSelectError("Select an Retailer")
            } else {
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
            //console.log("Detail", event);
            const tx = SChainContract.distributorSellsToRetailer(event.productBatchId, event.retaileradrs, event.sellProductQty);
            if (tx) {
                navigate("/availabelItemToSellRetailer")
            }
        }

        useMemo(() => {
            (sellProductQty == '') ? setShowSellProductQtyError("Please fill value") : (sellProductQty > productBatchData.state.leftUnits) ? setShowSellProductQtyError("Value is greater") : setShowSellProductQtyError(false);
        }, [sellProductQty])

        useMemo(() => {
            setShowRetailerSelectError('');
        }, [retaileradrs])

        useEffect(() => {
            getRetailerList()
        }, [])
        

        function getRetailerList() {
            fetch("http://162.215.222.118:5150/retailer")
                .then(result => result.json())
                .then(data => {
                    if (data) {
                        //console.log("Data in useEffect ",data)
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
                                <option value={''}>Select Retailer</option>
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






