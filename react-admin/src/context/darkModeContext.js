import React from 'react';

import { createContext, useReducer } from "react";
import DarkModeReducer from "./darkModeReducer";

const INITIAL_STATE = {
  metaMask:'',
  warehouseContract:null,
  factoryContract:null,
  rowmaterialContract:null,
  darkMode: false,
};

export const DarkModeContext = createContext(INITIAL_STATE);

export const DarkModeContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(DarkModeReducer, INITIAL_STATE);

  return (
    <DarkModeContext.Provider value={{ darkMode: state.darkMode,warehouseContract:state.warehouseContract,factoryContract:state.factoryContract, rowmaterialContract:state.rowmaterialContract, metaMask: state.metaMask, dispatch }}>
      {children}
    </DarkModeContext.Provider>
  );
}; 
