import React from 'react';

import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import "./home.scss";
import Widget from "../../components/widget/Widget";
import Featured from "../../components/featured/Featured";
import Chart from "../../components/chart/Chart";
import Table from "../../components/table/Table";

const Home = () => {
  return (
    <div className="home">
      <Sidebar />
      <div className="homeContainer">
        <Navbar />
        <div className="widgets">
          <Widget type="warehouse" />
          <Widget type="factory" />
          <Widget type="productApprover" />
          <Widget type="distributer" />
          <Widget type="retailer" />
          <Widget type="customer" />
        </div>
        
        
      </div>
    </div>
  );
};

export default Home;
