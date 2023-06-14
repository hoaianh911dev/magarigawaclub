import authEndpoint from '../endpoints/auth.endpoint'
import axios from '../configs/axios'

export const checkEmailExist = async (email) => {
    return await axios.get(`${authEndpoint.checkEmailExist}?email=${email}`)
}

export const sendMailResetPassword = async (id) => {
    return await axios.post(`${authEndpoint.sendMail}`, { id })
}

export const updatePassword = async (id, password) => {
    return await axios.put(`${authEndpoint.updatePassword}`, {id, password})
}

export const login = async (email, password) => {
    return await axios.post(`${authEndpoint.login}`, {email, password})
}