import {
  Drawer,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  IconButton,
  Box,
  Divider,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
} from '@mui/material'
import {
  Menu as MenuIcon,
  Dashboard as DashboardIcon,
  TableChart as TableChartIcon,
  Settings as SettingsIcon,
  Logout as LogoutIcon,
} from '@mui/icons-material'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAppDispatch } from '@/app/hooks'
import { logout } from '@/features/auth/authSlice'

const drawerWidth = 240
const collapsedWidth = 64

const Sidebar = () => {
  const [open, setOpen] = useState(false)
  const [openLogout, setOpenLogout] = useState(false)

  const navigate = useNavigate()
  const dispatch = useAppDispatch()

  const menu = [
    {
      label: 'Dashboard',
      icon: <DashboardIcon />,
      path: '/dashboard',
    },
    {
      label: 'Laporan Lalin',
      icon: <TableChartIcon />,
      path: '/laporan-lalin',
    },
    {
      label: 'Master Gerbang',
      icon: <SettingsIcon />,
      path: '/master-gerbang',
    },
  ]

  const handleLogoutConfirm = () => {
    localStorage.removeItem('token')
    dispatch(logout())
    navigate('/login', { replace: true })
  }

  const handleLogoutClick = () => {
    setOpenLogout(true)
  }

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: open ? drawerWidth : collapsedWidth,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: open ? drawerWidth : collapsedWidth,
          boxSizing: 'border-box',
          transition: 'width 0.3s',
        },
      }}
    >
      {/* HEADER */}
      <Box
        display="flex"
        justifyContent={open ? 'flex-end' : 'center'}
        p={1}
      >
        <IconButton onClick={() => setOpen(!open)}>
          <MenuIcon />
        </IconButton>
      </Box>

      {/* MENU */}
      <List sx={{ flexGrow: 1 }}>
        {menu.map((item) => (
          <ListItemButton
            key={item.label}
            onClick={() => navigate(item.path)}
            sx={{
              justifyContent: open ? 'initial' : 'center',
              px: 2.5,
            }}
          >
            <ListItemIcon
              sx={{
                minWidth: 0,
                mr: open ? 2 : 'auto',
                justifyContent: 'center',
              }}
            >
              {item.icon}
            </ListItemIcon>

            {open && <ListItemText primary={item.label} />}
          </ListItemButton>
        ))}
      </List>

      <Divider />

      {/* LOGOUT */}
      <List>
        <ListItemButton
          onClick={handleLogoutClick}
          sx={{
            justifyContent: open ? 'initial' : 'center',
            px: 2.5,
            color: 'error.main',
          }}
        >
          <ListItemIcon
            sx={{
              minWidth: 0,
              mr: open ? 2 : 'auto',
              justifyContent: 'center',
              color: 'error.main',
            }}
          >
            <LogoutIcon />
          </ListItemIcon>
          {open && <ListItemText primary="Logout" />}
        </ListItemButton>
      </List>

      <Dialog
        open={openLogout}
        onClose={() => setOpenLogout(false)}
      >
        <DialogTitle>Konfirmasi Logout</DialogTitle>

        <DialogContent>
          <Typography>
            Apakah Anda yakin ingin keluar dari aplikasi?
          </Typography>
        </DialogContent>

        <DialogActions>
          <Button
            onClick={() => setOpenLogout(false)}
            variant="outlined"
          >
            Batal
          </Button>

          <Button
            onClick={handleLogoutConfirm}
            variant="contained"
            color="error"
          >
            Logout
          </Button>
        </DialogActions>
      </Dialog>
    </Drawer>
  )
}

export default Sidebar
