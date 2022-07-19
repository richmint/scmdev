import React from 'react';

import { createContext, useReducer } from "react";
import DarkModeReducer from "./darkModeReducer";

const INITIAL_STATE = {
  metaMask:'',
  supplyChainContract:null,
  supplyChainTokenContract:null,
  approveTokenContract:null,
  ownSupplyChainAddress:null,
  darkMode: false, 
}; 
export const DarkModeContext = createContext(INITIAL_STATE);
export const DarkModeContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(DarkModeReducer, INITIAL_STATE);
  return (
    <DarkModeContext.Provider value={{ darkMode: state.darkMode,supplyChainContract:state.supplyChainContract, supplyChainTokenContract:state.supplyChainTokenContract,approveTokenContract:state.approveTokenContract,ownSupplyChainAddress:state.ownSupplyChainAddress,  metaMask: state.metaMask, dispatch }}>
      {children}
    </DarkModeContext.Provider>
  );
};  
