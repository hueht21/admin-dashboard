import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Login from './page/Login'

import { Accounts, Customers, DashboardLayout, OrdersPage } from './page'

import ProtectedRoute from './components/ProtectedRoute' // tùy nơi bạn lưu

function App() {
  const storedUser = localStorage.getItem('user')
  const user = storedUser ? JSON.parse(storedUser) : null
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
          </Route>

          {/* Thêm route menu khác ở đây */}
        </Route>
      </Routes>
    </Router>
  )
}

export default App
