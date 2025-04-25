// src/routes/ProtectedRoute.js
import { Navigate, Outlet, useLocation } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

const ProtectedRoute = () => {
  const location = useLocation()
  const { menus, isMenuLoaded } = useAuth()

  console.log('⏳ isMenuLoaded:', isMenuLoaded)
  console.log('🔒 menus:', menus)

  if (!isMenuLoaded) {
    return <div>Loading...</div>
  }

  const userHasAccess = menus.some((menu) => menu.menuUrl === location.pathname)

  console.log(' sdfjasdfjkakj' + userHasAccess + location.pathname)

  return userHasAccess ? <Outlet /> : <Navigate to="/403" />
}

export default ProtectedRoute
