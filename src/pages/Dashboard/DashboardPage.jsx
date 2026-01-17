import dayjs from 'dayjs'
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
  const [tanggal, setTanggal] = useState("")
  const [isSearchAll, setIsSearchAll] = useState(false)
  
  const { data: lalinData } = useAppSelector((state) => state.lalin)
  const { data: gerbangData } = useAppSelector((state) => state.gerbang)

  const defaultTanggal = useMemo(() => {
    if (!lalinData.length) return ''

    return dayjs(lalinData[0].Tanggal).format('YYYY-MM-DD')
  }, [lalinData])

  const selectedTanggal = useMemo(() => {
    if (isSearchAll) return null
    return tanggal || defaultTanggal
  }, [tanggal, defaultTanggal, isSearchAll])

  useEffect(() => {
    dispatch(fetchGerbangs({ page: 1, search: '' }))
  }, [dispatch])

  useEffect(() => {
    dispatch(fetchLalin({ tanggal: selectedTanggal, isSearchAll, page: 1 }))
  }, [selectedTanggal, isSearchAll, dispatch])
  
  const metodeChart = useMemo(() => transformMetodeChart(lalinData), [lalinData])
  const gerbangChart = useMemo(() => transformGerbangChart(lalinData, gerbangData), [lalinData, gerbangData])
  const shiftPie = useMemo(() => transformShiftPie(lalinData), [lalinData])
  const cabangPie = useMemo(() => transformCabangPie(lalinData, gerbangData), [lalinData, gerbangData])

  // const handleSearchAll = () => {
  //   setIsSearchAll(true)
  //   setTanggal(null)
  // }
  const handleResetFilter = () => {
    setIsSearchAll(true)
    setTanggal(null)
  }

  return (
    <Box p={3}>
      {/* FILTER */}
      <Box display="flex" gap={2} mb={3}>
        <TextField
          type="date"
          value={selectedTanggal || ''}
          onChange={(e) => {
            setTanggal(e.target.value)
            setIsSearchAll(false)
          }}
        />

        {/* <Button
          variant="contained"
          onClick={handleSearchAll}
        >
          Search All
        </Button> */}

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
            md: 'minmax(300px, 1fr)',
            lg: '1fr 1fr',
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
