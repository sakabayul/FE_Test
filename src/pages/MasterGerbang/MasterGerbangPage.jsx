import { useEffect, useState, useMemo } from 'react'
import {
  Box,
  Button,
  TextField,
  CircularProgress,
} from '@mui/material'
import { Pagination } from '@mui/material'
import { useAppDispatch, useAppSelector } from '@/app/hooks'
import { fetchGerbangs } from '@/features/gerbang/gerbangSlice'
import GerbangTable from '@/components/tables/GerbangTable'
import GerbangModal from '@/components/modals/GerbangModal'

const MasterGerbangPage = () => {
  const dispatch = useAppDispatch()
  const [search, setSearch] = useState('')
  const [currentPage, setCurrentPage] = useState(1)

  const { data, isLoading } = useAppSelector(
    (state) => state.gerbang
  )
  const [modal, setModal] = useState({
    open: false,
    mode: 'add', // add | edit | view | delete
    data: null,
  })

  const ITEMS_PER_PAGE = 10
  const totalPages = Math.ceil(data.length / ITEMS_PER_PAGE)

  useEffect(() => {
    dispatch(
      fetchGerbangs({ search })).then(() => {
      setCurrentPage(1)
    })
  }, [dispatch, search])

  const pagedData = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE
    const end = start + ITEMS_PER_PAGE
    return data.slice(start, end)
  }, [data, currentPage])

  const handlePageChange = (_, page) => {
    setCurrentPage(page)
  }

  return (
    <Box p={3}>
      {/* HEADER */}
      <Box display="flex" gap={2} mb={3}>
        <TextField 
          label="Search Gerbang"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <Button
          variant="contained"
          onClick={() =>
            setModal({ open: true, mode: 'add', data: null })
          }
        >
          Add Gerbang
        </Button>
      </Box>

      <GerbangTable
        data={pagedData}
        onView={(row) => setModal({ open: true, mode: 'view', data: row })}
        onEdit={(row) => setModal({ open: true, mode: 'edit', data: row })}
        onDelete={(row) => setModal({ open: true, mode: 'delete', data: row })}
      />

      {totalPages > 1 && (
        <Pagination
          count={totalPages}
          page={currentPage}
          onChange={handlePageChange}
          sx={{ mt: 2 }}
        />
      )}

      {isLoading && <CircularProgress />}

      <GerbangModal
        {...modal}
        onClose={() =>
          setModal({ open: false, mode: 'add', data: null })
        }
      />
    </Box>
  )
}

export default MasterGerbangPage
