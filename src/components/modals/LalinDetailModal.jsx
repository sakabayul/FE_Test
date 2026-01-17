import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Box,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Pagination,
} from '@mui/material'
import { useMemo, useState } from 'react'

import {
  filterByPaymentType,
  exportDetailExcel,
} from '@/utils/lalinDetailHelper'
import { formatDateDMY } from '@/utils/helper'

const ITEMS_PER_PAGE = 10

const LalinDetailModal = ({ open, onClose, data, type, label }) => {
  const [page, setPage] = useState(1)
  const filtered = useMemo(() => {
    return filterByPaymentType(data, type)
  }, [data, type])

  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE)

  const pagedData = useMemo(() => {
    const start = (page - 1) * ITEMS_PER_PAGE
    return filtered.slice(start, start + ITEMS_PER_PAGE)
  }, [filtered, page])

  const handleClose = () => {
    setPage(1)
    onClose()
  }

  const handleExport = () => {
    exportDetailExcel(filtered, `Detail ${label}`)
  }

  return (
    <Dialog open={open} onClose={handleClose} fullWidth maxWidth="md">
      <DialogTitle>Detail {label}</DialogTitle>

      <DialogContent>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell>Tanggal</TableCell>
              <TableCell>Cabang</TableCell>
              <TableCell>Gerbang</TableCell>
              <TableCell align="right">Total</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {pagedData.map((row, idx) => (
              <TableRow key={idx}>
                <TableCell>{formatDateDMY(row.Tanggal)}</TableCell>
                <TableCell>{row.NamaCabang}</TableCell>
                <TableCell>{row.NamaGerbang}</TableCell>
                <TableCell align="right">{row.Total}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        {totalPages > 1 && (
          <Box mt={2} display="flex" justifyContent="center">
            <Pagination
              count={totalPages}
              page={page}
              onChange={(_, p) => setPage(p)}
            />
          </Box>
        )}
      </DialogContent>

      <DialogActions>
        <Button onClick={handleExport} color="success" variant="outlined">
          Export Excel
        </Button>
        <Button onClick={handleClose}>Close</Button>
      </DialogActions>
    </Dialog>
  )
}

export default LalinDetailModal
