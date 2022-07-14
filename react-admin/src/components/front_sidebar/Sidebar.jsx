import React,{useState,useContext} from 'react';
import StoreIcon from "@mui/icons-material/Store";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import { Link } from "react-router-dom";
import { DarkModeContext } from "../../context/darkModeContext";
import { useNavigate } from "react-router-dom";
import "./sidebar.scss";
import { logout } from '../../Front/login/LoginSlice';
import { useDispatch } from 'react-redux';


const Sidebar = () => {
  const { dispatch } = useContext(DarkModeContext);
  const navigate = useNavigate();
  const dispatchStore = useDispatch() 
  const signOut = (event) => {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    localStorage.removeItem("userEmail");
    localStorage.removeItem("userRole");
    localStorage.removeItem("userName");
    dispatchStore(logout());
    navigate("/userlogin");
  }
  return (
    <div className="sidebar">
      <div className="top">
        <Link to="/" style={{ textDecoration: "none" }}>
          <span className="logo">Richmint Front</span>
        </Link>
      </div>
      <hr />
      <div className="center">
        <ul>

        {(() => {
            if (localStorage.userRole == 'Supplier') {
              return (
                <>
                <Link to="/addbatch" style={{ textDecoration: "none" }}>
                  <li>
                    <StoreIcon className="icon" />
                    <span>Add a Batch</span>
                  </li>
                </Link>
                <Link to="/supplyToken" style={{ textDecoration: "none" }}>
                  <li>
                    <StoreIcon className="icon" />
                    <span>View Supply Tokens</span>
                  </li>
                </Link>
                <Link to="/approveSupplier" style={{ textDecoration: "none" }}>
                  <li>
                    <StoreIcon className="icon" />
                    <span>Approve Supply Tokens</span>
                  </li>
                </Link>
          </>
              )
            } else if (localStorage.userRole == 'Factory') {
              return (
                <>
                <Link to="/availableRawMaterialToBuy" style={{ textDecoration: "none" }}>
                  <li>
                    <StoreIcon className="icon" />
                    <span>Available Raw Material to Buy</span>
                  </li>
                </Link>
                <Link to="/approveFactorySupplier" style={{ textDecoration: "none" }}>
                  <li>
                    <StoreIcon className="icon" />
                    <span>Approve Supply Token</span>
                  </li>
                </Link>
                <Link to="/sellItemToDistributer" style={{ textDecoration: "none" }}>
                  <li>
                    <StoreIcon className="icon" />
                    <span>Sell Item to Distributer</span>
                  </li>
                </Link>
                
                </>
              )
            } else if (localStorage.userRole == 'Warehouse') {
              return(
                <>
                <Link to="/storedItemsInWarehouse" style={{ textDecoration: "none" }}>
            <li>
              <StoreIcon className="icon" />
              <span>Stored Items Details</span>
            </li>
          </Link>
                </>
              )

            }

        })()}
          <li onClick={signOut}>
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
