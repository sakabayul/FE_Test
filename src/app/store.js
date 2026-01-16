import { configureStore } from '@reduxjs/toolkit'
import authReducer from '@/features/auth/authSlice'
import lalinReducer from '@/features/lalin/lalinSlice'
import gerbangReducer from '@/features/gerbang/gerbangSlice'

export const store = configureStore({
  reducer: {
    auth: authReducer,
    lalin: lalinReducer,
    gerbang: gerbangReducer,
  },
})
