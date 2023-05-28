import authEnpoint from '../endpoints/auth.endpoint'
import axios from '../configs/axios'

export const checkEmailExist = async (email) => {
    return await axios.get(`${authEnpoint.checkEmailExist}?email=${email}`)
}

export const sendMailResetPassword = async (id) => {
    return await axios.post(`${authEnpoint.sendMail}`, { id })
}

export const updatePassword = async (id, password) => {
    return await axios.put(`${authEnpoint.updatePassword}`, {id, password})
}

export const login = async (email, password) => {
    return await axios.post(`${authEnpoint.login}`, {email, password})
}