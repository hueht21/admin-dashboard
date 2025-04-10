import React from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import ForbiddenPage from '../page/ForbiddenPage'

const ProtectedRoute = ({ allowedPaths }) => {
  const location = useLocation()
  const path = location.pathname.replace('/dashboard', '')

  console.log('✅ allowedPaths:', allowedPaths)

  if (allowedPaths.includes(path)) {
    return <Outlet />
  }

  return <ForbiddenPage />
}

export default ProtectedRoute
