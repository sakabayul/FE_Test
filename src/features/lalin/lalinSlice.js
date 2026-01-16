import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import lalinApi from '@/api/lalin.api'

export const fetchLalin = createAsyncThunk(
  'lalin/fetch',
  async ({ tanggal, isSearchAll, page }, { rejectWithValue }) => {
    try {
      if (isSearchAll) {
        return await lalinApi.getAll(page)
      }
      return await lalinApi.getByDate(tanggal, page)
    } catch (err) {
      return rejectWithValue(err.response?.data || 'Failed fetch lalin')
    }
  }
)

const lalinSlice = createSlice({
  name: 'lalin',
  initialState: {
    data: [],
    pagination: {
      totalPages: 0,
      currentPage: 0,
      totalData: 0,
    },
    isLoading: false,
    error: null,
  },
  reducers: {
    resetLalin(state) {
      state.data = []
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchLalin.pending, (state) => {
        state.isLoading = true
        state.error = null
      })
      .addCase(fetchLalin.fulfilled, (state, action) => {
        state.isLoading = false

        const payload = action.payload?.data

        state.data = payload?.rows?.rows || []

        state.pagination = {
          totalPages: payload?.total_pages || 1,
          currentPage: payload?.current_page || 1,
          totalData: payload?.count || 0,
        }
      })
      .addCase(fetchLalin.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload
      })
  },
})

export const { resetLalin } = lalinSlice.actions
export default lalinSlice.reducer
