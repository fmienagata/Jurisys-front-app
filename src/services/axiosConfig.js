import axios from 'axios'
import { useEffect } from 'react'
import { useAuth } from 'src/Context/AuthContext'
import { useMessageContext } from 'src/Context/MessageContext'
import { useNavigate } from 'react-router-dom'

const api = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL || 'http://api.jurisys-africa.com/',
})

api.interceptors.request.use(
  (config) => {
    config.headers = config.headers || {}
    const clientCode = localStorage.getItem('clientCode')
    if (clientCode && clientCode.trim() !== '') {
      config.headers['X-Client'] = clientCode.trim()
    }
    if (localStorage.getItem('token') && localStorage.getItem('token') !== '') {
      config.headers.Authorization = `Bearer ${localStorage.getItem('token')}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  },
)

const AxiosInterceptor = ({ children }) => {
  const { disconnect, isLogged } = useAuth()

  const { displayError } = useMessageContext()
  const navigate = useNavigate()

  useEffect(() => {
    const errInterceptor = (error) => {
      if (error.response && error.response.status === 401) {
        displayError('Votre session a expiré', 'Votre session a expiré, veuillez vous reconnecter')
        disconnect()
        navigate('/login')
      }
      return Promise.reject(error)
    }

    const interceptor = api.interceptors.response.use((response) => response, errInterceptor)

    return () => {
      api.interceptors.response.eject(interceptor)
    }
  }, [disconnect])

  return children
}

export default api
export { AxiosInterceptor }
