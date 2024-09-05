import { createRoot } from "react-dom/client";
import App from "./App.tsx";

import "../src/styles/_global.scss";
import { BrowserRouter as Router } from "react-router-dom";

createRoot(document.getElementById("root")!).render(
  <Router>
    <App />
  </Router>
);
