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
import ProfileAdmin from './pages/login/profile';
//Front 
import Userlogin from "./Front/login/Login";
import Profile from "./Front/user/Profile";
import Materialsupplier from "./Front/supplier/Dashboard";
import Addbatch from "./Front/supplier/AddMaterialForm";
import Approvesupplier from "./Front/supplier/ApproveSupply";
import ViewSupplyToken from "./Front/supplier/viewSupplyToken";
import AvailableRawMaterialToBuy from "./Front/factory/availableRawMaterialToBuy";
import ApproveFactorySupplier from "./Front/factory/approveSupplyToken";
import SellItemToDistributer from "./Front/factory/sellItemDistributer";
import SellItemFormData from './Front/factory/selItemFormData';
import BuyRawMaterial from './Front/factory/buyRawMaterial';
import StoredItemsInWarehouse from './Front/warehouse/viewWarehouseItems';
import AvailabelItemToSellRetailer from './Front/distributer/sellItemDistributer';
import ApproveDistributerSupplier from './Front/distributer/approveSupplyToken';
import SellToRetailer from './Front/distributer/sellToRetailer';
import SpinningWaevingMaterial from './Front/factory/spinningWeaving';
import ManufactureGarmentMaterial from './Front/factory/manufactureGarment';
import ViewBatch from './Front/factory/viewBatch';
import ViewBatchStatus from './Front/factory/viewBatchStatus';
import ViewSpinningMaterial from './Front/factory/viewspinningMaterial';
import Spinningbatchcompleteform from './Front/factory/spinningbatchcompleteform';
import GarmentBatchCompleteForm from './Front/factory/garmentBatchCompleteForm';
import QualityCheckRawMaterail from './Front/factory/qualityCheckRawMaterial';
import ProductQualityCheck from './Front/factory/productQualtityCheck';

//End Front
import {BrowserRouter, Routes, Route, useNavigate, Link, Navigate, Switch, Router } from "react-router-dom";
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
  const FrontAuth = useSelector(state=>state.auth);
  const [token,setToken] = useState(undefined);
  const [frontToken,setFrontToken] = useState(undefined);
  
  useEffect(()=>{
    if(AdminAuth){
      setToken(AdminAuth.token || undefined);
    }
  },[AdminAuth]); 

  useEffect(()=>{
    if(FrontAuth){
      setFrontToken(FrontAuth.token || undefined);
    }
  },[FrontAuth]); 

  //console.log("Admin Token",token,token ? "Token Present" : "token not present");
  return (
    <div className={darkMode ? "app dark" : "app"}>
      <BrowserRouter>
           <Routes>
              <Route path="/admin" element={token ? <Navigate to={"/admin/home"} /> : <Navigate to={"/admin/login"} />} />
              <Route path="/admin/login" element={token ? <Navigate to={"/admin/home"} />  : <Login />} /> 
              <Route path="/admin/profile" element={token ? <ProfileAdmin />: <Navigate to={"/admin/login"} />} />
              <Route path="/admin/home" element={token ? <Home /> : <Navigate to={"/admin/login"} />} />
              <Route path="/admin/warehouse" element={token ? <WarehouseList />: <Navigate to={"/admin/login"} />} />
              <Route path="/admin/warehouse/:warehouseId" element={token ? <Single />: <Navigate to={"/admin/login"} />} />
              <Route path="/admin/warehouse/new" element={token ? <Warehouseform inputs={warehouseInputs} title="Add New Warehouse" /> : <Navigate to={"/admin/login"} />} />
              <Route path="/admin/factory" element={token ? <FactoryList />: <Navigate to={"/admin/login"} />} />
              <Route path="/admin/factory/:factoryId" element={token ? <Single />: <Navigate to={"/admin/login"} />} />
              <Route path="/admin/factory/new" element={token ? <Factoryform inputs={factoryInputs} title="Add New Factory" /> : <Navigate to={"/admin/login"} />} />
              <Route path="/admin/rawmaterialsupplier" element={token ? <RawMaterialSupplierList />: <Navigate to={"/admin/login"} />} />
              <Route path="/admin/rawmaterialsupplier/:rawmaterialsupplierId" element={token ? <Single />: <Navigate to={"/admin/login"} />} />
              <Route path="/admin/rawmaterialsupplier/new" element={token ? <Rawmaterialsupplierform inputs={warehouseInputs} title="Add New Factory" /> : <Navigate to={"/admin/login"} />} />
              <Route path="/admin/users" element={token ? <List />: <Navigate to={"/admin/login"} />} />
              <Route path="/admin/users/:userId" element={token ? <Single />: <Navigate to={"/admin/login"} />} />
              <Route path="/admin/users/new" element={token ? <New inputs={userInputs} title="Add New User" /> : <Navigate to={"/admin/login"} />} />
           
              <Route index path="/" element={<LandingPage />} />
              <Route path="/userlogin" element={frontToken ? <Navigate to={"/material-supplier"} /> : <Userlogin />} />
              <Route path="/profile" element={frontToken ? <Profile /> : <Navigate to={"/userlogin"} />} />
              <Route path="/material-supplier" element={ frontToken ? <Materialsupplier />  : <Navigate to={"/userlogin"} />} />
              <Route path="/addbatch" element={frontToken ? <Addbatch /> : <Navigate to={"/userlogin"} />} />
              <Route path="/supplyToken" element={frontToken ? <ViewSupplyToken /> : <Navigate to={"/userlogin"} />} />
              <Route path="/approveSupplier" element={frontToken ? <Approvesupplier /> : <Navigate to={"/userlogin"} />} />
              
              {/* Front Factory Routes */}
              <Route path="/availableRawMaterialToBuy" element={frontToken ? <AvailableRawMaterialToBuy /> : <Navigate to={"/userlogin"} />} />
              <Route path="/approveFactorySupplier" element={frontToken ? <ApproveFactorySupplier /> : <Navigate to={"/userlogin"} />} />
              <Route path="/sellItemToDistributer" element={frontToken ? <SellItemToDistributer /> : <Navigate to={"/userlogin"} />} /> 
              <Route path="/sellItemFormData" element={frontToken ? <SellItemFormData /> : <Navigate to={"/userlogin"} />} />
              <Route path="/buyRawMaterial" element={frontToken ? <BuyRawMaterial /> : <Navigate to={"/userlogin"} />} />
              
              <Route path="/spinningWaevingMaterial" element={frontToken ? <SpinningWaevingMaterial /> : <Navigate to={"/userlogin"} />} />
              <Route path="/manufactureGarmentMaterial" element={frontToken ? <ManufactureGarmentMaterial /> : <Navigate to={"/userlogin"} />} />
              <Route path="/viewBatch" element={frontToken ? <ViewBatch /> : <Navigate to={"/userlogin"} />} />
              <Route path="/viewBatchStatus" element={frontToken ? <ViewBatchStatus /> : <Navigate to={"/userlogin"} />} />
              <Route path="/viewSpinningMaterial" element={frontToken ? <ViewSpinningMaterial /> : <Navigate to={"/userlogin"} />} />
              <Route path="/spinningBatchCompleteForm" element={frontToken ? <Spinningbatchcompleteform /> : <Navigate to={"/userlogin"} />} />
              <Route path="/garmentBatchCompleteForm" element={frontToken ? <GarmentBatchCompleteForm /> : <Navigate to={"/userlogin"} />} />
              <Route path="/storedItemsInWarehouse" element={frontToken ? <StoredItemsInWarehouse /> : <Navigate to={"/userlogin"} />} />
              <Route path="/rawMaterialQualityCheck" element={frontToken ? <QualityCheckRawMaterail /> : <Navigate to={"/userlogin"} />} />
              <Route path="/productQualityCheck" element={frontToken ? <ProductQualityCheck /> : <Navigate to={"/userlogin"} />} />

               {/* Front Distributer Routes */}
              <Route path="/availabelItemToSellRetailer" element={frontToken ? <AvailabelItemToSellRetailer /> : <Navigate to={"/userlogin"} />} />
              <Route path="/approveDistributerSupplier" element={frontToken ? <ApproveDistributerSupplier /> : <Navigate to={"/userlogin"} />} />
              <Route path="/sellToRetailer" element={frontToken ? <SellToRetailer /> : <Navigate to={"/userlogin"} />} />


            </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

