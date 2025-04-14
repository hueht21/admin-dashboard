import React from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import ForbiddenPage from '../page/ForbiddenPage'

const ProtectedRoute = ({ allowedPaths }) => {
  const location = useLocation()
  const path = location.pathname.replace('/dashboard', '')

  console.log('✅ current path:', path)
  console.log('✅ allowedPaths:', allowedPaths)

  const isAllowed = allowedPaths.some((allowedPath) =>
    path.startsWith(allowedPath)
  )

  if (isAllowed) {
    return <Outlet />
  }

  return <ForbiddenPage />
}

export default ProtectedRoute
