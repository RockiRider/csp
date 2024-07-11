import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { CacheProvider } from "@emotion/react";
import createCache from "@emotion/cache";

const customCache = createCache({
  key: "custom",
  insertionPoint: document.getElementById("emotion-cache")!,
});

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <CacheProvider value={customCache}>
      <App />
    </CacheProvider>
  </React.StrictMode>
);
