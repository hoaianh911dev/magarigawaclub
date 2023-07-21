import tripEndpoint from '../endpoints/trip.endpoint'
import vehicleEndpoint from '../endpoints/vehicle.endpoint'
import bookingEndpoint from '../endpoints/booking.endpoint'
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