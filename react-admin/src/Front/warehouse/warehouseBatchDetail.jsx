import React from "react";
import Sidebar from "../../components/front_sidebar/Sidebar";

import Navbar from "../../components/front_navbar/Navbar";
import '../../style/front/list.scss'
import WarehouseDetailRecord from "./warehouseDetail";


const WarehouseBatchDetail = () =>{
    return(
        <div className="list">
            <Sidebar txt={"WareSuplyToken"} />
            <div className="listContainer">
                <Navbar />
                <WarehouseDetailRecord />
            </div>
        </div>
    )
}
export default WarehouseBatchDetail