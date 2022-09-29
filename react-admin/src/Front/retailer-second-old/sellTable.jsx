import React from "react";
// import Sidebar from "../../components/sidebar/Sidebar";
import Sidebar from "../../components/front_sidebar/Sidebar";
import Navbar from "../../components/front_navbar/Navbar";
import '../../style/front/list.scss'
import SellTable from "./availableSellTable";


const AvailableItemForSell = () =>{
    return(
        <div className="list">
        <Sidebar txt={"avlSellretailer"} />
        <div className="listContainer">
            <Navbar />
            <SellTable />
        </div>
    </div>
    )
}
export default AvailableItemForSell