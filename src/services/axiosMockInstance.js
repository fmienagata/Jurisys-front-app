import axios, { AxiosRequestConfig } from 'axios'
import AxiosMockAdapter from 'axios-mock-adapter'
const axiosMockInstance = axios.create()
export const axiosMockAdapterInstance = new AxiosMockAdapter(axiosMockInstance, {
  delayResponse: 0,
})
export default axiosMockInstance
