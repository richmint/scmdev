import React, { useEffect, useState, useContext } from "react";
import Navbar from "../../components/front_navbar/Navbar";
import Sidebar from "../../components/front_sidebar/Sidebar";
import '../../style/front/new.scss'

import { DarkModeContext } from "../../context/darkModeContext";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import Multiselect from 'multiselect-react-dropdown';

 
const SellItemFormData = () =>{

  let data = useLocation();
  data = data.state.i;
  //console.log("Coming data is ",data);

 
  var listelemant = [];
    var newElmant ;
       const selectedItem1 = ((selectedList, selectedItem) => {

          selectedList.map((x)=>listelemant.push(x.value))
          console.log("Final item ",listelemant)
          newElmant= listelemant;
          // console.log("After acces",newElmant)
          listelemant = [];
       })

  const navigate = useNavigate();
  const { dispatch, metaMask, supplyChainContract, supplyChainTokenContract, ownSupplyChainAddress } = useContext(DarkModeContext);

  const sellItemToDistributerHandler = async (event) => {
    event.preventDefault();
    //console.log("batchid",event.target.whHashAdr.value);
    
    var supplyqty = [];
    supplyqty = event.target.unitSupply.value.split(' ');
  
    //console.log(supplyqty);

    // const tx = supplyChainContract.factorySellItemToDistributors(data, event.target.shirtproduced.value,newElmant,supplyqty);
    const tx = supplyChainContract.factorySellItemToDistributors(0, 100,['0x15d34AAf54267DB7D7c367839AAf71A00a2C6A65','0x9965507D1a55bcC2695C58ba16FB37d819B0A4dc'],[5,5]);
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