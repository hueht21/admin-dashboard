import { useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

export default function LoginSuccess() {
  const location = useLocation()
  const navigate = useNavigate()

  useEffect(() => {
    const params = new URLSearchParams(location.search)
    const token = params.get('token')

    if (token) {
      localStorage.setItem('access_token', token)
      //   navigate('/thanh-cong') // Đẩy sang trang chính
    } else {
      alert('Đăng nhập thất bại hoặc thiếu token!')
      navigate('/login')
    }
  }, [location, navigate])

  return <div>Đang xử lý đăng nhập...</div>
}
