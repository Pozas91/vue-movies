// Axios global configurations
import axios from 'axios'

const instance = axios.create({
  baseURL: 'https://compare-spa-apps.firebaseio.com/',
  headers: {
    Accepts: 'application/json'
  }
})

export default instance
