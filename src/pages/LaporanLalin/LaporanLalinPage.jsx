import { useEffect, useState, useMemo } from 'react'
import {
  Box,
  Button,
  TextField,
  CircularProgress,
  Select,
  MenuItem,
} from '@mui/material'
import { useAppDispatch, useAppSelector } from '@/app/hooks'
import { fetchLalin } from '@/features/lalin/lalinSlice'
import { calculateSummary } from '@/utils/lalinSummary'
import LalinTable from '@/components/tables/LalinTable'
import { Pagination } from '@mui/material'
import { transformLalinRow } from '@/utils/lalinTransformer'
import { exportToCSV } from '@/utils/exportCsv'
import { exportToExcel } from '@/utils/exportExcel'

const LaporanLalinPage = () => {
  const dispatch = useAppDispatch()
  const [tanggal, setTanggal] = useState(null)
  const [currentPage, setCurrentPage] = useState(1)
  
  const { data, isLoading } = useAppSelector(
    (state) => state.lalin
  )
  const transformedData = useMemo(
    () => data.map(transformLalinRow),
    [data]
  )

  const ITEMS_PER_PAGE = 10
  const totalPages = Math.ceil(data.length / ITEMS_PER_PAGE)

  const pagedData = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE
    const end = start + ITEMS_PER_PAGE
    return transformedData.slice(start, end)
  }, [transformedData, currentPage])

  useEffect(() => {
    dispatch(
      fetchLalin({
        tanggal,
        isSearchAll: false,
      })
    ).then(() => {
      setCurrentPage(1)
    })
  }, [tanggal, dispatch])
  
  const handleSearchAll = () => {
    dispatch(
      fetchLalin({
        isSearchAll: true,
      }))
    setTanggal(null)
  }
  const handlePageChange = (_, value) => {
    setCurrentPage(value)
  }
  const handleResetFilter = () => {
    const today = null
    setTanggal(today)
    dispatch(
      fetchLalin({
        tanggal: today,
        isSearchAll: false,
      })
    )
  }
  const handleExport = () => {
    exportToCSV(
      transformedData,
      `laporan-lalin-${tanggal || 'all'}.csv`
    )
  }
  const handleExportExcel = () => {
    exportToExcel(
      transformedData,
      `laporan-lalin-${tanggal || 'all'}.xlsx`
    )
  }
  
  const summary = calculateSummary(data)
  return (
    <Box p={3}>
      {/* FILTER */}
      <Box display="flex" gap={2} mb={3}>
        <TextField
          type="date"
          value={tanggal || ''}
          onChange={(e) => setTanggal(e.target.value)}
        />

        <Button variant="contained" onClick={handleSearchAll}>
          Search All
        </Button>
        
        <Button variant="outlined" color="secondary" onClick={handleResetFilter}>
          Reset
        </Button>

        <Select
          value=""
          displayEmpty
          onChange={(e) => {
            if (e.target.value === 'csv') handleExport()
            if (e.target.value === 'excel') handleExportExcel()
          }}
        >
          <MenuItem value="" disabled>Export</MenuItem>
          <MenuItem value="csv">Export CSV</MenuItem>
          <MenuItem value="excel">Export Excel</MenuItem>
        </Select>
      </Box>

      {/* SUMMARY */}
      <Box
        display="grid"
        gridTemplateColumns="repeat(auto-fit, minmax(180px, 1fr))"
        gap={2}
        mb={3}
      >
        {Object.entries(summary).map(([key, value]) => {
          const label =
            key.toUpperCase() === 'ETOLLTUNAIFLO'
              ? 'E-TOLL + TUNAI + FLO'
              : key.toUpperCase()

          return (
            <Box
              key={key}
              p={2}
              borderRadius={3}
              bgcolor="#fff"
              boxShadow="0 4px 12px rgba(0,0,0,0.06)"
              textAlign="center"
            >
              <Box
                fontSize={12}
                fontWeight={600}
                color="text.secondary"
                mb={1}
              >
                {label}
              </Box>

              <Box
                fontSize={22}
                fontWeight={700}
                color="text.primary"
              >
                {value}
              </Box>
            </Box>
          )
        })}
      </Box>

      {/* TABLE */}
      <LalinTable data={pagedData} />

      {totalPages > 1 && (
        <Pagination
          count={totalPages}
          page={currentPage}
          onChange={handlePageChange}
          sx={{ mt: 2 }}
        />
      )}

      {/* LOADING */}
      {isLoading && <CircularProgress />}
    </Box>
  )
}

export default LaporanLalinPage
