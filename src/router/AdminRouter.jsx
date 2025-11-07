import { Routes, Route, Navigate } from 'react-router';

import AdminDashboard from './../pages/Admin/Dashboard';
import AdminMenuItem from '../pages/Admin/components/AdminMenuItems/AdminMenuItem';
import AdminOffers from '../pages/Admin/components/AdminOffers/AdminOffers';

import AdminLayout from './../layouts/Admin';
export const adminRoutes = (
    <Routes>
        <Route path="admin" element={<AdminLayout />}>
            <Route index element={<AdminDashboard />} />
            <Route path="menu" element={<AdminMenuItem />} />
            <Route path="offers" element={<AdminOffers />} />
        </Route>

        {/* Redirect anything unknown to /admin */}
        <Route path="*" element={<Navigate to="/admin" replace />} />
    </Routes>
);
