import React, { useState } from "react";
import Navbar from "../../components/front_navbar/Navbar";
import Sidebar from "../../components/front_sidebar/Sidebar";
import { rawMaterialSupplierRows } from "../../datatablesource";
import '../../style/front/new.scss'
import { useLocation } from "react-router-dom";


const SellItemFormData = () =>{
    const [id,setId] = useState('');

    let data = useLocation();
    data = data.state.data;
    console.log("Coming data is ",data);
  
    const DataTable = (props)=>{
        const data = props.data;

        return(
            <div className="bottom">
          <div className="right">
            <form >
              <div className="formInput">
                <label>Total Shirts produced</label>
                <textarea id="polysteramount" value={data.name}  type="text" />
              </div>
              <div className="formInput">
                <label>Array of distributed Address to Supply</label>
                <textarea id="cottonamount" value={data.email} type="text" />
              </div>
              <div className="formInput ">
                <label>Array of Distributors units to Supply Respectively </label>
                <textarea id="woolamount" value={data.address} type="text" />
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