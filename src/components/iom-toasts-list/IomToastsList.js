import React, { useState } from "react";

import { EuiGlobalToastList } from "@elastic/eui";

let addToastHandler;
let removeAllToastsHandler;
let toastId = 0;

export function successToast({ title, text }) {
  return {
    title,
    text,
    color: "success",
    iconType: "check",
  };
}

export function errorToast({ title, text, error }) {
  return {
    title,
    text: (
      <div>
        <p>{text}</p>
        {error && <p>{error}</p>}
      </div>
    ),
    color: "danger",
    iconType: "alert",
  };
}

export function addToast(toast) {
  addToastHandler(toast);
}

export function removeAllToasts() {
  removeAllToastsHandler();
}

const IomToastsList = () => {
  const [toasts, setToasts] = useState([]);

  addToastHandler = (toast) => {
    toast.id = `toast-${toastId++}`;
    setToasts(toasts.concat(toast));
  };

  const removeToast = (removedToast) => {
    setToasts(toasts.filter((toast) => toast.id !== removedToast.id));
  };

  removeAllToastsHandler = () => {
    setToasts([]);
  };

  return (
    <div style={{ maxWidth: 320 }}>
      <EuiGlobalToastList
        toasts={toasts}
        dismissToast={removeToast}
        toastLifeTimeMs={6000}
      />
    </div>
  );
};

export default IomToastsList;
