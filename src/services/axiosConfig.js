import axios from 'axios'
import { useEffect } from 'react'
import { useAuth } from 'src/Context/AuthContext'
import { useMessageContext } from 'src/Context/MessageContext'
import { useNavigate } from 'react-router-dom'

const api = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL || 'http://api.cabinet-bogl.com',
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

const AxiosInterceptor = ({ children }) => {
  const { disconnect } = useAuth()
  const { displayError } = useMessageContext()
  const navigate = useNavigate()

  useEffect(() => {
    const errInterceptor = (error) => {
      if (error.response && error.response.status === 401) {
        displayError('Votre session a expiré', 'Votre session a expiré, veuillez vous reconnecter') // Afficher une erreur en cas de réponse 401
        console.log("Déconnexion de l'utilisateur en cas de réponse 401 ")
        disconnect() // Déconnexion de l'utilisateur en cas de réponse 401
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
