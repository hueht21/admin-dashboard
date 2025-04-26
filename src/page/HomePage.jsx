import React from 'react'
import {
  Button,
  Typography,
  Grid,
  Box,
  Container,
  AppBar,
  Toolbar,
} from '@mui/material'
import { Card, CardContent } from '@mui/material'
// import { motion } from 'framer-motion'
// import { useNavigate } from 'react-router-dom'

import AppConfig from '../config/AppConfig'

const HomePage = () => {
  // const navigate = useNavigate()

  const handleLoginPage = () => {
    // navigate('/login')

    // Redirect về auth
    window.location.href = `${AppConfig.urlAuthWeb}/login-auth-web?redirect_uri=${AppConfig.urlWebBusssiness}/dashboard&pre_action=login`
  }

  const handleStart = () => {
    window.location.href = `${AppConfig.urlAuthWeb}/login-auth-web?redirect_uri=${AppConfig.urlWebBusssiness}/dashboard`
  }

  return (
    <Box sx={{ bgcolor: 'white', color: 'grey.900' }}>
      {/* AppBar */}
      <AppBar
        position="fixed"
        color="#FFFFFF"
        elevation={0}
        sx={{ backdropFilter: 'blur(10px)', bgcolor: '#FFFFFF' }}
      >
        <Toolbar
          sx={{ display: 'flex', justifyContent: 'space-between', py: 2 }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Typography variant="h5" fontWeight="bold" color="primary">
              Cudev
            </Typography>
          </Box>

          {/* Navigation items */}
          <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: 3 }}>
            <Button
              color="#4A5568"
              sx={{
                fontSize: 16,
                font: 'Inter',
                textTransform: 'none',
                color: '#4A5568',
                fontWeight: 500,
              }}
            >
              Về chúng tôi
            </Button>
            <Button
              color="#4A5568"
              sx={{
                fontSize: 16,
                font: 'Inter',
                textTransform: 'none',
                color: '#4A5568',
                fontWeight: 500,
              }}
            >
              Dịch vụ
            </Button>

            <Button
              color="#4A5568"
              sx={{
                fontSize: 16,
                font: 'Inter',
                textTransform: 'none',
                color: '#4A5568',
                fontWeight: 500,
              }}
            >
              Tin tức
            </Button>
            <Button
              color="#4A5568"
              sx={{
                fontSize: 16,
                font: 'Inter',
                textTransform: 'none',
                color: '#4A5568',
                fontWeight: 500,
              }}
            >
              Hỗ trợ
            </Button>
          </Box>

          <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
            <Button
              variant="outlined"
              sx={{
                borderColor: '#4338CA',
                color: '#4338CA',
                borderRadius: 4,
                textTransform: 'none',
                px: 3,
                py: 0.7,
                fontWeight: 'bold',
              }}
              onClick={handleLoginPage}
            >
              Đăng nhập
            </Button>
            <Button
              variant="contained"
              color="primary"
              sx={{
                bgcolor: '#4F46E5',
                color: 'white',
                px: 3,
                py: 0.7,
                borderRadius: 4,
                fontWeight: 'bold',
                textTransform: 'none',
                '&:hover': { bgcolor: '#4338CA' },
              }}
            >
              Đăng ký
            </Button>
          </Box>
        </Toolbar>
      </AppBar>
      {/* Hero section */}
      {/* <Box
        sx={{
          bgcolor: '#1e40af',
          color: 'white',
          py: 10,
          px: { xs: 2, md: 8, mt: 8 },
          textAlign: 'center',
          mt: 16,
        }}
      >
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <Typography variant="h3" fontWeight="bold" gutterBottom>
            Phần mềm quản lý bán hàng
          </Typography>
        </motion.div>
        <Typography variant="h6" gutterBottom>
          Giải pháp tối ưu cho cửa hàng, chuỗi cửa hàng và doanh nghiệp vừa &
          nhỏ
        </Typography>
        <Button
          variant="contained"
          sx={{
            mt: 3,
            bgcolor: 'yellow.400',
            color: 'black',
            fontWeight: 'bold',
            '&:hover': { bgcolor: 'yellow.500' },
          }}
        >
          Dùng thử miễn phí
        </Button>
      </Box> */}

      <Box
        sx={{
          bgcolor: '#fefefe',
          color: '#111',
          //   pt: { xs: 10, md: 1 },
          pb: 15,
          px: { xs: 2, md: 8 },
        }}
      >
        <Box
          sx={{
            bgcolor: '#fefefe',
            color: '#111',
            pt: { xs: 20, md: 15 },
            pb: 15,
            px: { xs: 2, md: 8 },
          }}
        >
          <Container maxWidth="lg">
            <Grid container spacing={4} alignItems="center">
              {/* Bên trái: Text */}
              <Grid item xs={12} md={6}>
                <Box sx={{ maxWidth: 500 }}>
                  <Typography
                    variant="h3"
                    sx={{ fontWeight: 400 }}
                    gutterBottom
                  >
                    Tạo{' '}
                    <Box
                      component="span"
                      sx={{ color: '#A855F7', fontWeight: 'bold' }}
                    >
                      sản phẩm
                    </Box>{' '}
                    này
                  </Typography>
                  <Typography
                    variant="h3"
                    sx={{ fontWeight: 700 }}
                    gutterBottom
                  >
                    phát triển bởi{' '}
                    <Box component="span" sx={{ color: '#A855F7' }}>
                      teams
                    </Box>
                  </Typography>
                  <Typography
                    variant="body1"
                    sx={{ color: 'text.secondary', mt: 2, mb: 4 }}
                  >
                    Chúng tôi giúp xây dựng và quản lý một nhóm các nhà phát
                    triển đẳng cấp thế giới để biến tầm nhìn của bạn thành hiện
                    thực
                  </Typography>
                  <Button
                    variant="contained"
                    sx={{
                      bgcolor: '#4F46E5',
                      color: 'white',
                      px: 3,
                      py: 1.5,
                      borderRadius: 2,
                      fontWeight: 'bold',
                      textTransform: 'none',
                      '&:hover': { bgcolor: '#4338CA' },
                    }}
                    onClick={handleStart}
                  >
                    Bắt đầu!
                  </Button>
                </Box>
              </Grid>

              {/* Bên phải: Hình ảnh */}
              <Grid item xs={12} md={6}>
                <Box
                  sx={{
                    width: '100%',
                    display: 'flex',
                    justifyContent: 'center',
                  }}
                >
                  <Box
                    component="img"
                    src="/img/img_hero.png"
                    alt="Hero Illustration"
                    sx={{
                      width: '100%',
                      maxWidth: 500,
                      height: 'auto',
                      objectFit: 'contain',
                    }}
                  />
                </Box>
              </Grid>
            </Grid>
          </Container>
        </Box>
      </Box>

      {/* Features section */}
      <Box sx={{ py: 10, px: { xs: 2, md: 8 }, bgcolor: 'grey.100' }}>
        <Container maxWidth="lg">
          <Typography
            variant="h4"
            fontWeight="bold"
            align="center"
            gutterBottom
          >
            Tại sao chọn chúng tôi?
          </Typography>
          <Grid container spacing={4} mt={4}>
            <Grid item xs={12} md={4}>
              <Card elevation={4}>
                <CardContent>
                  <Typography variant="h6" fontWeight="bold" gutterBottom>
                    Dễ dàng sử dụng
                  </Typography>
                  <Typography>
                    Giao diện thân thiện, dễ làm quen kể cả với người không rành
                    công nghệ.
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} md={4}>
              <Card elevation={4}>
                <CardContent>
                  <Typography variant="h6" fontWeight="bold" gutterBottom>
                    Báo cáo chi tiết
                  </Typography>
                  <Typography>
                    Hệ thống báo cáo đa dạng, hỗ trợ ra quyết định nhanh chóng.
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Container>
      </Box>
      {/* Call to action */}
      <Box
        sx={{
          py: 10,
          px: { xs: 2, md: 8 },
          bgcolor: 'white',
          textAlign: 'center',
        }}
      >
        <Container maxWidth="md">
          <Typography variant="h4" fontWeight="bold" gutterBottom>
            Trải nghiệm miễn phí ngay hôm nay!
          </Typography>
          <Typography variant="h6" mb={4}>
            Đăng ký dùng thử để cảm nhận sự khác biệt trong cách bạn quản lý và
            vận hành cửa hàng.
          </Typography>
          <Button
            variant="contained"
            sx={{
              bgcolor: 'primary.main',
              px: 4,
              py: 1.5,
              fontSize: '1rem',
              borderRadius: 999,
              '&:hover': { bgcolor: 'primary.dark' },
            }}
          >
            Dùng thử miễn phí
          </Button>
        </Container>
      </Box>
    </Box>
  )
}

export default HomePage
