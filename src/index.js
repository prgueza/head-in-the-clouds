import React from "react";
import ReactDOM from "react-dom";
import "./assets/index.css";
import IomApp from "./views/iom-app/IomApp";
import reportWebVitals from "./utils/reportWebVitals";

ReactDOM.render(
  <React.StrictMode>
    <IomApp />
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
