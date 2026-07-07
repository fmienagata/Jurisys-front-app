import Axios from 'src/services/axiosConfig'

const authService = {
  login: async (data) => {
    const { clientCode, ...credentials } = data
    const response = await Axios.post(`api/login`, credentials, {
      headers: {
        'X-Client': (clientCode || '').trim(),
      },
    })
    return response.data
  },

  logout: async () => { },
}

export default authService
