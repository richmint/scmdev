import React from 'react';

import "./list.scss"
import Sidebar from "../../components/sidebar/Sidebar"
import Navbar from "../../components/navbar/Navbar"
import ProductApprovertable from "../../components/datatable/ProductApprovertable"

const ProductApproverList = () => { 
  return (
    <div className="list">
      <Sidebar/>
      <div className="listContainer">
        <Navbar/>
        <ProductApprovertable/>
      </div>
    </div>
  )
}

export default ProductApproverList