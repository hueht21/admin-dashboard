import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Login from './page/Login'

import {
  Accounts,
  Customers,
  DashboardLayout,
  OrdersPage,
  MenuPage,
  RoleList,
  RoleDetail,
} from './page'

import ProtectedRoute from './components/ProtectedRoute'
import { useAuth } from './context/AuthContext'

function App() {
  const { user } = useAuth()
  const allowedPaths = user?.listMenu.map((menu) => menu.menuUrl) ?? []

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<DashboardLayout />}>
          <Route element={<ProtectedRoute allowedPaths={allowedPaths} />}>
            <Route path="accounts" element={<Accounts />} />
            <Route path="customers" element={<Customers />} />
            <Route path="orders" element={<OrdersPage />} />
            <Route path="menus" element={<MenuPage />} />
            <Route path="roles" element={<RoleList />} />
            <Route path="roles/:id" element={<RoleDetail />} />
          </Route>

          {/* Thêm route menu khác ở đây */}
        </Route>
      </Routes>
    </Router>
  )
}

export default App
