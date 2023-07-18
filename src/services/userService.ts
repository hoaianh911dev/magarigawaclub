import authEndpoint from '../endpoints/auth.endpoint'
import axios from '../configs/axios'

export const login = async (params) => {
    const res = await axios.post(`${authEndpoint.login}`, {email: params.email, password: params.password})
    return res.data;
}

export const checkEmailExist = async (params) => {
    const res = await axios.get(`${authEndpoint.checkEmailExist}?email=${params.email}`)
    return res.data;
}

export const sendMailResetPassword = async (params) => {
    const res = await axios.post(`${authEndpoint.sendMail}`, { id: params.id })
    return res.data;
}

export const updatePassword = async (params) => {
    const res = await axios.put(`${authEndpoint.updatePassword}`, {id: params.id, password: params.password})
    return res.data;
}