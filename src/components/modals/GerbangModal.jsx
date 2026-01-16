import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
} from '@mui/material'
import { useState, useEffect } from 'react'
import { useAppDispatch } from '@/app/hooks'
import {
  createGerbang,
  updateGerbang,
  deleteGerbang,
} from '@/features/gerbang/gerbangSlice'
import { generateGerbangPayload } from '@/utils/gerbangHelper'
import { useAppSelector } from '@/app/hooks'
import { fetchGerbangs } from '@/features/gerbang/gerbangSlice'

const GerbangModal = ({ open, mode, data, onClose }) => {
  const dispatch = useAppDispatch()
  const [form, setForm] = useState({
    NamaCabang: '',
    NamaGerbang: '',
  })
  const { data: gerbangs } = useAppSelector((state) => state.gerbang)

  useEffect(() => {
    if (data) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setForm({
        NamaCabang: data.NamaCabang || '',
        NamaGerbang: data.NamaGerbang || '',
      })
    }
    if (!open) {
      setForm({
        NamaCabang: '',
        NamaGerbang: '',
      })
    }
  }, [data, open])

  const handleSubmit = async () => {
    if (mode === 'add') {
      const payload = generateGerbangPayload({
        existingGerbangs: gerbangs,
        form,
      })
      dispatch(createGerbang(payload))
    }

    if (mode === 'edit') {
      const payload = {
        id: data.id,
        IdCabang: data.IdCabang,
        NamaGerbang: form.NamaGerbang.trim(),
        NamaCabang: form.NamaCabang.trim(),
      }
      await dispatch(updateGerbang(payload)).unwrap()
      dispatch(fetchGerbangs({ page: 1, search: '' }))
    }

    if (mode === 'delete') {
      dispatch(
        deleteGerbang({
          id: data.id,
          IdCabang: data.IdCabang,
        })
      )
    }

    onClose()
  }

  const isView = mode === 'view'
  const isDelete = mode === 'delete'

  return (
    <Dialog open={open} onClose={onClose} fullWidth>
      <DialogTitle>{mode.toUpperCase()} GERBANG</DialogTitle>

      <DialogContent>
        {!isDelete && (
          <>
            <TextField
              label="Nama Cabang"
              fullWidth
              margin="normal"
              disabled={isView}
              value={form.NamaCabang}
              onChange={(e) =>
                setForm({ ...form, NamaCabang: e.target.value })
              }
            />
            <TextField
              label="Nama Gerbang"
              fullWidth
              margin="normal"
              disabled={isView}
              value={form.NamaGerbang}
              onChange={(e) =>
                setForm({ ...form, NamaGerbang: e.target.value })
              }
            />
          </>
        )}

        {isDelete && <p>Yakin ingin menghapus gerbang ini?</p>}
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        {mode !== 'view' && (
          <Button variant="contained" onClick={handleSubmit}>
            Confirm
          </Button>
        )}
      </DialogActions>
    </Dialog>
  )
}

export default GerbangModal
