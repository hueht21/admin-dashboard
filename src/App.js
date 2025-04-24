import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom'

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
  ForbiddenPage,
} from './page'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/home" />} />

        <Route path="/home" element={<HomePage />} />
        <Route path="/403" element={<ForbiddenPage />} />
        <Route path="/dashboard" element={<DashboardLayout />}>
          <Route>
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
