import React, { useEffect, useState } from 'react'
import axios from 'axios'
import {
  Box,
  List,
  ListItem,
  ListItemText,
  Typography,
  Divider,
  Paper,
  CircularProgress,
} from '@mui/material'

import { useAuth } from '../context/AuthContext'

const RoleList = () => {
  const [roles, setRoles] = useState([])
  const [loading, setLoading] = useState(true)

    const { userAuth } = useAuth()

  useEffect(() => {
    const fetchRoles = async () => {
      try {
        const response = await axios.get(
          'http://localhost:8080/api/roles/get-all',
          {
            headers: {
              Authorization: `Bearer ${userAuth.}`,
            },
          }
        )
        if (response.data.status) {
          setRoles(response.data.data)
        }
      } catch (error) {
        console.error('Lỗi khi lấy danh sách role:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchRoles()
  }, [])

  return (
    <Box sx={{ p: 4 }}>
      <Paper sx={{ p: 3 }}>
        <Typography variant="h5" gutterBottom>
          Danh sách tất cả Role
        </Typography>
        <Divider sx={{ mb: 2 }} />

        {loading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
            <CircularProgress />
          </Box>
        ) : (
          <List>
            {roles.map((role) => (
              <ListItem key={role.idRole}>
                <ListItemText
                  primary={role.nameRole}
                  secondary={role.describe}
                />
              </ListItem>
            ))}
          </List>
        )}
      </Paper>
    </Box>
  )
}

export default RoleList
