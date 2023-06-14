import tripEndpoint from '../endpoints/trip.endpoint'
import axios from '../configs/axios'

export const getListScheduleTrip = async () => {
    return await axios.get(`${tripEndpoint.scheduleTripList}`)
}