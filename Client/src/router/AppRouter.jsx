import { Routes, Route, Navigate } from 'react-router';
import MainLayout from '../layouts/MainLayout';
import Admin from '../layouts/Admin';
import Home from '../pages/Home';
import Menu from '../pages/Menu';
import Contact from '../pages/Contact';
import Checkout from '../pages/checkout';
import About from '../pages/About';
import Offer from '../pages/Offer';
import AdminMenuItem from '../pages/Admin/components/AdminMenuItem';
import AdminOffers from '../pages/Admin/components/AdminOffers';
import AdminDashboard from '../pages/Admin/Dashboard';
import Login from '../pages/Login';
import { ROUTES } from '../config/routes';
import ProtectedRoute from '../components/ProtectedRoute';

export const routes = (
    <Routes>
        <Route element={<MainLayout />}>
            <Route path={ROUTES.HOME} element={<Home />} />
            <Route path={ROUTES.OFFER} element={<Offer />} />
            <Route path={ROUTES.CONTACT} element={<Contact />} />
            <Route path={ROUTES.ABOUT} element={<About />} />
            <Route path={ROUTES.LOGIN} element={<Login />} />

            <Route
                path={ROUTES.CHECKOUT}
                element={
                    <ProtectedRoute>
                        <Checkout />
                    </ProtectedRoute>
                }
            />
        </Route>

        {/* Admin Routes - All Protected */}
        <Route
            path={ROUTES.ADMIN}
            element={
                <ProtectedRoute>
                    <Admin />
                </ProtectedRoute>
            }
        >
            <Route index element={<AdminDashboard />} />
            <Route path="menu" element={<AdminMenuItem />} />
            <Route path="offers" element={<AdminOffers />} />
        </Route>

        <Route path="*" element={<div>Page Not Found</div>} />
    </Routes>
);
