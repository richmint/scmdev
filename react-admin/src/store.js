import { applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import { configureStore } from '@reduxjs/toolkit'

import appReducer from "./appReducer";

const store = configureStore(
  appReducer,
  composeWithDevTools(applyMiddleware(thunk)),
  {}
);

export default store;