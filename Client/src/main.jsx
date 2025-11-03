import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { OffersProvider } from "./context/offersProvider.jsx";

createRoot(document.getElementById("root")).render(
    <OffersProvider>

        <App />
    </OffersProvider>
);
