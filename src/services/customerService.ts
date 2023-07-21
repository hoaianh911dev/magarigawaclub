import customerEndpoint from "../endpoints/customer.endpoint"
import axios from "../configs/axios"

export const getListCustomerByManagerId = async (params) => {
    const res = await axios.get(`${customerEndpoint.customer}?userid=${params.userid}`)
    return res.data
}

export const createCustomer = async(params) => {
    const res = await axios.post(`${customerEndpoint.customer}`, {...params})
    return res.data
}