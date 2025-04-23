import React, { useState } from 'react'
import {
  Box,
  TextField,
  Button,
  Typography,
  Container,
  Grid,
} from '@mui/material'

export default function CustomerForm() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    address: '',
    note: '',
    image: null,
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleImageChange = (e) => {
    const file = e.target.files[0]
    setFormData((prev) => ({
      ...prev,
      image: file,
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log('Form data:', formData)

    // Nếu cần upload file: sử dụng FormData để gửi
    const data = new FormData()
    data.append('name', formData.name)
    data.append('phone', formData.phone)
    data.append('address', formData.address)
    data.append('note', formData.note)
    if (formData.image) data.append('image', formData.image)

    // Gửi về backend (axios/fetch tùy bạn)
    // axios.post('/api/customer', data)
  }

  return (
    <Container maxWidth="sm" sx={{ pb: 3 }}>
      <Box sx={{ mt: 4, p: 3, boxShadow: 3, borderRadius: 2 }}>
        <Typography variant="h6" gutterBottom>
          Thông tin khách hàng
        </Typography>
        <form>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                label="Họ và tên"
                name="name"
                fullWidth
                required
                // size="small"
                style={{ height: '20px' }}
                value={formData.name}
                onChange={handleChange}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                label="Số điện thoại"
                name="phone"
                fullWidth
                required
                value={formData.phone}
                onChange={handleChange}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                label="Địa chỉ"
                name="address"
                fullWidth
                multiline
                value={formData.address}
                onChange={handleChange}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                label="Ghi chú"
                name="note"
                fullWidth
                multiline
                // rows={3}
                value={formData.note}
                // onChange={handleChange}
              />
            </Grid>

            <Grid item xs={12}>
              <Button variant="outlined" component="label">
                Tải hình ảnh
                <input
                  type="file"
                  hidden
                  accept="image/*"
                  onChange={handleImageChange}
                />
              </Button>
              {/* {formData.image && (
                <Typography sx={{ mt: 1 }}>
                  Đã chọn: {formData.image.name}
                </Typography>
              )} */}
            </Grid>

            <Grid item xs={12}>
              <Button
                variant="contained"
                color="primary"
                fullWidth
                type="submit"
              >
                Gửi thông tin
              </Button>
            </Grid>
          </Grid>
        </form>
        <div>
          {formData.image && (
            <Typography variant="body1" sx={{ mt: 2 }}>
              {formData.image.name}
            </Typography>
          )}
        </div>
      </Box>
    </Container>
  )
}
