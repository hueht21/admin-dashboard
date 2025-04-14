import React, { useEffect, useState } from 'react'
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Stack,
} from '@mui/material'

const DialogThemMenu = ({ open, onClose, onSubmit }) => {
  const [menuName, setMenuName] = useState('')
  const [menuUrl, setMenuUrl] = useState('')
  const [errors, setErrors] = useState({})
  const [isSubmitted, setIsSubmitted] = useState(false)

  useEffect(() => {
    if (open) {
      setIsSubmitted(false)
    }
  }, [open])

  const validate = () => {
    const newErrors = {}
    if (!menuName.trim()) newErrors.menuName = 'Tên menu không được để trống'
    if (!menuUrl.trim()) newErrors.linkUri = 'Đường dẫn không được để trống'
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = () => {
    setIsSubmitted(true)
    if (!validate()) return

    onSubmit({ menuName, menuUrl })
    setMenuName('')
    setMenuUrl('')
    setErrors({})
  }

  const handleClose = () => {
    setMenuName('')
    setMenuUrl('')
    onClose()
  }

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
      <DialogTitle>Thêm Menu mới</DialogTitle>
      <DialogContent>
        <Stack spacing={2} mt={1}>
          <TextField
            label="Tên menu"
            fullWidth
            value={menuName}
            onChange={(e) => setMenuName(e.target.value)}
            error={isSubmitted && !!errors.menuName}
            helperText={isSubmitted && errors.menuName}
          />
          <TextField
            label="Đường dẫn (URL)"
            fullWidth
            value={menuUrl}
            onChange={(e) => setMenuUrl(e.target.value)}
            error={isSubmitted && !!errors.linkUri}
            helperText={errors.linkUri}
          />
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} variant="outlined" color="secondary">
          Hủy
        </Button>
        <Button onClick={handleSubmit} variant="contained" color="primary">
          Thêm
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default DialogThemMenu
