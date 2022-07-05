import React from "react";
import ReactDOM from "react-dom";
import { Provider } from 'react-redux'
import App from "./App";
import { DarkModeContextProvider } from "./context/darkModeContext";
import store from "./store";

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
        <DarkModeContextProvider>
          <App />
        </DarkModeContextProvider>
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
