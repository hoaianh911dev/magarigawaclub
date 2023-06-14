
import axios from 'axios'
import { BASE_URL_API } from '../constants/default'
import useAuth from '../hooks/useAuth'

const instance = axios.create({
    baseURL: BASE_URL_API,
    headers: {
        'Content-Type': 'application/json',
    }
})

instance.interceptors.request.use(
    (config) => {
        const {accessToken} = useAuth()
        const authorization = "Bearer " + accessToken
        if(accessToken) {
            config.headers["authorization"] = authorization
        }

    return config
})

export default instance