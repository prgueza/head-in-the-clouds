import React from "react";
import ReactDOM from "react-dom";
import "./assets/index.css";
import "@elastic/eui/dist/eui_theme_amsterdam_light.css";
import IomApp from "./views/iom-app/IomApp";
import reportWebVitals from "./utils/reportWebVitals";
import { Provider } from "react-redux";
import { IomAuthProvider } from "./providers/IomAuthProvider";

import store from "./store";

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <IomAuthProvider>
        <IomApp />
      </IomAuthProvider>
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
