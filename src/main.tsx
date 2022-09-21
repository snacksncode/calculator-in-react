import React from "react";
import ReactDOM from "react-dom/client";
import { App } from "./components/App";
import "./main.scss";

ReactDOM.createRoot(document.querySelector("#root") as HTMLDivElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
