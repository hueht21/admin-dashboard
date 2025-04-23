export default function ThanhCong() {
  const token = localStorage.getItem('access_token')

  return (
    <div style={{ padding: '2rem' }}>
      <h2>Welcome to Dashboard</h2>
      <p>Token hiện tại: {token}</p>
    </div>
  )
}
