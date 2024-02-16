import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import "./App.scss";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { store } from "./redux/store";

const el = document.getElementById("app");

createRoot(el).render(
  <BrowserRouter>
    <Provider store={store}>
      <App />
    </Provider>
  </BrowserRouter>
);
