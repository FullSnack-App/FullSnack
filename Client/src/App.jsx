import "./App.css";
import { routes } from "./router/AppRouter";
import { BrowserRouter } from "react-router";

function App() {
  return <BrowserRouter>{routes}</BrowserRouter>;
}

export default App;
