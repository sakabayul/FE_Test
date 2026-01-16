import axiosInstance from './axios'

const lalinApi = {
  getAll: async (page = 1) => {
    const { data } = await axiosInstance.get('/lalins', {
      params: { page, limit: 1000 },
    })
    return data
  },

  getByDate: async (tanggal, page = 1) => {
    const { data } = await axiosInstance.get('/lalins', {
      params: { tanggal, page, limit: 1000 },
    })
    return data
  },
}

export default lalinApi
