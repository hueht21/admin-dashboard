// src/routes/AppRoutes.js
import { Routes, Route, Navigate } from 'react-router-dom';
import ProtectedRoute from './ProtectedRoute';
import { useAuth } from '../context/AuthContext';


import DashboardLayout from '../page/Dashboard';

import ForbiddenPage from '../page/ForbiddenPage'

import HomePage  from '../page/HomePage';

import menuPageMap from './menuPageMap';

const AppRoutes = () => {
  const { menus } = useAuth();

  
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/home" />} />
      <Route path="/home" element={<HomePage />} />
      <Route path="/403" element={<ForbiddenPage />} />

      <Route path="/dashboard" element={<DashboardLayout />}>
        {menus.map((menu) => {
          const PageComponent = menuPageMap[menu.menuUrl] || ForbiddenPage;

          // Convert "/orders" → "orders" (tức path con trong /dashboard)
          const relativePath = menu.menuUrl.replace(/^\//, '');

          return (
            <Route
              key={menu.id}
              path={relativePath}
              element={<PageComponent />}
            />
          );
        })}
      </Route>
      <Route path="*" element={<ForbiddenPage />} />
    </Routes>
  );
}

export default AppRoutes;
