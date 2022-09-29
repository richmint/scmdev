import React,{ useEffect, useState, useContext, useMemo } from "react";
import Sidebar from "../../components/front_sidebar/Sidebar";
import Navbar from "../../components/front_navbar/Navbar";
import "../../style/front/list.scss";
import ViewListTable from "./viewListTable";

const ViewItemSellList = () =>{
    return(
        <div className="new">
        <Sidebar txt={"viewSellList"} />
        <div className="newContainer">
          <Navbar />
          <ViewListTable  />
        </div>
      </div>
    )
}
export default ViewItemSellList