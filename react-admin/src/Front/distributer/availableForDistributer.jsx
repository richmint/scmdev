import React from "react";
// import Sidebar from "../../components/sidebar/Sidebar";
import Sidebar from "../../components/front_sidebar/Sidebar";
import Navbar from "../../components/front_navbar/Navbar";
import '../../style/front/list.scss'
import AvailableForDistributerTable from "./availableForDistributerTable";

 
const AvailableForDistributer = () =>{
    return(
        <div className="list">
            <Sidebar txt={"AvlForDistributer"} />
            <div className="listContainer">
                <Navbar />
                <AvailableForDistributerTable />
            </div>
        </div>
    )
}

export default AvailableForDistributer
