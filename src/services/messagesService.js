import Axios from 'src/services/axiosConfig'

const getAllMessages = async () => {
  const response = await Axios.get('/api/messages')
  return response.data
}

export { getAllMessages }
