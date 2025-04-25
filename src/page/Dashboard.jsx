import React, { useState } from 'react'
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
  Collapse,
  Divider,
  IconButton,
  CircularProgress,
} from '@mui/material'

import LogoutIcon from '@mui/icons-material/Logout'
import MenuIcon from '@mui/icons-material/Menu'
import ExpandLess from '@mui/icons-material/ExpandLess'
import ExpandMore from '@mui/icons-material/ExpandMore'

import useMediaQuery from '@mui/material/useMediaQuery'
import { useTheme } from '@mui/material/styles'
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings'
import MiscellaneousServicesIcon from '@mui/icons-material/MiscellaneousServices'
import DashboardCustomizeIcon from '@mui/icons-material/DashboardCustomize'

import AppConfig from '../config/AppConfig'

import AxiosInstance from '../config/AxiosInstance'

import { useAuth } from '../context/AuthContext'

const drawerWidth = 240

const DashboardLayout = () => {
  const location = useLocation()
  const navigate = useNavigate()

  console.log('Dashboard render', location.pathname)
  const handleLogout = async () => {
    window.location.href = `${AppConfig.urlAuthWeb}/logout-web?uri=http://localhost:3006/home`
  }

  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('md'))
  const [mobileOpen, setMobileOpen] = useState(false)
  const [openMenus, setOpenMenus] = useState({}) // để mở/tắt menu cha

  const { menus, isMenuLoaded, user } = useAuth()

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen)
  }

  const handleMenuClick = (menuUrl) => {
    navigate(`/dashboard${menuUrl}`)
  }

  const handleToggleGroup = (groupName) => {
    setOpenMenus((prev) => ({ ...prev, [groupName]: !prev[groupName] }))
  }

  const groupMenus = (menus) => {
    const systemUrls = ['/roles', '/menus', '/accounts', '/user-manager']
    const serviceUrls = ['/categories', '/orders', '/customers', '/oder-cus']

    return [
      {
        groupName: 'Quản lý hệ thống',
        icon: <AdminPanelSettingsIcon />,
        children: menus.filter((menu) => systemUrls.includes(menu.menuUrl)),
      },
      {
        groupName: 'Quản lý dịch vụ',
        icon: <MiscellaneousServicesIcon />,
        children: menus.filter((menu) => serviceUrls.includes(menu.menuUrl)),
      },
      {
        groupName: 'Khác',
        icon: <DashboardCustomizeIcon />,
        children: menus.filter(
          (menu) => ![...systemUrls, ...serviceUrls].includes(menu.menuUrl)
        ),
      },
    ]
  }
  const groupedMenu = groupMenus(menus)

  // if (!isMenuLoaded) {
  //   return <div>Đang tải...</div>;
  // }

  if (!isMenuLoaded) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="100vh"
      >
        <CircularProgress />
      </Box>
    )
  } else {
    const drawerContent = (
      <>
        <Toolbar />
        <Divider />
        <List>
          {groupedMenu.map((group, idx) =>
            group.children.length > 0 ? (
              <Box key={idx}>
                <ListItemButton
                  onClick={() => handleToggleGroup(group.groupName)}
                >
                  {group.icon && <Box sx={{ mr: 1 }}>{group.icon}</Box>}
                  <ListItemText
                    primary={group.groupName}
                    sx={{ fontWeight: 'bold' }}
                  />
                  {openMenus[group.groupName] ? <ExpandLess /> : <ExpandMore />}
                </ListItemButton>
                <Collapse
                  in={openMenus[group.groupName]}
                  timeout="auto"
                  unmountOnExit
                >
                  <List component="div" disablePadding>
                    {group.children.map((menu) => (
                      <ListItem key={menu.id} disablePadding sx={{ pl: 4 }}>
                        <ListItemButton
                          onClick={() => handleMenuClick(menu.menuUrl)}
                          selected={location.pathname.startsWith(
                            `/dashboard${menu.menuUrl}`
                          )}
                          sx={{
                            '&.Mui-selected': {
                              backgroundColor: '#1976d2',
                              color: '#fff',
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
                </Collapse>
              </Box>
            ) : null
          )}
        </List>
      </>
    )

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

        <Box component="nav">
          {isMobile ? (
            <Drawer
              variant="temporary"
              open={mobileOpen}
              onClose={handleDrawerToggle}
              ModalProps={{ keepMounted: true }}
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
}

export default DashboardLayout
