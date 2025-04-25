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

import ArrowBackIcon from '@mui/icons-material/ArrowBack' // Import mũi tên

import AppConfig from '../config/AppConfig'
import AxiosInstance from '../config/AxiosInstance'

const RoleDetail = () => {
  const location = useLocation()
  const role = location.state?.role
  const { idRole } = role || {}
  const navigate = useNavigate()

  const [menus, setMenus] = useState([])
  const [checkedMenus, setCheckedMenus] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchMenus = async () => {
      try {
        const [allMenusRes, roleMenusRes] = await Promise.all([
          AxiosInstance.get(`${AppConfig.apiUrlBussiness}/api/roles/all-menus`),
          AxiosInstance.get(
            `${AppConfig.apiUrlBussiness}/api/roles/menus?roleId=${idRole}`
          ),
        ])

        setMenus(allMenusRes.data.data)
        setCheckedMenus(roleMenusRes.data.data.map((menu) => menu.id))
      } catch (error) {
        console.error('Lỗi khi tải menu:', error)
      } finally {
        setLoading(false)
      }
    }

    if (idRole) {
      fetchMenus()
    }
  }, [idRole])

  const handleToggle = (menuId) => {
    setCheckedMenus((prev) =>
      prev.includes(menuId)
        ? prev.filter((id) => id !== menuId)
        : [...prev, menuId]
    )
  }

  const handleSave = async () => {
    try {
      await AxiosInstance.put(
        `${AppConfig.apiUrlBussiness}/api/roles/update-role-menus`, // URL
        {
          roleId: idRole,
          menuIds: checkedMenus,
        }
      )

      alert('Cập nhật quyền thành công!')
      // navigate('/dashboard/roles') // Điều hướng lại về trang danh sách role
      // handleLogout()
    } catch (error) {
      console.error('Lỗi khi lưu quyền:', error)
      // alert('Lỗi khi lưu quyền!')

      if (
        error.response &&
        (error.response.status === 401 || error.response.status === 403)
      ) {
        navigate('/login')
      } else {
        alert('Lỗi khi lưu quyền!')
      }
    }
    checkedMenus.forEach((menuId) => {
      console.log(`Menu ID: ${menuId}`)
    })
    console.log(`Role ID: ${idRole}`)
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
      <IconButton
        onClick={() => navigate(-1)} // Quay lại trang trước đó
        sx={{ mb: 2 }}
      >
        <ArrowBackIcon /> {/* Mũi tên quay lại */}
      </IconButton>
      <Box sx={{ p: 1, display: 'flex', gap: 2 }}>
        {/* Box role info */}
        <Paper sx={{ flex: 1, p: 3, borderRadius: 3, boxShadow: 2 }}>
          <Typography variant="h6" gutterBottom>
            Thông tin quyền
          </Typography>
          <Divider sx={{ mb: 2 }} />
          <Typography variant="subtitle1">
            <b>Tên quyền:</b> {role.nameRole}
          </Typography>
          <Typography variant="subtitle2" sx={{ mt: 1 }}>
            <b>Mô tả:</b> {role.describe}
          </Typography>
        </Paper>

        {/* Box menu list */}
        <Paper sx={{ flex: 2, p: 3, borderRadius: 3, boxShadow: 2 }}>
          <Typography variant="h6" gutterBottom>
            Danh sách menu
          </Typography>
          <Divider sx={{ mb: 2 }} />
          <FormGroup>
            {menus.map((menu) => (
              <FormControlLabel
                key={menu.id}
                control={
                  <Checkbox
                    checked={checkedMenus.includes(menu.id)}
                    onChange={() => handleToggle(menu.id)}
                  />
                }
                label={menu.menuName}
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

export default RoleDetail
