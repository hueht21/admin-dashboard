import React, { useEffect } from 'react'
import { Outlet, useNavigate, useLocation } from 'react-router-dom'
import {
  Box,
  Drawer,
  AppBar,
  Toolbar,
  Typography,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
} from '@mui/material'

import LogoutIcon from '@mui/icons-material/Logout'
import IconButton from '@mui/material/IconButton'

import MenuIcon from '@mui/icons-material/Menu'
import useMediaQuery from '@mui/material/useMediaQuery'
import { useTheme } from '@mui/material/styles'
import Divider from '@mui/material/Divider'

import { useAuth } from '../context/AuthContext'

const drawerWidth = 240

const DashboardLayout = () => {
  const storedUser = localStorage.getItem('user')
  const user = storedUser ? JSON.parse(storedUser) : null
  const location = useLocation()
  const listMenu = user?.listMenu ?? []
  const navigate = useNavigate()

  const handleMenuClick = (menuUrl) => {
    console.log(`/dashboard${menuUrl}`)
    navigate(`/dashboard${menuUrl}`)
  }

  // Redirect về login nếu chưa login
  useEffect(() => {
    if (!user) {
      navigate('/login')
    }
  }, [user, navigate])

  const { logout } = useAuth()
  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen)
  }

  const drawerContent = (
    <>
      <Toolbar />
      <Divider />
      <List>
        {listMenu?.map((menu, index) => (
          <ListItem key={index} disablePadding>
            <ListItemButton
              onClick={() => handleMenuClick(menu.menuUrl)}
              selected={location.pathname.startsWith(
                `/dashboard${menu.menuUrl}`
              )}
              sx={{
                '&.Mui-selected': {
                  backgroundColor: '#1976d2',
                  color: '#fff',
                  '& .MuiListItemText-root': {
                    color: '#fff',
                  },
                },
                '&.Mui-selected:hover': {
                  backgroundColor: '#1976d2',
                },
                '&:hover': {
                  backgroundColor: '#e3f2fd',
                },
              }}
            >
              <ListItemText primary={menu.menuName} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </>
  )

  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('md'))
  const [mobileOpen, setMobileOpen] = React.useState(false)

  return (
    <Box sx={{ display: 'flex' }}>
      <AppBar position="fixed" sx={{ zIndex: 1201 }}>
        <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
          {isMobile && (
            <IconButton
              color="inherit"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ mr: 2 }}
            >
              <MenuIcon />
            </IconButton>
          )}
          <Typography variant="h6" noWrap>
            Xin chào, {user?.nameUser}
          </Typography>
          <IconButton color="inherit" onClick={handleLogout}>
            <LogoutIcon />
          </IconButton>
        </Toolbar>
      </AppBar>

      {/* Drawer */}
      <Box component="nav">
        {isMobile ? (
          <Drawer
            variant="temporary"
            open={mobileOpen}
            onClose={handleDrawerToggle}
            ModalProps={{
              keepMounted: true,
            }}
            sx={{
              '& .MuiDrawer-paper': { width: drawerWidth },
            }}
          >
            {drawerContent}
          </Drawer>
        ) : (
          <Drawer
            variant="permanent"
            sx={{
              '& .MuiDrawer-paper': {
                width: drawerWidth,
                boxSizing: 'border-box',
              },
            }}
          >
            {drawerContent}
          </Drawer>
        )}
      </Box>

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          bgcolor: '#f5f5f5',
          minHeight: '100vh',
          ml: isMobile ? 0 : `${drawerWidth}px`,
        }}
      >
        <Toolbar />
        <Outlet />
      </Box>
    </Box>
  )
}

export default DashboardLayout
