
import axios from 'axios'
//const
import { BASE_URL_API } from '../constants/default'
//hooks
import useLocalStorage from '../hooks/useLocalStorage'

const instance = axios.create({
    baseURL: BASE_URL_API,
    headers: {
        'Content-Type': 'application/json',
    }
})

instance.interceptors.request.use(
    (config) => {
        const accessToken = useLocalStorage().accessToken
        const authorization = "Bearer " + accessToken
        if(accessToken) {
            config.headers["authorization"] = authorization
        }

    return config
})

export default instance