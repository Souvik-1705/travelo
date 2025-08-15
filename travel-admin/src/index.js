import React from "react";
import { createRoot } from "react-dom/client"; // ✅ new in React 18
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import store from "./redux/store";

const container = document.getElementById("root");
const root = createRoot(container); // ✅ create the root
root.render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
);
