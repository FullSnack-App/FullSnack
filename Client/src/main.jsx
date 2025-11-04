import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { Toaster } from "react-hot-toast";
import { MenuProvider } from "./context/menuProvider.jsx";

createRoot(document.getElementById("root")).render(
    <MenuProvider>
        <Toaster/>
        <App />
    </MenuProvider>
);
