
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
        if(accessToken) {
            config.headers["x-access-token"] = accessToken
        }

    return config
})

export default instance