import React, { useState } from "react";
import Navbar from "../../components/front_navbar/Navbar";
import Sidebar from "../../components/front_sidebar/Sidebar";
import { rawMaterialSupplierRows } from "../../datatablesource";
import '../../style/front/new.scss'
import { useLocation } from "react-router-dom";
import Multiselect from 'multiselect-react-dropdown';


const SellItemFormData = () =>{
    const [id,setId] = useState('');
    const optData = [{name:"Monkey",id:1},{name:"Donkey",id:2},{name:"Buffellow",id:3},{name:"Bee",id:4}];

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
            <form >
              <div className="formInput">
                <label>Total Shirts produced</label>
                <textarea id="polysteramount"   type="text" />
              </div>
              <div className="formInput">
                <label>Array of distributed Address to Supply</label>
                <textarea id="cottonamount"  type="text" />
              </div>
              <div className="formInput ">
                <label>Array of Distributors units to Supply Respectively </label>
                {/* <Multiselect options={optData} selectedValues={selectedValues}  multiple={true} onChange={handleChange} >
                </Multiselect> */}
                {/* <textarea id="woolamount" value={data.address} type="text" /> */}
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