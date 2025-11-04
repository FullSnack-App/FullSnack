import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { MenuProvider } from "./context/MenuProvider.jsx";
import { Toaster } from "react-hot-toast";

createRoot(document.getElementById("root")).render(
    <MenuProvider>
        <Toaster/>
        <App />
    </MenuProvider>
);
