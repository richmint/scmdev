import React from "react";
import Navbar from "../../components/navbar/Navbar";
import Sidebar from "../../components/front_sidebar/Sidebar";
import '../../style/front/list.scss'
import RawMaterialTable from "./rawMaterialTable";




const AvailableRawMaterialToBuy = () =>{
    return(
        <div className="list">
            <Sidebar />
            <div className="listContainer">
                <Navbar />
                <RawMaterialTable />
            </div>
        </div>
    )
}

export default AvailableRawMaterialToBuy