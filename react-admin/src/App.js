import React,{useEffect, useState} from 'react';

import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import List from "./pages/list/List";
import WarehouseList from "./pages/list/warehouseList";
import FactoryList from "./pages/list/factoryList";
import RawMaterialSupplierList from "./pages/list/RawMaterialSupplierList"; 
import ProductApproverList from "./pages/list/ProductApproverList";
import DistributerList from "./pages/list/DistributerList";
import RetailerList from "./pages/list/RetailerList";   
import Single from "./pages/single/Single";
import New from "./pages/new/New";

//Front 
import Userlogin from "./Front/login/Login";
import Profile from "./Front/user/Profile";
import Materialsupplier from "./Front/supplier/Dashboard";
import Addbatch from "./Front/supplier/AddMaterialForm";

//End Front
import {BrowserRouter, Routes, Route, useNavigate, Link, Navigate } from "react-router-dom";
import { productInputs, userInputs, warehouseInputs, factoryInputs, productApproverInputs, distributerInputs, retailerInputs} from "./formSource";
import "./style/dark.scss";
import { useContext } from "react";
import { DarkModeContext } from "./context/darkModeContext";
import { useSelector, useDispatch } from 'react-redux';
import Warehouseform from "./pages/new/Warehuseform";
import Factoryform from "./pages/new/Factoryform";
import Rawmaterialsupplierform from "./pages/new/Rawmaterialsupplierform";

const authorizeRoutes = () => (
  <Routes>
    <Route path="/admin/home" element={<Home />} />
    <Route path="users">
      <Route index element={<List />} />
      <Route path=":userId" element={<Single />} />
      <Route
        path="new"
        element={<New inputs={userInputs} title="Add New User" />}
      />
    </Route>
    <Route path="products">
      <Route index element={<List />} />
      <Route path=":productId" element={<Single />} />
      <Route
        path="new"
        element={<New inputs={productInputs} title="Add New Product" />}
      />
    </Route>
    <Route path="warehouse">
      <Route index element={<WarehouseList />} />
      <Route path=":warehouseId" element={<Single />} />
      <Route
        path="new"
        element={<Warehouseform inputs={warehouseInputs} title="Add New Warehouse" />}
      />
    </Route>
    <Route path="factory">
      <Route index element={<FactoryList />} />
      <Route path=":factoryId" element={<Single />} />
      <Route
        path="new"
        element={<Factoryform inputs={factoryInputs} title="Add New Factory" />}
      />
    </Route>
    <Route path="rawmaterialsupplier">
              <Route index element={<RawMaterialSupplierList />} />
              <Route path=":rawmaterialsupplierId" element={<Single />} />
              <Route
                path="new"
                element={<Rawmaterialsupplierform inputs={productInputs} title="Add New Raw Material Supplier" />}
              />
            </Route>
    <Route path="product-approver">
      <Route index element={<ProductApproverList />} />
      <Route path=":productApproverId" element={<Single />} />
      <Route
        path="new"
        element={<New inputs={productApproverInputs} title="Add New Product Approver" />}
      />
    </Route>
    <Route path="distributer">
      <Route index element={<DistributerList />} />
      <Route path=":distributerId" element={<Single />} />
      <Route
        path="new"
        element={<New inputs={distributerInputs} title="Add New Distributer" />}
      />
    </Route>
    <Route path="retailer">
      <Route index element={<RetailerList />} />
      <Route path=":retailerId" element={<Single />} />
      <Route
        path="new"
        element={<New inputs={retailerInputs} title="Add New Retailer" />}
      />
    </Route>
    </Routes>
)


const LandingPage = () => (
    <div> 
      <h1>Welcome to the Supply Chain Management</h1>
        <Link to="/userlogin" style={{ textDecoration: "none" }}>
          <button>Login</button>
        </Link>
    </div>
)

function App() {  
  const { darkMode } = useContext(DarkModeContext);
  const AdminAuth = useSelector(state=>state.adminAuth);
  const [token,setToken] = useState(undefined);
  
  useEffect(()=>{
    if(AdminAuth){
      setToken(AdminAuth.token || undefined);
    }
  },[AdminAuth]);

  return (
    <div className={darkMode ? "app dark" : "app"}>
      <BrowserRouter>
           <Routes>
              <Route index path="/admin" element={token ? <Navigate to={"/admin/home"} /> : <Navigate to={"/admin/login"} />} />
              <Route path="/admin/login" element={token ? <Navigate to={"/admin/home"} />  : <Login />} /> 
              <Route path="/admin/home" element={token ? <Home /> : <Navigate to={"/admin/login"} />} />
              <Route path="/admin/warehouse" element={token ? <WarehouseList />: <Navigate to={"/admin/login"} />} />
              <Route path="/admin/warehouse/:warehouseId" element={token ? <Single />: <Navigate to={"/admin/login"} />} />
              <Route path="/admin/warehouse/new" element={token ? <Warehouseform inputs={warehouseInputs} title="Add New Warehouse" /> : <Navigate to={"/admin/login"} />} />
            </Routes>
        <Routes>
            <Route index path="/" element={<LandingPage />} />
            <Route index path="/userlogin" element={<Userlogin />} />
            <Route index path="/profile" element={<Profile />} />
            <Route index path="/material-supplier" element={<Materialsupplier />} />
            <Route index path="/addbatch" element={<Addbatch />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

