import { Routes, Route } from "react-router";
import MainLayout from "../layouts/MainLayout";
import Home from "../pages/Home";
import Menu from "../pages/Menu";
import Contact from "../pages/Contact";
import Checkout from "../pages/checkout";
import About from "../pages/About";

export const routes = (
  <Routes>
    <Route element={<MainLayout />}>
      <Route path="/" element={<Home />} />
      <Route path="/menu" element={<Menu />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/checkout" element={<Checkout />} />
      <Route path="/about" element={<About />} />
    </Route>
    <Route path="*" element={<div>Page Not Found (blank)</div>} />
  </Routes>
);
