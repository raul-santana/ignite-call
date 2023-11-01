import axios from 'axios'

export const api = axios.create({
  baseURL: '/api', // colocamos a partir do "/", sem o http://localhost:3000 porque o front e o back estão no mesmo lugar
})
