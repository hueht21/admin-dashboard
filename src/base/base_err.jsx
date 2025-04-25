// import { useNavigate } from 'react-router-dom' // nếu dùng react-router

// export function handleApiError(err, navigate) {
//   const status = err?.response?.status
//   const apiMessage = err?.response?.data?.message
//   const errorMessage = apiMessage || err?.message || 'Lỗi không xác định'

//   console.error('Lỗi API:', errorMessage)

//   if (status === 401) {
//     // Token hết hạn hoặc chưa login
//     alert('Phiên đăng nhập hết hạn. Vui lòng đăng nhập lại!')
//     navigate('/login')
//   } else if (status === 403) {
//     // Không có quyền
//     alert('Bạn không có quyền truy cập chức năng này.')
//     navigate('/403')
//   } else {
//     alert(errorMessage)
//   }
// }
