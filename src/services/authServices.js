import Axios from 'src/services/axiosConfig'

const authService = {
  login: async (data) => {
    const response = await Axios.post(`api/login`, { ...data })
    return response.data
  },

  logout: async () => {},
}

export default authService
