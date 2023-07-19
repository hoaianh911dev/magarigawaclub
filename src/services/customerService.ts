import customerEndpoint from "../endpoints/customer.endpoint"
import axios from "../configs/axios"

export const getListCustomerByManagerId = async (params) => {
    const res = await axios.get(`${customerEndpoint.customer}?_where[managerid]=${params.managerid}`)
    return res.data
}

export const createCustomer = async(params) => {
    const res = await axios.post(`${customerEndpoint.customer}`, {...params})
    return res.data
}