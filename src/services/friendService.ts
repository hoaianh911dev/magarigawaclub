import friendEndpoint from "../endpoints/friend.endpoint"
import axios from "../configs/axios"

export const getListFriendByUserId = async (params) => {
    const res = await axios.get(`${friendEndpoint.friend}?userid=${params.userId}`)
    return res.data
}