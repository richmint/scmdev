import { applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import { configureStore } from '@reduxjs/toolkit'
import appReducer from "./appReducer";
import { setupListeners } from '@reduxjs/toolkit/query'

const store = configureStore(
  appReducer,
  process.env.NODE_ENV !== 'production',
  // composeWithDevTools(applyMiddleware(thunk)),
);

export default store;

setupListeners(store.dispatch)