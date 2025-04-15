import React, { createContext, useContext, useState } from 'react'

const AuthContext = createContext(null)

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    try {
      const storedUser = localStorage.getItem('user')
      if (!storedUser || storedUser === 'undefined') return null
      return JSON.parse(storedUser)
    } catch (error) {
      console.error('Lỗi parse user từ localStorage:', error)
      return null
    }
  })

  const login = (userData, token) => {
    localStorage.setItem('user', JSON.stringify(userData))
    localStorage.setItem('token', token) // Assuming userData contains a token
    setUser(userData)
  }

  const logout = () => {
    localStorage.removeItem('user')
    localStorage.removeItem('token')
    setUser(null)
  }

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

// Custom hook
export const useAuth = () => useContext(AuthContext)
