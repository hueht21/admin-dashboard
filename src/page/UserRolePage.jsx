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
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import ConfirmDialog from '../components/ConfirmDialog'
import AppConfig from '../config/AppConfig'
import AxiosInstance from '../config/AxiosInstance'

const UserRolePage = () => {
  const location = useLocation()
  const user = location.state?.user
  const { id: userId } = user || {}
  const navigate = useNavigate()

  const [roles, setRoles] = useState([])
  const [checkedRoles, setCheckedRoles] = useState([])
  const [loading, setLoading] = useState(true)

  const [openDialog, setOpenDialog] = useState(false)

  useEffect(() => {
    console.log('userId:', userId)

    const fetchRoles = async () => {
      try {
        const [allRolesRes, userRolesRes] = await Promise.all([
          AxiosInstance.get(`${AppConfig.apiUrlBussiness}/api/roles/get-all`),
          AxiosInstance.get(
            `${AppConfig.apiUrlBussiness}/api/roles/get-role-by-user-id?userId=${userId}`
          ),
        ])
        setRoles(allRolesRes.data.data)
        setCheckedRoles(userRolesRes.data.data.map((role) => role.idRole))
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
      await AxiosInstance.put(
        `${AppConfig.apiUrlBussiness}/api/roles/updateUserRole`,
        {
          userId,
          listRole: checkedRoles,
        }
      )
      alert('Cập nhật quyền người dùng thành công!')
      navigate('/dashboard/user-manager')
    } catch (error) {
      console.error('Lỗi khi lưu quyền:', error)
      // alert('Lỗi khi lưu quyền người dùng!')
      if (
        error.response &&
        (error.response.status === 401 || error.response.status === 403)
      ) {
        navigate('/login')
      }
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
            <b>Tên người dùng :</b> {user.nameUser}
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
                key={role.idRole}
                control={
                  <Checkbox
                    checked={checkedRoles.includes(role.idRole)}
                    onChange={() => handleToggle(role.idRole)}
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
            onClick={() => setOpenDialog(true)}
          >
            Lưu thay đổi
          </Button>
          <ConfirmDialog
            open={openDialog}
            onClose={() => setOpenDialog(false)}
            onConfirm={handleSave}
            title="Xác nhận thay đổi quyền"
            content="Bạn có chắc chắn muốn thay đổi quyền này không?"
          />
        </Paper>
      </Box>
    </>
  )
}

export default UserRolePage
