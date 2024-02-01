// api.js
import axios from 'axios'

const api = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL || 'http://www.cabinet-bogl.com',
})

api.interceptors.request.use(
  (config) => {
    if (localStorage.getItem('token') && localStorage.getItem('token') !== '') {
      config.headers.Authorization = `Bearer ${localStorage.getItem('token')}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  },
)

api.interceptors.response.use(
  (response) => {
    // Handle successful responses
    return response
  },
  (error) => {
    if (error.response && error.response.status === 401) {
      // Handle unauthorized (e.g., redirect to login page)
      // You can also automatically logout the user here
    }
    return Promise.reject(error)
  },
)

export default api
