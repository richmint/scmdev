import React from "react";
import Navbar from "../../components/front_navbar/Navbar";
import Sidebar from "../../components/front_sidebar/Sidebar";
import '../../style/front/list.scss'
import WarehouseRawMaterialTable from "./warehouseRawMaterialTable"; 

const AvailableRawMaterialToWarehouse = () =>{
    return(
        <div className="list">
            <Sidebar txt={"avlRawMatforWarehouse"} /> 
            <div className="listContainer">
                <Navbar />
                <WarehouseRawMaterialTable />
            </div>
        </div>
    )
}
export default AvailableRawMaterialToWarehouse