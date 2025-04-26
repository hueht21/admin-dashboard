import React from 'react'
import { Typography, Button, Container, Grid } from '@mui/material'
import AppConfig from '../config/AppConfig'

const ForbiddenPage = () => {
  const handleGoHome = () => {
    window.location.href = `${AppConfig.urlWebBusssiness}/home`
  }

  return (
    <Container
      maxWidth="xs"
      sx={{
        backgroundColor: '#ffffff',
        borderRadius: 2,
        boxShadow: '0 6px 30px rgba(0, 0, 0, 0.12)',
        padding: 4,
        textAlign: 'center',
        marginTop: 10,
      }}
    >
      <Grid
        container
        justifyContent="center"
        alignItems="center"
        direction="column"
      >
        <Typography variant="h4" color="textPrimary" fontWeight={600}>
          403 - Forbidden
        </Typography>
        <Typography variant="body1" color="textSecondary" marginY={2}>
          Bạn không có quyền truy cập vào trang này. Vui lòng quay lại trang
          đăng nhập hoặc liên hệ hỗ trợ.
        </Typography>
        <Button
          variant="contained"
          color="primary"
          size="large"
          onClick={handleGoHome}
          sx={{
            paddingX: 6,
            paddingY: 1.5,
            textTransform: 'none',
            borderRadius: 20,
            boxShadow: '0 4px 15px rgba(25, 118, 210, 0.2)',
            '&:hover': {
              boxShadow: '0 6px 20px rgba(35, 35, 36, 0.3)',
            },
          }}
        >
          Quay về trang chủ
        </Button>
      </Grid>
    </Container>
  )
}

export default ForbiddenPage
