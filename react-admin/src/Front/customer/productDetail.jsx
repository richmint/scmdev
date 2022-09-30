import React from "react";
import Sidebar from "../../components/front_sidebar/Sidebar";

import Navbar from "../../components/front_navbar/Navbar";
import '../../style/front/list.scss'
import DetailPage from "./detailPage";


const ProductDetail = () =>{
    return(
        <div className="list">
            <Sidebar txt={""} />
            <div className="listContainer">
                <Navbar />
                <DetailPage />
            </div>
        </div>
    )
}
export default ProductDetail