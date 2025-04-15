import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import App from './App'
import { AuthProvider } from './context/AuthContext'
import { GoogleOAuthProvider } from '@react-oauth/google' // Import GoogleOAuthProvider
// import theme from './theme' // import theme mới tạo
// import { ThemeProvider } from '@mui/material/styles'
// import CssBaseline from '@mui/material/CssBaseline'

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <React.StrictMode>
    <AuthProvider>
      <GoogleOAuthProvider clientId="667244207769-ojiv3o2up0brthg34msgcrsdsjcjdqlg.apps.googleusercontent.com">
        {' '}
        <App />
      </GoogleOAuthProvider>
    </AuthProvider>
  </React.StrictMode>
)
