import { Box, Grid, TextField, Button } from '@mui/material'
import { useEffect, useState, useMemo } from 'react'
import { useAppDispatch, useAppSelector } from '@/app/hooks'
import { fetchLalin } from '@/features/lalin/lalinSlice'
import { fetchGerbangs } from '@/features/gerbang/gerbangSlice'

import {
  transformMetodeChart,
  transformGerbangChart,
  transformShiftPie,
  transformCabangPie,
} from '@/utils/dashboardTransformer'

import BarChart from '@/components/charts/BarChart'
import PieChart from '@/components/charts/PieChart'

const DashboardPage = () => {
  const dispatch = useAppDispatch()

  const { data: lalinData } = useAppSelector((state) => state.lalin)
  const { data: gerbangData } = useAppSelector((state) => state.gerbang)

  const [isSearchAll, setIsSearchAll] = useState(false)
  const [tanggal, setTanggal] = useState(null)

  useEffect(() => {
    dispatch(fetchGerbangs({ page: 1, search: '' }))
  }, [dispatch])

  useEffect(() => {
    dispatch(fetchLalin({ tanggal, isSearchAll: false, page: 1 }))
  }, [tanggal, isSearchAll, dispatch])
  
  const metodeChart = useMemo(() => transformMetodeChart(lalinData), [lalinData])
  const gerbangChart = useMemo(() => transformGerbangChart(lalinData, gerbangData), [lalinData, gerbangData])
  const shiftPie = useMemo(() => transformShiftPie(lalinData), [lalinData])
  const cabangPie = useMemo(() => transformCabangPie(lalinData, gerbangData), [lalinData, gerbangData])

  const handleSearchAll = () => {
    dispatch(
      fetchLalin({
        isSearchAll: true,
      }))
    setTanggal(null)
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

  return (
    <Box p={3}>
      {/* FILTER */}
      <Box display="flex" gap={2} mb={3}>
        <TextField
          type="date"
          value={tanggal || ''}
          onChange={(e) => setTanggal(e.target.value)}
        />

        <Button
          variant="contained"
          onClick={handleSearchAll}
        >
          Search All
        </Button>

        <Button variant="outlined" color="secondary" onClick={handleResetFilter}>
          Reset
        </Button>
      </Box>

      {/* CHARTS */}
      <Grid
        display="grid"
        gap={2}
        sx={{
          gridTemplateColumns: {
            md: 'minmax(300px, 1fr)', // mobile → stack 1 kolom
            lg: '1fr 1fr',            // desktop → 2 kolom
          },
        }}
        mb={3}
        mt={7}
      >
        <Grid item xs={12} md={6}>
          <BarChart title="Lalin per Metode Bayar" data={metodeChart} />
        </Grid>

        <Grid item xs={12} md={6}>
          <BarChart
            title="Lalin per Gerbang"
            data={gerbangChart}
          />
        </Grid>

        <Grid item xs={12} md={6}>
          <PieChart title="Distribusi Shift" data={shiftPie} />
        </Grid>

        <Grid item xs={12} md={6}>
          <PieChart title="Distribusi Cabang" data={cabangPie} />
        </Grid>
      </Grid>
    </Box>
  )
}

export default DashboardPage
