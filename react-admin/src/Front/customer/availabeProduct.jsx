import React from "react";
// import Sidebar from "../../components/sidebar/Sidebar";
import Sidebar from "../../components/front_sidebar/Sidebar";
import Navbar from "../../components/front_navbar/Navbar";
import '../../style/front/list.scss'
import AvailabeProductCustomerTable from "./availabeProductTable";


const ManufactureGarment= () =>{
    return(
        <div className="list">
            <Sidebar txt={"avlprodcustomer"} />
            <div className="listContainer">
                <Navbar />
                <AvailabeProductCustomerTable />
            </div>
        </div>
    )
}

export default ManufactureGarment
