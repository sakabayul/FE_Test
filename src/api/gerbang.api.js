import axiosInstance from './axios'

const gerbangApi = {
  getAll: async ({ page = 1, search = '' }) => {
    const { data } = await axiosInstance.get('/gerbangs', {
      params: { page, NamaGerbang: search },
    })
    return data
  },

  create: async (payload) => {
    const { data } = await axiosInstance.post('/gerbangs', payload)
    return data
  },

  update: async (payload) => {
    const { data } = await axiosInstance.put(`/gerbangs/`, payload)
    return data
  },

  remove: async ({ id, IdCabang }) => {
    const { data } = await axiosInstance.delete('/gerbangs', {
      data: {
        id,
        IdCabang,
      },
    })
    return data
  },
}

export default gerbangApi
