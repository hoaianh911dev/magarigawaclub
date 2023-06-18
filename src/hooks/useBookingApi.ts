import tripEndpoint from '../endpoints/trip.endpoint'
import vehicleEndpoint from '../endpoints/vehicle.endpoint'
import axios from '../configs/axios'

export const getListScheduleTrip = async () => {
    return await axios.get(`${tripEndpoint.scheduleTripList}`)
}
export const getListVehicleInforByUser = async (userId) => {
    return await axios.get(`${vehicleEndpoint.vehicleInfo}?_where[userid]=${userId}`)
}