import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import gerbangApi from '@/api/gerbang.api'

export const fetchGerbangs = createAsyncThunk(
  'gerbang/fetch',
  async ({ page = 1, search = '' }, { rejectWithValue }) => {
    try {
      return await gerbangApi.getAll({ page, search })
    } catch (err) {
      return rejectWithValue(err.response?.data)
    }
  }
)

export const createGerbang = createAsyncThunk(
  'gerbang/create',
  async (payload, { dispatch }) => {
    await gerbangApi.create(payload)
    dispatch(fetchGerbangs({ page: 1 }))
  }
)

export const updateGerbang = createAsyncThunk(
  'gerbang/update',
  async (payload) => {
    return await gerbangApi.update(payload)
  }
)

export const deleteGerbang = createAsyncThunk(
  'gerbang/delete',
  async ({ id, IdCabang }) => {
    return await gerbangApi.remove({ id, IdCabang })
  }
)

const gerbangSlice = createSlice({
  name: 'gerbang',
  initialState: {
    data: [],
    pagination: {
      totalPages: 1,
      currentPage: 1,
      totalData: 0,
    },
    isLoading: false,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchGerbangs.pending, (state) => {
        state.isLoading = true
      })
      .addCase(fetchGerbangs.fulfilled, (state, action) => {
        state.isLoading = false
        const payload = action.payload?.data

        state.data = payload?.rows?.rows || []
        state.pagination = {
          totalPages: payload?.total_pages || 1,
          currentPage: payload?.current_page || 1,
          totalData: payload?.count || 0,
        }
      })
      .addCase(fetchGerbangs.rejected, (state) => {
        state.isLoading = false
      })
      .addCase(deleteGerbang.fulfilled, (state, action) => {
        const { id, IdCabang } = action.meta.arg

        state.data = state.data.filter(
          (g) => !(g.id === id && g.IdCabang === IdCabang)
        )
      })
      .addCase(updateGerbang.fulfilled, (state, action) => {
        const updated = action.payload.data

        const idx = state.data.findIndex(
          (g) =>
            g.id === updated.id &&
            g.IdCabang === updated.IdCabang
        )

        if (idx !== -1) {
          state.data[idx] = updated
        }
      })
  },
})

export default gerbangSlice.reducer
