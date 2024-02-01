import Axios from 'src/services/axiosConfig'

const authService = {
  login: async (data) => {
    try {
      const response = await Axios.post(`api/login`, { ...data })
      return response.data
    } catch (error) {
      throw error
    }
  },

  logout: async () => {},
}

export default authService
