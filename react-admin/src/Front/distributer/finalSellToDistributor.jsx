import React from "react";
import Sidebar from "../../components/front_sidebar/Sidebar";
import Navbar from "../../components/front_navbar/Navbar";
import '../../style/front/list.scss'
import '../../style/front/new.scss'
import Multiselect from 'multiselect-react-dropdown';
import { useState ,useEffect } from "react";

const FinalSellToDistributor = () =>{
    const [allSupplier, setallSupplier] = useState([]);

    const supplierRecord = async () => {
        return await fetch("http://162.215.222.118:5150/distributer")
             .then(result=>result.json())
             .then((resp)=> resp)
             .catch((e)=>{
                 console.log("error");
                 return [];
             });
      }; 

    useEffect(()=>{
        supplierRecord().then(result=>{
            setallSupplier(result); 
        })
      },[]);

   
    var listelemant;
    const selectedItem1 = ((selectedList, selectedItem) =>{
        listelemant = selectedList
    })


    const finalSellItemToDistributor = async(event) =>{
        console.log("Total Quantity ",event.target.arrayOfQty.value);
        console.log("Final list element",listelemant)
        event.preventDefault();
    }

    const SellItemForm = () =>{
        return(
            <div className="bottom">
                <div className="right">
                    <form onSubmit={finalSellItemToDistributor}>
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
                            <textarea id="arrayOfQty" type="text" />
                        </div>
                        <div className='formInput'>
                            <button type={"submit"}> Submit </button>
                        </div>  
                    </form>
                </div>
            </div>
        )
    }



    return(
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