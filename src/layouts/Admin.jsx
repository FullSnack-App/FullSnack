import React from "react";
import AdminNav from "../pages/Admin/components/AdminNav";
import AdminAside from './../pages/Admin/components/AdminAside';
import { Outlet } from "react-router";


export default function AdminLayout() {
  return (
    <div className="min-h-screen flex flex-col bg-white dark:bg-gray-900">
      <AdminNav />

      <div className="flex flex-1">
        <AdminAside />

        <main className="flex-1 p-6 bg-gray-50 dark:bg-gray-900 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
