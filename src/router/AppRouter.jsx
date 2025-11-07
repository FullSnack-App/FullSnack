import { Routes, Route } from 'react-router';
import MainLayout from '../layouts/MainLayout';
import Home from '../pages/Home';
import Contact from '../pages/Contact';
import About from '../pages/About';
import Offer from '../pages/Offer';
import AdminDashboard from './../pages/Admin/Dashboard';
import AdminMenuItem from '../pages/Admin/components/AdminMenuItems/AdminMenuItem';
import AdminOffers from '../pages/Admin/components/AdminOffers/AdminOffers';

import { ROUTES } from '../config/routes';
import ProtectedRoute from '../components/ProtectedRoute';
import Profile from '../pages/Profile';
import OrderCancel from '../pages/OrderCancel';
import Checkout from '../pages/Checkout';
import OrderSuccess from '../pages/OrderSucces';
import AdminLayout from './../layouts/Admin';
import AdminOrders from './../pages/Admin/components/AdminOrders/AdminOrder';
import ProtectedAminRoute from '../components/ProtectedAdmin';
import { OrderProvider } from '../context/OrderProvider';
export const routes = (
    <Routes>
        <Route element={<MainLayout />}>
            <Route path={ROUTES.HOME} element={<Home />} />
            <Route path={ROUTES.OFFER} element={<Offer />} />
            <Route path={ROUTES.CONTACT} element={<Contact />} />
            <Route path={ROUTES.ABOUT} element={<About />} />

            <Route
                path={ROUTES.PROFILE}
                element={
                    <ProtectedRoute>
                        <Profile />
                    </ProtectedRoute>
                }
            />

            <Route
                path={ROUTES.CHECKOUT}
                element={
                    <ProtectedRoute>
                        <Checkout />
                    </ProtectedRoute>
                }
            />
            <Route
                path={ROUTES.ORDER_SUCCESS}
                element={
                    <ProtectedRoute>
                        <OrderSuccess />
                    </ProtectedRoute>
                }
            />
            <Route
                path={ROUTES.ORDER_CANCEL}
                element={
                    <ProtectedRoute>
                        <OrderCancel />
                    </ProtectedRoute>
                }
            />
        </Route>
        <OrderProvider>
            <Route
                path={ROUTES.ADMIN}
                element={
                    <ProtectedAminRoute>
                        <AdminLayout />
                    </ProtectedAminRoute>
                }
            >
                <Route index element={<AdminDashboard />} />
                <Route path="menu" element={<AdminMenuItem />} />
                <Route path="offers" element={<AdminOffers />} />
                <Route path="orders" element={<AdminOrders />} />

            </Route>
        </OrderProvider>



        <Route path="*" element={<div>Page Not Found</div>} />
    </Routes>
);
