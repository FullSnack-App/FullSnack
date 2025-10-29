import { Outlet } from "react-router";
import Navbar from "../components/Navbar";
export default function MainLayout() {
  return (
    <div>
      <Navbar />
      <main>
        <Outlet />
      </main>
      <footer>Main Layout Footer</footer>
    </div>
  );
}
