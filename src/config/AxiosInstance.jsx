// axiosInstance.js
import axios from 'axios'
import AppConfig from './AppConfig' // Nhớ điều chỉnh đường dẫn phù hợp

const axiosInstance = axios.create()

// 🛫 Request Interceptor: tự động gắn token
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('access_token')
    if (token) {
      config.headers = config.headers || {}
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => Promise.reject(error)
)

// 🛬 Response Interceptor: xử lý lỗi 401, 403
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error?.response?.status

    if (status === 401) {
      // Xóa token và chuyển hướng đến trang login
      localStorage.removeItem('access_token')
      localStorage.removeItem('userName')

      const redirectUrl = `${AppConfig.urlAuthWeb}/login-auth-web?redirect_uri=${AppConfig.urlWebBusssiness}/dashboard`
      window.location.href = redirectUrl
    } else if (status === 403) {
      window.location.href = `${AppConfig.urlWebBusssiness}/403`
    }

    return Promise.reject(error) // vẫn trả lỗi để xử lý riêng nếu cần
  }
)

export default axiosInstance
