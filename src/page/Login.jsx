import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

import {
  Box,
  Button,
  TextField,
  Typography,
  Paper,
  Stack,
  CircularProgress,
} from '@mui/material'

const Login = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [validationErrors, setValidationErrors] = useState({
    username: '',
    password: '',
  })

  const navigate = useNavigate()

  // Hàm validate các trường nhập
  const validate = () => {
    let valid = true
    const errors = { username: '', password: '' }

    if (!username.trim()) {
      errors.username = 'Vui lòng nhập tên đăng nhập'
      valid = false
    }
    if (!password.trim()) {
      errors.password = 'Vui lòng nhập mật khẩu'
      valid = false
    }
    setValidationErrors(errors)
    return valid
  }

  const handleSubmit = async (e) => {
    // Reset error trước mỗi lần submit
    setError('')

    // Validate input, nếu không hợp lệ thì không gọi API
    if (!validate()) return
    setLoading(true) // Bật loading trước khi gọi API
    try {
      const response = await axios.post('http://localhost:8080/api/login', {
        username,
        password,
      })

      // Giả sử API trả về token trong response.data.token
      const { token } = response.data
      // Lưu token vào localStorage hoặc state quản lý auth của bạn
      localStorage.setItem('token', token)
      localStorage.setItem('user', JSON.stringify(response.data.data.user))

      // Chuyển hướng tới dashboard hoặc trang chính của ứng dụng
      console.log('ddanwg nhap thanh cong')
      navigate('/dashboard')
    } catch (err) {
      console.error('Login error:', err)
      // Nếu có lỗi, hiển thị thông báo lỗi
      // setError('Sai tài khoản hoặc mật khẩu!');
    } finally {
      setLoading(false) // Tắt loading sau khi API gọi xong
    }
  }

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      minHeight="100vh"
      bgcolor="#f5f5f5"
    >
      <Paper elevation={3} sx={{ p: 4, width: 350 }}>
        <Typography variant="h5" textAlign="center" mb={3}>
          Đăng nhập hệ thống
        </Typography>

        <Stack spacing={2}>
          <TextField
            label="Tên đăng nhập"
            variant="outlined"
            fullWidth
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            error={!username.trim()}
            helperText={!username.trim() ? 'Vui lòng nhập tên đăng nhập' : ''}
          />
          <TextField
            label="Mật khẩu"
            variant="outlined"
            type="password"
            fullWidth
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            error={!password.trim()}
            helperText={!password.trim() ? 'Vui lòng nhập mật khẩu' : ''}
          />
          <Button
            variant="contained"
            disabled={loading} // Vô hiệu hóa button khi đang loading
            color="primary"
            onClick={handleSubmit}
          >
            {loading ? (
              <CircularProgress size={24} color="inherit" />
            ) : (
              'Đăng nhập'
            )}
          </Button>
        </Stack>
      </Paper>
    </Box>
  )
}

export default Login
