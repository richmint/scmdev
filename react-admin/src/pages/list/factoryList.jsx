import React from 'react';

import "./list.scss"
import Sidebar from "../../components/sidebar/Sidebar"
import Navbar from "../../components/navbar/Navbar"
import Factorytable from "../../components/datatable/Factorytable"

const FactoryList = () => { 
  return (
    <div className="list">
      <Sidebar/>
      <div className="listContainer">
        <Navbar/>
        <Factorytable/>
      </div>
    </div>
  )
}

export default FactoryList