import { useEffect } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import { useAppDispatch } from './app/hooks'
import { logout } from './features/auth/authSlice'
import ProtectedRoute from './routes/ProtectedRoute'

// Layout
import MainLayout from './components/layout/MainLayout'

// Pages
import LoginPage from './pages/Login/LoginPage'
import DashboardPage from './pages/Dashboard/DashboardPage'
import LaporanLalinPage from './pages/LaporanLalin/LaporanLalinPage'
import MasterGerbangPage from './pages/MasterGerbang/MasterGerbangPage'

function App() {
  const dispatch = useAppDispatch()

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (!token) {
      dispatch(logout())
    }
  }, [dispatch])

  return (
    <Routes>
      {/* PUBLIC */}
      <Route path="/login" element={<LoginPage />} />

      {/* PROTECTED */}
      <Route element={<ProtectedRoute />}>
        <Route
          element={
            <MainLayout />
          }
        >
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/laporan-lalin" element={<LaporanLalinPage />} />
          <Route path="/master-gerbang" element={<MasterGerbangPage />} />
        </Route>
      </Route>

      {/* FALLBACK */}
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  )
}

export default App
