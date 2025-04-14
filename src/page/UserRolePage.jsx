import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import {
  Box,
  Paper,
  Typography,
  Divider,
  FormGroup,
  FormControlLabel,
  Checkbox,
  Button,
  CircularProgress,
  IconButton,
} from '@mui/material'
import axios from 'axios'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'

const UserRolePage = () => {
  const location = useLocation()
  const user = location.state?.user
  const { id: userId } = user || {}
  const navigate = useNavigate()

  const [roles, setRoles] = useState([])
  const [checkedRoles, setCheckedRoles] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchRoles = async () => {
      try {
        const [allRolesRes, userRolesRes] = await Promise.all([
          axios.get('http://localhost:8080/api/roles/all', {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
          }),
          axios.get(`http://localhost:8080/api/users/roles?userId=${userId}`, {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
          }),
        ])
        setRoles(allRolesRes.data.data)
        setCheckedRoles(userRolesRes.data.data.map((role) => role.id))
      } catch (error) {
        console.error('Lỗi khi tải role:', error)
      } finally {
        setLoading(false)
      }
    }

    if (userId) {
      fetchRoles()
    }
  }, [userId])

  const handleToggle = (roleId) => {
    setCheckedRoles((prev) =>
      prev.includes(roleId)
        ? prev.filter((id) => id !== roleId)
        : [...prev, roleId]
    )
  }

  const handleSave = async () => {
    try {
      await axios.put(
        'http://localhost:8080/api/users/update-user-roles',
        {
          userId,
          roleIds: checkedRoles,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      )
      alert('Cập nhật quyền người dùng thành công!')
      navigate('/dashboard/accounts')
    } catch (error) {
      console.error('Lỗi khi lưu quyền:', error)
      alert('Lỗi khi lưu quyền người dùng!')
    }
  }

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
        <CircularProgress />
      </Box>
    )
  }

  return (
    <>
      <IconButton onClick={() => navigate(-1)} sx={{ mb: 2 }}>
        <ArrowBackIcon />
      </IconButton>
      <Box sx={{ p: 1, display: 'flex', gap: 2 }}>
        {/* Thông tin người dùng */}
        <Paper sx={{ flex: 1, p: 3, borderRadius: 3, boxShadow: 2 }}>
          <Typography variant="h6" gutterBottom>
            Thông tin tài khoản
          </Typography>
          <Divider sx={{ mb: 2 }} />
          <Typography variant="subtitle1">
            <b>Tên đăng nhập:</b> {user.userName}
          </Typography>
          <Typography variant="subtitle2" sx={{ mt: 1 }}>
            <b>ID:</b> {user.id}
          </Typography>
        </Paper>

        {/* Danh sách quyền */}
        <Paper sx={{ flex: 2, p: 3, borderRadius: 3, boxShadow: 2 }}>
          <Typography variant="h6" gutterBottom>
            Danh sách quyền
          </Typography>
          <Divider sx={{ mb: 2 }} />
          <FormGroup>
            {roles.map((role) => (
              <FormControlLabel
                key={role.id}
                control={
                  <Checkbox
                    checked={checkedRoles.includes(role.id)}
                    onChange={() => handleToggle(role.id)}
                  />
                }
                label={role.nameRole}
              />
            ))}
          </FormGroup>
          <Button
            variant="contained"
            color="primary"
            sx={{ mt: 2 }}
            onClick={handleSave}
          >
            Lưu thay đổi
          </Button>
        </Paper>
      </Box>
    </>
  )
}

export default UserRolePage
