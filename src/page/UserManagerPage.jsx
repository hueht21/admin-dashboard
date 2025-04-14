import React, { useEffect, useState } from 'react'
import axios from 'axios'
// import { useNavigate } from 'react-router-dom'
import {
  Box,
  Typography,
  Divider,
  Paper,
  CircularProgress,
} from '@mui/material'
import { DataGrid } from '@mui/x-data-grid'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'

const UserManagerPage = () => {
  const [user, setUser] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchUser()
  }, [])

  const fetchUser = async () => {
    const token = localStorage.getItem('token')
    try {
      const response = await axios.get(
        'http://localhost:8080/api/v1/user/getAllUser',
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      if (response.data.status) {
        setUser(response.data.data)
      }
    } catch (error) {
      console.error('Lỗi khi lấy danh sách menu:', error)
    } finally {
      setLoading(false)
    }
  }

  const columns = [
    {
      field: 'id',
      headerName: 'ID',
      width: 100,
      align: 'center',
      headerAlign: 'center',
    },
    {
      field: 'userName',
      headerName: 'Tên đăng nhập',
      width: 250,
      align: 'center',
      headerAlign: 'center',
    },
    {
      field: 'nameUser',
      headerName: 'Tên người dùng',
      width: 200,
      align: 'center',
      headerAlign: 'center',
    },
    {
      field: 'statusUser',
      headerName: 'Trạng thái',
      width: 200,
      align: 'center',
      headerAlign: 'center',
      renderCell: (params) => {
        if (params.row.statusUser === 1) {
          return (
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                // gap: 3,
                width: '100%',
                padding: 2,
              }}
            >
              <Typography variant="body2" color="success.main">
                Đang hoạt động
              </Typography>
            </Box>
          )
        } else if (params.row.statusUser === 0) {
          return (
            <Typography variant="body2" color="error.main">
              Ngừng hoạt động
            </Typography>
          )
        } else if (params.row.statusUser === 2) {
          return (
            <Typography variant="body2" color="warning.main">
              Khoá
            </Typography>
          )
        }
      },
    },
    {
      field: 'action',
      headerName: 'Chức năng',
      width: 150,
      align: 'center',
      headerAlign: 'center',
      renderCell: (params) => (
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            gap: 2,
            width: '100%',
            padding: 1,
          }}
        >
          <EditIcon
            sx={{ color: 'primary.main', cursor: 'pointer' }}
            // onClick={() =>
            //   // navigate(`/dashboard/roles/${params.row.idRole}`, {
            //   //   state: { role: params.row },
            //   // })
            // }
          />
        </Box>
      ),
      sortable: false,
      filterable: false,
    },
  ]

  const rows = user.map((user) => ({
    ...user,
    id: user.id, // DataGrid requires an `id` field
  }))

  return (
    <Box sx={{ p: 1 }}>
      <Paper
        sx={{
          p: 3,
          borderRadius: 3,
          boxShadow: 3,
          // width: 'fit-content',
          width: '100%',
          maxWidth: 1100, // hoặc tuỳ ý 1000-1200
        }}
      >
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            mb: 2,
          }}
        >
          <Typography variant="h5">Danh sách tất cả tài khoản</Typography>
        </Box>
        <Divider sx={{ mb: 2 }} />

        {loading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
            <CircularProgress />
          </Box>
        ) : (
          <Box sx={{ height: 500, width: '100%' }}>
            <DataGrid
              rows={rows}
              columns={columns}
              pageSize={8}
              rowsPerPageOptions={[8, 16]}
              disableSelectionOnClick
            />
          </Box>
        )}
      </Paper>
    </Box>
  )
}

export default UserManagerPage
