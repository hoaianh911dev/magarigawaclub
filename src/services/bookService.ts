import tripEndpoint from '../endpoints/trip.endpoint'
import vehicleEndpoint from '../endpoints/vehicle.endpoint'
import bookingEndpoint from '../endpoints/booking.endpoint'
import categoryEndpoint from '../endpoints/category.endpoint'
import axios from '../configs/axios'

export const getListScheduleTrip = async () => {
    const res = await axios.get(`${tripEndpoint.scheduleTripList}`)
    return res.data
}
export const getListVehicleInforByUser = async (params) => {
    const res = await axios.get(`${vehicleEndpoint.vehicleInfo}?_where[userid]=${params.userId}`)
    return res.data
}
export const createBooking = async (params) => {
    const res = await axios.post(`${bookingEndpoint.booking}`, { ...params })
    return res.data
}
export const getListBookingByStatus = async (params) => {
    const res = await axios.get(`${bookingEndpoint.booking}?status=${params.status}&userid=${params.userid}&typebook=${params.typeBook}`)
    return res.data
}
export const getListTypeRoomByType = async (params) => {
    const res = await axios.get(`${categoryEndpoint.category}?type=${params.type}`)
    return res.data
}