import { Routes, Route, Navigate } from 'react-router';

import AdminDashboard from './../pages/Admin/Dashboard';
import AdminMenuItem from '../pages/Admin/components/AdminMenuItems/AdminMenuItem';
import AdminOffers from '../pages/Admin/components/AdminOffers/AdminOffers';

import AdminLayout from './../layouts/Admin';
import { ROUTES } from '../config/routes';
import ProtectedAminRoute from '../components/ProtectedAdmin';
import AdminOrder from '../pages/Admin/components/AdminOrders/AdminOrder';
import { OrderProvider } from '../context/OrderProvider';
export const adminRoutes = (
    <Route
        path={ROUTES.ADMIN}
        element={
            <ProtectedAminRoute>
                <OrderProvider>
                    <AdminLayout />
                </OrderProvider>
            </ProtectedAminRoute>
        }
    >
        <Route index element={<AdminDashboard />} />
        <Route path="menu" element={<AdminMenuItem />} />
        <Route path="offers" element={<AdminOffers />} />
        <Route path="orders" element={<AdminOrder />} />
    </Route>
);
