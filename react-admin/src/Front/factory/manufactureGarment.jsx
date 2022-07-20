import React from "react";
// import Sidebar from "../../components/sidebar/Sidebar";
import Sidebar from "../../components/front_sidebar/Sidebar";
import Navbar from "../../components/front_navbar/Navbar";
import '../../style/front/list.scss'
import ManufactureGarmentTable from "./manufactureGarmentTable";


const ManufactureGarment= () =>{
    return(
        <div className="list">
            <Sidebar />
            <div className="listContainer">
                <Navbar />
                <ManufactureGarmentTable />
            </div>
        </div>
    )
}

export default ManufactureGarment
