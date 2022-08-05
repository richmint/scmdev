import React, { useEffect, useState, useContext } from "react";
import Sidebar from "../../components/front_sidebar/Sidebar";
import Navbar from "../../components/front_navbar/Navbar";
import '../../style/front/list.scss'
import '../../style/front/new.scss'
import Multiselect from 'multiselect-react-dropdown';

import { DarkModeContext } from "../../context/darkModeContext";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";

import { useForm } from 'react-hook-form';
import { yupResolver } from "@hookform/resolvers/yup";
import { SellToRetailerFormSchema } from '../../Validations/Schema';

const FinalSellToDistributor = () => {
    let data = useLocation();
    data = data.state.i;

    const { register, handleSubmit, setError, formState: { errors } } = useForm({
        defaultValues: {
            productQty: '',
        },
        resolver: yupResolver(SellToRetailerFormSchema),
    })


    const navigate = useNavigate();
    const { dispatch, metaMask, supplyChainContract, supplyChainTokenContract } = useContext(DarkModeContext);
    const [SChainContract, setSChainContract] = useState(supplyChainContract);

    const [allSupplier, setallSupplier] = useState([]);

    const supplierRecord = async () => {
        return await fetch("http://162.215.222.118:5150/retailer")
            .then(result => result.json())
            .then((resp) => resp)
            .catch((e) => {
                console.log("error");
                return [];
            });
    }; 

    useEffect(() => {
        supplierRecord().then(result => {
            setallSupplier(result);
        })
    }, []);


    var listelemant;
    const selectedItem1 = ((selectedList, selectedItem) => {
        listelemant = selectedList
    })


    const finalSellItemToDistributor = async (event) => {
         //console.log("Final list element",listelemant)

            var retaileraddress = listelemant.map((x)=> x.value)
            var supplyqty = [];
            supplyqty = event.productQty.split(' ');
    
        //console.log(supplyqty);

        const tx = SChainContract.distributorSellToRetailer(data, retaileraddress, supplyqty);
        //console.log((await tx.wait()));
        if (tx) {
            navigate("/availabelItemToSellRetailer")
        }

    }
    

    const SellItemForm = () => {
        return (
            <>
                <div className="top">
                    <h4>Sell To Retailer</h4>
                </div>
                <div className="bottom">
                    <div className="right">
                        <form onSubmit={handleSubmit(finalSellItemToDistributor)} >
                            <div className="formInput">
                                    <label >Retailer List</label>
                                    <Multiselect
                                        displayValue="key"
                                        onKeyPressFn={function noRefCheck(){}}
                                        onRemove={function noRefCheck(){}}
                                        onSearch={function noRefCheck(){}}
                                        onSelect={selectedItem1}
                                        options={
                                            allSupplier.map(
                                                (allSuplierval) => ({
                                                    value: allSuplierval.hashAddress,
                                                    key: allSuplierval.name,
                                                })
                                            )
                                        }
                                    />
                                </div>
                                <div className="formInput">
                                    <label >Quantity</label>
                                    <input id="productQty" name="productQty" type="text" {...register("productQty", { required: true })} />
                                    {errors.productQty && <span className='error'> {console.log(errors)} {errors?.productQty?.message}</span>}

                                </div>
                            <div className='formInput'>
                                <button type={"submit"}> Submit </button>
                            </div>
                        </form>
                    </div>
                </div>
            </>
        )
    }



    return (
        <div className="new">
            <Sidebar />
            <div className="newContainer">
                <Navbar />
                <SellItemForm />
            </div>
        </div>
    )
}

export default FinalSellToDistributor