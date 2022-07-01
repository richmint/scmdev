import React from 'react';

import "./sidebar.scss";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import StoreIcon from "@mui/icons-material/Store";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import { Link } from "react-router-dom";
import { DarkModeContext } from "../../context/darkModeContext";
import { useContext } from "react";

const Sidebar = () => {
  const { dispatch } = useContext(DarkModeContext);
  return (
    <div className="sidebar">
      <div className="top">
        <Link to="/" style={{ textDecoration: "none" }}>
          <span className="logo">Richmint</span>
        </Link>
      </div>
      <hr />
      <div className="center">
        <ul>
          
          <Link to="/admin/warehouse" style={{ textDecoration: "none" }}>
            <li>
              <StoreIcon className="icon" />
              <span>Warehouse</span>
            </li>
          </Link>
          <Link to="/admin/factory" style={{ textDecoration: "none" }}>
            <li>
              <StoreIcon className="icon" />
              <span>Factory</span>
            </li>
          </Link>
          <Link to="/admin/rawmaterialsupplier" style={{ textDecoration: "none" }}>
            <li>
              <StoreIcon className="icon" />
              <span>Raw Matterial Supplier</span>
            </li>
          </Link>
          {/* <Link to="/product-approver" style={{ textDecoration: "none" }}>
            <li>
              <StoreIcon className="icon" />
              <span>Product Approver</span>
            </li>
          </Link>
          <Link to="/distributer" style={{ textDecoration: "none" }}>
            <li>
              <StoreIcon className="icon" />
              <span>Distributer</span>
            </li>
          </Link>
          <Link to="/retailer" style={{ textDecoration: "none" }}>
            <li>
              <StoreIcon className="icon" />
              <span>Retailer</span>
            </li>
          </Link> */}
          <Link to="/admin/users" style={{ textDecoration: "none" }}>
            <li>
              <PersonOutlineIcon className="icon" />
              <span>Users</span>
            </li>
          </Link>
          
          
          <li>
            <ExitToAppIcon className="icon" />
            <span>Logout</span>
          </li>
        </ul>
      </div>
      <div className="bottom">
        <div
          className="colorOption"
          onClick={() => dispatch({ type: "LIGHT" })}
        ></div>
        <div
          className="colorOption"
          onClick={() => dispatch({ type: "DARK" })}
        ></div>
      </div>
    </div>
  );
};

export default Sidebar;
