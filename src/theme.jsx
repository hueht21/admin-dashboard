// src/theme.js
import { createTheme } from '@mui/material/styles'

const theme = createTheme({
  palette: {
    primary: {
      main: '#FF5500', // màu cam chủ đạo
      contrastText: '#fff',
    },
    secondary: {
      main: '#ff5722', // màu cam đậm phụ
    },
  },
})

export default theme
