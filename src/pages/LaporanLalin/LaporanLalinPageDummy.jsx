import { useEffect, useState, useMemo } from 'react'
import {
  Box,
  Button,
  TextField,
  CircularProgress,
} from '@mui/material'
import { useAppDispatch, useAppSelector } from '@/app/hooks'
import { fetchLalin } from '@/features/lalin/lalinSlice'
import { calculateSummary } from '@/utils/lalinSummary'
import LalinTable from '@/components/tables/LalinTable'
import { Pagination } from '@mui/material'
import { transformLalinRow } from '@/utils/lalinTransformer'

const LaporanLalinPage = () => {
  const dispatch = useAppDispatch()
  const { data, pagination, isLoading } = useAppSelector((state) => state.lalin)
  const [isSearchAll, setIsSearchAll] = useState(false)
  const [tanggal, setTanggal] = useState(null)
  const transformedData = useMemo(
    () => data.map(transformLalinRow),
    [data]
  )

  useEffect(() => {
    dispatch(
      fetchLalin({
        tanggal,
        isSearchAll: false,
        page: 1,
      })
    )
  }, [tanggal, dispatch])
  
  const handleSearchAll = () => {
    setIsSearchAll(true)
    dispatch(
      fetchLalin({
        isSearchAll: true,
        page: 1,
      }))
  }
  const handlePageChange = (_, value) => {
    dispatch(
      fetchLalin({
        tanggal,
        isSearchAll,
        page: value,
      })
    )
  }
  const handleResetFilter = () => {
    const today = null

    setTanggal(today)
    setIsSearchAll(false)

    dispatch(
      fetchLalin({
        tanggal: today,
        isSearchAll: false,
        page: 1,
      })
    )
  }

  const summary = calculateSummary(data)
  return (
    <Box p={3}>
      {/* FILTER */}
      <Box display="flex" gap={2} mb={3}>
        <TextField
          type="date"
          value={tanggal}
          onChange={(e) => setTanggal(e.target.value)}
        />

        <Button variant="contained" onClick={handleSearchAll}>
          Search All
        </Button>
        
        <Button variant="outlined" color="secondary" onClick={handleResetFilter}>
          Reset
        </Button>
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
      {transformedData.length > 0 && (
        <LalinTable data={transformedData} />
      )}

      {pagination.totalPages > 1 && (
        <Pagination
          count={pagination.totalPages}
          page={pagination.currentPage}
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
