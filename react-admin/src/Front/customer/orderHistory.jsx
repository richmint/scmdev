import React from "react";
// import Sidebar from "../../components/sidebar/Sidebar";
import Sidebar from "../../components/front_sidebar/Sidebar";
import Navbar from "../../components/front_navbar/Navbar";
import '../../style/front/list.scss'
import OrderHistoryTable from "./orderHistoryTable";


const ManufactureGarment= () =>{
    return(
        <div className="list">
            <Sidebar txt={"orderhistory"} />
            <div className="listContainer">
                <Navbar />
                <OrderHistoryTable />
            </div>
        </div>
    )
}

export default ManufactureGarment
