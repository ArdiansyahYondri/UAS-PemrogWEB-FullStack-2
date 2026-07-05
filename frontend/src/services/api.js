import axios from 'axios'

// Konfigurasi dasar jalur komunikasi ke backend Laravel
const apiClient = axios.create({
  baseURL: 'http://127.0.0.1:8000/api',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
})

// Interceptor: Otomatis menyisipkan Token di setiap permintaan (request)
apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

export default apiClient
