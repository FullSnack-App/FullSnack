import { Routes, Route } from 'react-router';
import MainLayout from '../layouts/MainLayout';
import Admin from '../layouts/Admin';
import Home from '../pages/Home';
import Menu from '../pages/Menu';
import Contact from '../pages/Contact';
import Checkout from '../pages/checkout';
import About from '../pages/About';
import Offer from '../pages/Offer';
import AdminDashboard from './../pages/Admin/Dashboard';
import AdminMenuItem from '../pages/Admin/components/AdminMenuItems/AdminMenuItem';
import AdminOffers from '../pages/Admin/components/AdminOffers/AdminOffers';
import AdminLayout from '../layouts/Admin';

export const routes = (
    <Routes>
        <Route element={<MainLayout />}>
            <Route path="/" element={<Home />} />
            {/* <Route path="/menu" element={<Menu />} /> */}
            <Route path="/offer/:id" element={<Offer />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/about" element={<About />} />
        </Route>
        <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<AdminDashboard />} />
            <Route path="menu" element={<AdminMenuItem />} />
            <Route path="offers" element={<AdminOffers />} />
        </Route>
        <Route path="*" element={<div>Page Not Found (blank)</div>} />
    </Routes>
);
