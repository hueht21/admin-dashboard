import React from 'react'
import { Box, Typography } from '@mui/material'

const statusMap = {
  0: { text: 'Ngừng hoạt động', color: 'error.main' },
  1: { text: 'Đang hoạt động', color: 'success.main' },
  2: { text: 'Khoá', color: 'warning.main' },
}

const UserStatusCell = ({ status }) => {
  const statusInfo = statusMap[status] || {
    text: 'Không xác định',
    color: 'text.secondary',
  }

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        padding: 2,
      }}
    >
      <Typography variant="body2" color={statusInfo.color}>
        {statusInfo.text}
      </Typography>
    </Box>
  )
}

export default UserStatusCell
