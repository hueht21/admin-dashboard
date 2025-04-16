import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

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
import LockIcon from '@mui/icons-material/Lock'
import LockOpenIcon from '@mui/icons-material/LockOpen'
import ConfirmDialog from '../components/ConfirmDialog'
import UserStatusCell from '../components/UserStatusCell'
import CustomSnackbar from '../components/CustomSnackbar'

const UserManagerPage = () => {
  const navigate = useNavigate()
  const [user, setUser] = useState([])
  const [loading, setLoading] = useState(true)
  const [openDialog, setOpenDialog] = useState(false)
  const [titleDiaglog, setTitleDialog] = useState('')
  const [contentDiaglog, setContentDialog] = useState('')

  const [snackbarOpen, setSnackbarOpen] = useState(false)
  const [snackbarMessage, setSnackbarMessage] = useState('')
  const [snackbarSeverity, setSnackbarSeverity] = useState('success')

  const [dialogAction, setDialogAction] = useState(() => () => {})

  const showSnackbar = (message, severity = 'success') => {
    setSnackbarMessage(message)
    setSnackbarSeverity(severity)
    setSnackbarOpen(true)
  }

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
      if (
        error.response &&
        (error.response.status === 401 || error.response.status === 403)
      ) {
        navigate('/login')
      }
    } finally {
      setLoading(false)
    }
  }

  const confirmLookAcc = async (idUser, status) => {
    const token = localStorage.getItem('token')
    console.log(token)
    console.log(idUser)
    console.log(
      'Gửi request tới:',
      `http://localhost:8080/api/roles/lock-account`
    )

    try {
      const response = await axios.put(
        `http://localhost:8080/api/roles/lock-account`,
        { userId: idUser, status: status },

        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      console.log(response.data)
      if (response.data?.status) {
        showSnackbar(
          status === 1
            ? 'Mở khoá tài khoản thành công'
            : 'Khóa tài khoản thành công',
          'success'
        )

        await fetchUser()
        setOpenDialog(false)
      } else {
        showSnackbar('Không thể khóa tài khoản', 'error')
      }
    } catch (error) {
      showSnackbar('Đã xảy ra lỗi khi khóa tài khoản', 'error')
      if (
        error.response &&
        (error.response.status === 401 || error.response.status === 403)
      ) {
        navigate('/login')
      }
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
      renderCell: (params) => <UserStatusCell status={params.row.statusUser} />,
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
            onClick={() =>
              navigate(`/dashboard/user-manager/${params.row.id}`, {
                state: { user: params.row },
              })
            }
          />
          <LockIcon
            sx={{ color: '#FF5500', cursor: 'pointer' }}
            onClick={() => {
              setTitleDialog('Xác nhận khoá người dùng')
              setContentDialog('Bạn có chắc chắn muốn khoá người dùng này?')
              setOpenDialog(true)
              // setIdUser(params.row.id)
              setDialogAction(
                () => async () => await confirmLookAcc(params.row.id, 2)
              )
            }}
          />
          <LockOpenIcon
            sx={{ color: '#FF5500', cursor: 'pointer' }}
            onClick={() => {
              setTitleDialog('Xác nhận mở khoá người dùng')
              setContentDialog('Bạn có chắc chắn muốn mở khoá người dùng này?')

              setOpenDialog(true)
              // setIdUser(params.row.id)
              setDialogAction(
                () => async () => await confirmLookAcc(params.row.id, 1)
              )
            }}
          ></LockOpenIcon>
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
      <ConfirmDialog
        open={openDialog}
        onClose={() => setOpenDialog(false)}
        onConfirm={() => {
          dialogAction()
        }}
        title={titleDiaglog}
        content={contentDiaglog}
      />
      <CustomSnackbar
        open={snackbarOpen}
        onClose={() => setSnackbarOpen(false)}
        message={snackbarMessage}
        severity={snackbarSeverity}
      />
    </Box>
  )
}

export default UserManagerPage
