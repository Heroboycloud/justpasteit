import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./components/App/App";

import { BrowserRouter as Router } from "react-router-dom";

// Some older CRA-era packages (use-dark-mode, react-toggle, etc.) reference
// `process.env` directly. Vite doesn't polyfill Node's `process` global like
// webpack/CRA did, so without this the whole app can crash silently with
// "process is not defined" before it ever renders.
if (typeof window !== "undefined" && typeof window.process === "undefined") {
  window.process = { env: {} };
}

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Router>
      <App />
    </Router>
  </React.StrictMode>
);
