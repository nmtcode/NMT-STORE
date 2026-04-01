import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { StyledEngineProvider } from "@mui/material/styles";
import App from "./App";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <StyledEngineProvider injectFirst>
      {/* <CartProvider> */} {/* أضف هذا هنا */}
      <App />
      {/* </CartProvider> */}
    </StyledEngineProvider>
  </React.StrictMode>,
);
