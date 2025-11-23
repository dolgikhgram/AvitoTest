import axios from 'axios'

const client = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL_API,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 100000,
})
export default client
