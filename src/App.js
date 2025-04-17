import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom'
import Login from './page/Login'

import {
  Accounts,
  Customers,
  DashboardLayout,
  OrdersPage,
  MenuPage,
  RoleList,
  RoleDetail,
  UserManagerPage,
  UserRolePage,
  HomePage,
} from './page'

import ProtectedRoute from './components/ProtectedRoute'
import { useAuth } from './context/AuthContext'

function App() {
  const { user } = useAuth()
  const allowedPaths = user?.listMenu.map((menu) => menu.menuUrl) ?? []

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/home" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/dashboard" element={<DashboardLayout />}>
          <Route element={<ProtectedRoute allowedPaths={allowedPaths} />}>
            <Route path="accounts" element={<Accounts />} />
            <Route path="customers" element={<Customers />} />
            <Route path="orders" element={<OrdersPage />} />
            <Route path="menus" element={<MenuPage />} />
            <Route path="roles" element={<RoleList />} />
            <Route path="roles/:id" element={<RoleDetail />} />
            <Route path="user-manager" element={<UserManagerPage />} />
            <Route path="user-manager/:id" element={<UserRolePage />} />
          </Route>

          {/* Thêm route menu khác ở đây */}
        </Route>
      </Routes>
    </Router>
  )
}

export default App
