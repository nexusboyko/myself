import React from "react";
import ReactDOM from "react-dom/client";
// import { createBrowserRouter, RouterProvider, BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./redux/store";

import './styles/index.css';
import App from "./App";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { PersistGate } from "redux-persist/integration/react";
import { persistStore } from "redux-persist";

let persistor = persistStore(store);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <GoogleOAuthProvider clientId="895677361548-06d6olon9s3mvips8vgt1u5nsml48ft4.apps.googleusercontent.com">
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <App />
        </PersistGate>
      </Provider>
    </GoogleOAuthProvider>  
  </React.StrictMode>
);
