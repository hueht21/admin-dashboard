import React, { useEffect, useState } from 'react'

import {
  Box,
  Typography,
  Divider,
  Paper,
  CircularProgress,
  Button,
} from '@mui/material'
import { DataGrid } from '@mui/x-data-grid'

import DialogThemMenu from '../page/dialog/DialogThemMenu'
import CustomSnackbar from '../components/CustomSnackbar'
import AppConfig from '../config/AppConfig'

import AxiosInstance from '../config/AxiosInstance'

const MenuPage = () => {
  const [menu, setMenu] = useState([])
  const [loading, setLoading] = useState(true)
  // const navigate = useNavigate()

  const [open, setOpen] = useState(false)

  const handleOpenDialog = () => setOpen(true)
  const handleCloseDialog = () => setOpen(false)

  const [snackbarOpen, setSnackbarOpen] = useState(false)
  const [snackbarMessage, setSnackbarMessage] = useState('')
  const [snackbarSeverity, setSnackbarSeverity] = useState('success')

  const showSnackbar = (message, severity = 'success') => {
    setSnackbarMessage(message)
    setSnackbarSeverity(severity)
    setSnackbarOpen(true)
  }

  const handleAddMenu = async (menu) => {
    setLoading(true)
    try {
      const user = JSON.parse(localStorage.getItem('user_local'))
      const userId = user?.id

      const response = await AxiosInstance.post(
        `${AppConfig.apiUrlBussiness}/api/menus/save-menu`,
        {
          nameMenu: menu.menuName,
          linkUri: menu.menuUrl,
          userCreate: userId,
        }
      )

      if (response.data.status) {
        fetchMenus()
        showSnackbar('Thêm mới menu thành công', 'success')
      } else {
        showSnackbar(response.data.message, 'error')
      }
    } catch (error) {
      console.error('Lỗi khi lấy danh sách menu:', error)
      showSnackbar('Lỗi khi thêm menu', error)
    } finally {
      setLoading(false)
    }

    handleCloseDialog()
  }

  useEffect(() => {
    console.log('call nhieu lan')
    fetchMenus()
  }, [])

  const fetchMenus = async () => {
    try {
      const response = await AxiosInstance.get(
        `${AppConfig.apiUrlBussiness}/api/menus/get-all-menus`
      )
      if (response.data.status) {
        setMenu(response.data.data)
      }
    } catch (error) {
      console.error('Lỗi khi lấy danh sách menu:', error)
      setLoading(false)
    } finally {
      setLoading(false)
    }
  }

  const columns = [
    {
      field: 'idMenu',
      headerName: 'ID',
      width: 100,
    },
    {
      field: 'menuName',
      headerName: 'Mô tả menu',
      width: 250,
    },
    {
      field: 'linkUri',
      headerName: 'url',
      width: 200,
    },
    {
      field: 'userCreate',
      headerName: 'Người tạo',
      width: 200,
    },
    {
      field: 'userUpdate',
      headerName: 'Người cập nhật',
      width: 200,
    },
    // {
    //   field: 'action',
    //   headerName: 'Chức năng',
    //   width: 150,
    //   renderCell: (params) => (
    //     <Box
    //       sx={{
    //         display: 'flex',
    //         justifyContent: 'center',
    //         alignItems: 'center',
    //         gap: 2,
    //         width: '100%',
    //         padding: 1,
    //       }}
    //     >
    //       <EditIcon
    //         sx={{ color: 'primary.main', cursor: 'pointer' }}
    //         // onClick={() =>
    //         //   // navigate(`/dashboard/roles/${params.row.idRole}`, {
    //         //   //   state: { role: params.row },
    //         //   // })
    //         // }
    //       />
    //       <DeleteIcon
    //         sx={{ color: 'error.main', cursor: 'pointer' }}
    //         onClick={() => {}}
    //       />
    //     </Box>
    //   ),
    //   sortable: false,
    //   filterable: false,
    //   // align: 'center',
    //   // headerAlign: 'center',
    // },
  ]

  const rows = menu.map((menu) => ({
    ...menu,
    id: menu.idMenu, // DataGrid requires an `id` field
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
          <Typography variant="h5">Danh sách tất cả Menu</Typography>
          <Button
            variant="contained"
            color="primary"
            onClick={handleOpenDialog}
          >
            Thêm Menu
          </Button>
          <DialogThemMenu
            open={open}
            onClose={handleCloseDialog}
            onSubmit={handleAddMenu}
          />
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
      <CustomSnackbar
        open={snackbarOpen}
        onClose={() => setSnackbarOpen(false)}
        message={snackbarMessage}
        severity={snackbarSeverity}
      />
    </Box>
  )
}

export default MenuPage
