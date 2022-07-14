import React, { useEffect, useState, useContext } from "react";
import Navbar from "../../components/front_navbar/Navbar";
import Sidebar from "../../components/front_sidebar/Sidebar";
import '../../style/front/new.scss'

import { DarkModeContext } from "../../context/darkModeContext";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import Multiselect from 'multiselect-react-dropdown';


const SellItemFormData = () =>{

  var listelemant;
       const selectedItem1 = ((selectedList, selectedItem) => {
          //console.log("list",selectedList)
           listelemant = selectedList
          //console.log("Item",selectedItem)
       })

  const navigate = useNavigate();
  const { dispatch, metaMask, supplyChainContract, supplyChainTokenContract, ownSupplyChainAddress } = useContext(DarkModeContext);

  const sellItemToDistributerHandler = async (event) => {
    event.preventDefault();
    //console.log("batchid",event.target.whHashAdr.value);
    

    const tx = supplyChainContract.factorySellItemToDistributors(0, event.target.shirtproduced.value,event.target.unitSupply.value,listelemant);
    //console.log((await tx.wait()));
    if(tx){
       navigate("/sellItemToDistributer")
    }
  }

  const warehouseRecord = async () => {
    return await fetch("http://162.215.222.118:5150/distributer")
         .then(result=>result.json())
         .then((resp)=> resp)
         .catch((e)=>{
             console.log("error");
             return [];
         });
  }; 

  const [allWarehouse, setallWarehouse] = useState([]);

  useEffect(()=>{
    warehouseRecord().then(result=>{
      //console.log("All Ware Reuslt = ", result);
      setallWarehouse(result); 
    })
  },[]);


    const [id,setId] = useState('');
    const [distributedAddList,setDistributedAddList] = useState();


    let data = useLocation();
    data = data.state.data;
    console.log("Coming data is ",data);

    const handleChange = (event) => {

      let value = Array.from(
        event.target.selectedOptions,
        (option) => option.value
      )
      console.log(value);
    }
  
    const DataTable = (props)=>{
        const data = props.data;
      
        return(
            <div className="bottom">
          <div className="right">
            <form onSubmit={sellItemToDistributerHandler}>
              <div className="formInput">
                <label>Total Shirts produced</label>
                <textarea id="shirtproduced"   type="text" />
              </div>
              <div className="formInput">
                <label>Array of distributed Address to Supply</label>
                <Multiselect
                    displayValue="key"
                    onKeyPressFn={function noRefCheck(){}}
                    onRemove={function noRefCheck(){}}
                    onSearch={function noRefCheck(){}}
                    onSelect={selectedItem1}
                    options={
                        allWarehouse.map(
                          (allWarehouseval) => ({
                        value: allWarehouseval.hashAddress,
                        key: allWarehouseval.name,
                      })
                      )
                    }
                  />
              </div>
              <div className="formInput ">
                <label>Array of Distributors units to Supply Respectively </label>
                <textarea id="unitSupply"  type="text" />
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
                    <DataTable data={data}  />
                </div>
            </div>
    )
}

export default SellItemFormData