import React,{useEffect} from 'react';

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
//End Front
import {BrowserRouter, Routes, Route, useNavigate, Link } from "react-router-dom";
import { productInputs, userInputs, warehouseInputs, factoryInputs, productApproverInputs, distributerInputs, retailerInputs} from "./formSource";
import "./style/dark.scss";
import { useContext } from "react";
import { DarkModeContext } from "./context/darkModeContext";
import { useSelector, useDispatch } from 'react-redux';
import Warehouseform from "./pages/new/Warehuseform";
import Factoryform from "./pages/new/Factoryform";
import Rawmaterialsupplierform from "./pages/new/Rawmaterialsupplierform";

const authorizeRoutes = () => (
  <>
  <Route path="home" element={<Home />} />
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
    </>
)

const authRoute = () => (
  <Route path="login" element={<Login />} />
)

const AuthHandler = () => {
  const navigate = useNavigate();
  const loginState = useSelector((state)=>state.login);
  const {auth} = loginState;

  useEffect(()=>{
    console.log("Login State",auth);
   if(auth){
    console.log("send to login page",auth);
    navigate("home");
   }else{
    navigate("login");
   }
  },[auth]);

  return (
    <div>
      <h1>Welcome to the app!</h1>
      <nav>
        {!auth && <Link to="login">Login</Link>}
        {auth && <Link to="home">Home</Link>}
      </nav>
    </div>
  )
}

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
  const loginState = useSelector((state)=>state.login);
  const {auth} = loginState;

  return (
    <div className={darkMode ? "app dark" : "app"}>
      <BrowserRouter>
        <Routes>
          <Route path="/admin">
            <Route index path="/admin" element={<AuthHandler />} />
            {auth && authorizeRoutes()}
            {!auth && authRoute() }
          </Route>
          <Route path="/">
            <Route index path="/" element={<LandingPage />} />
            <Route index path="/userlogin" element={<Userlogin />} />
            <Route index path="/profile" element={<Profile />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

