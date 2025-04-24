import React, { useEffect, useState } from 'react'
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

const drawerWidth = 240

const DashboardLayout = () => {
  const [user, setUser] = useState({
    id: 0,
    userName: '',
    nameUser: '',
  })
  const location = useLocation()
  const navigate = useNavigate()
  const [listMenu, setListMenu] = useState([])

  const [isLoading, setIsLoading] = useState(false)

  console.log('Dashboard render', location.pathname)
  const handleLogout = () => {
    AxiosInstance.post(`${AppConfig.urlAuthWeb}/api/logout`).then((res) => {
      if (res.data.status) {
        window.location.href = `${AppConfig.urlWebBusssiness}/home`
      }
    })
  }

  useEffect(() => {
    fetchMenus()
  }, [])

  const fetchMenus = async () => {
    const queryParams = new URLSearchParams(window.location.search)
    const tokenFromUrl = queryParams.get('access_token')
    var userName = queryParams.get('userName')

    setIsLoading(true)
    if (tokenFromUrl) {
      // B2: Lưu token vào localStorage
      console.log('B2: Lưu token vào localStorage')
      localStorage.setItem('access_token', tokenFromUrl)
    }

    if (userName) {
      localStorage.setItem('userName', userName)
      // window.history.replaceState(null, '', '/dashboard')
    } else {
      userName = localStorage.getItem('userName')
    }

    // B4: Lấy token đã lưu
    const savedToken = localStorage.getItem('access_token')

    if (!savedToken || !userName) {
      console.log('Không có token trong localStorage')
      // Nếu vẫn không có token, redirect sang Auth Server login
      const redirectUri = encodeURIComponent(window.location.href)
      window.location.href = `${AppConfig.urlAuthWeb}/login-auth-web?redirect_uri=${redirectUri}`
    } else {
      // B5: Gọi API backend domain1.com để lấy dữ liệu
      console.log('B5: Gọi API backend domain1.com để lấy dữ liệu')
      console.log('userName:', userName)
      AxiosInstance.get(
        `${AppConfig.apiUrlBussiness}/api/home-page/dashboard?userName=${userName}`
      )
        .then((res) => {
          // setUserData(res.data)
          console.log('dữ liệu từ API:', res.data.data)
          setListMenu(res.data.data.listMenu)
          setUser({
            id: res.data.data.id,
            userName: res.data.data.userName,
            nameUser: res.data.data.nameUser,
          })
          localStorage.setItem(
            'user_local',
            JSON.stringify({
              id: res.data.data.id,
              userName: res.data.data.userName,
              nameUser: res.data.data.nameUser,
            })
          )
        })
        .catch((err) => {
          console.error('Lỗi xác thực:', err)
        })
        .finally(() => {
          console.log('Đã gọi API xong')
          setIsLoading(false)
          window.history.replaceState(null, '', '/dashboard')
        })
    }
  }

  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('md'))
  const [mobileOpen, setMobileOpen] = useState(false)
  const [openMenus, setOpenMenus] = useState({}) // để mở/tắt menu cha

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
    return [
      {
        groupName: 'Quản lý hệ thống',
        icon: <AdminPanelSettingsIcon />,
        children: menus.filter((menu) =>
          ['/roles', '/menus', '/accounts', '/user-manager'].includes(
            menu.menuUrl
          )
        ),
      },
      {
        groupName: 'Quản lý dịch vụ',
        icon: <MiscellaneousServicesIcon />,
        children: menus.filter((menu) =>
          ['/categories', '/orders', '/customers', '/oder-cus'].includes(
            menu.menuUrl
          )
        ),
      },
      {
        groupName: 'Khác',
        icon: <DashboardCustomizeIcon />,
        children: menus.filter(
          (menu) =>
            ![
              '/roles',
              '/menus',
              '/accounts',
              '/user-manager',
              '/categories',
              '/orders',
              '/customers',
              '/oder-cus',
            ].includes(menu.menuUrl)
        ),
      },
    ]
  }

  const groupedMenu = groupMenus(listMenu)

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

  if (isLoading) {
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
