import React from "react";
// import Sidebar from "../../components/sidebar/Sidebar";
import Sidebar from "../../components/front_sidebar/Sidebar";
import Navbar from "../../components/front_navbar/Navbar";
import '../../style/front/list.scss'
import SellItemTable from "./sellItemTable";


const SellItemToDistributer = () =>{
    return(
        <div className="list">
            <Sidebar txt={"FecItemToDistributer"} />
            <div className="listContainer">
                <Navbar />
                <SellItemTable />
            </div>
        </div>
    )
}

export default SellItemToDistributer
