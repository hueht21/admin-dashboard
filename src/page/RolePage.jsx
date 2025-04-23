import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import {
  Box,
  Typography,
  Divider,
  Paper,
  CircularProgress,
} from '@mui/material'
import { DataGrid } from '@mui/x-data-grid'
import EditIcon from '@mui/icons-material/Edit'
import AppConfig from '../config/AppConfig'

const RoleList = () => {
  const [roles, setRoles] = useState([])
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()

  useEffect(() => {
    const fetchRoles = async () => {
      const token = localStorage.getItem('access_token')
      try {
        const response = await axios.get(
          `${AppConfig.apiUrlBussiness}/api/roles/get-all`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
        if (response.data.status) {
          setRoles(response.data.data)
        }
      } catch (error) {
        console.error('Lỗi khi lấy danh sách role:', error)
        // if (
        //   error.response &&
        //   (error.response.status === 401 || error.response.status === 403)
        // ) {
        //   navigate('/login')
        // }
      } finally {
        setLoading(false)
      }
    }

    fetchRoles()
  }, [])

  const columns = [
    {
      field: 'idRole',
      headerName: 'ID',
      width: 100,
    },
    {
      field: 'describe',
      headerName: 'Mô tả quyền',
      width: 250,
    },
    {
      field: 'nameRole',
      headerName: 'Tên quyền',
      width: 200,
    },
    {
      field: 'action',
      headerName: 'Chức năng',
      width: 150,
      renderCell: (params) => (
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            width: '100%',
            padding: 1,
          }}
        >
          <EditIcon
            sx={{ color: 'primary.main', cursor: 'pointer' }}
            onClick={() =>
              navigate(`/dashboard/roles/${params.row.idRole}`, {
                state: { role: params.row },
              })
            }
          />
        </Box>
      ),
      sortable: false,
      filterable: false,
      // align: 'center',
      // headerAlign: 'center',
    },
  ]

  const rows = roles.map((role) => ({
    ...role,
    id: role.idRole, // DataGrid requires an `id` field
  }))

  return (
    <Box sx={{ p: 1 }}>
      <Paper
        sx={{
          p: 3,
          borderRadius: 3,
          boxShadow: 3,
          width: '100%',
          maxWidth: 800,
        }}
      >
        <Typography variant="h5" gutterBottom>
          Danh sách tất cả Role
        </Typography>
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

export default RoleList
