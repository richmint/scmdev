import React from 'react';

import "./list.scss"
import Sidebar from "../../components/sidebar/Sidebar"
import Navbar from "../../components/navbar/Navbar"
import Retailertable from "../../components/datatable/Retailertable"

const RetailerList = () => { 
  return (
    <div className="list">
      <Sidebar/>
      <div className="listContainer">
        <Navbar/>
        <Retailertable/>
      </div>
    </div>
  )
}

export default RetailerList