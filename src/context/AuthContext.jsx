// src/context/AuthContext.js
import React, { createContext, useContext, useState, useEffect } from 'react'
import AxiosInstance from '../config/AxiosInstance'
import AppConfig from '../config/AppConfig'

const AuthContext = createContext()
export const useAuth = () => useContext(AuthContext)

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [menus, setMenus] = useState([])
  const [isMenuLoaded, setIsMenuLoaded] = useState(false)

  useEffect(() => {
    // 1. Lấy token từ URL (nếu có)
    const params = new URLSearchParams(window.location.search)
    const tokenFromUrl = params.get('access_token')
    const userName = params.get('userName')

    if (tokenFromUrl) {
      // 2. Lưu vào localStorage
      localStorage.setItem('access_token', tokenFromUrl)

      // 3. Xóa token khỏi URL cho đẹp
      const cleanUrl = window.location.origin + window.location.pathname
      window.history.replaceState({}, document.title, cleanUrl)
    }

    if (userName) {
      localStorage.setItem('userName', userName)
    }

    // 4. Gọi lấy menu với token đã lưu
    const token = tokenFromUrl || localStorage.getItem('access_token')
    const userNameLocal = userName || localStorage.getItem('userName')
    if (token) {
      getMenu(token, userNameLocal)
    }
  }, [])

  const getMenu = async (token, userName) => {
    try {
      const res = await AxiosInstance.get(
        `${AppConfig.apiUrlBussiness}/api/home-page/dashboard?userName=${userName}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      const data = res.data.data

      console.log('Dữ liệu từ API:', data)

      setMenus(data.listMenu || [])
      setUser({
        id: data.id,
        userName: data.userName,
        nameUser: data.nameUser,
      })
    } catch (err) {
      console.error('Lỗi xác thực:', err)
      setMenus([]) // clear menu nếu lỗi
    } finally {
      console.log('Đánh dấu đã load menu xong')
      setIsMenuLoaded(true) // ✅ đã load xong dù có thành công hay không
    }
  }

  return (
    <AuthContext.Provider value={{ user, menus, isMenuLoaded, getMenu }}>
      {children}
    </AuthContext.Provider>
  )
}
