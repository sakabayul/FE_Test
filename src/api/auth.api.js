import axiosInstance from './axios'

const authApi = {
  login: async (payload) => {
    const { data } = await axiosInstance.post('/auth/login', payload)
    return data
  },
}

export default authApi
