import * as React from 'react'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'

export default function ConfirmDialog({
  open,
  onClose,
  onConfirm,
  title,
  content,
}) {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      aria-labelledby="confirm-dialog-title"
      aria-describedby="confirm-dialog-description"
    >
      <DialogTitle id="confirm-dialog-title">{title || 'Xác nhận'}</DialogTitle>
      <DialogContent>
        <DialogContentText id="confirm-dialog-description">
          {content || 'Bạn có chắc chắn muốn thực hiện hành động này?'}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Hủy</Button>
        <Button onClick={onConfirm} autoFocus color="error">
          Đồng ý
        </Button>
      </DialogActions>
    </Dialog>
  )
}
