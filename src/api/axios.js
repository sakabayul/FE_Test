import axios from 'axios'
import { store } from '@/app/store'
import { logout } from '@/features/auth/authSlice'

const axiosInstance = axios.create({
  baseURL: 'http://localhost:8080/api',
})

axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem('token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

axiosInstance.interceptors.response.use(
  (res) => res,
  (error) => {
    if (error.response?.status === 401) {
      store.dispatch(logout())
      window.location.href = '/login'
    }
    return Promise.reject(error)
  }
)

export default axiosInstance
