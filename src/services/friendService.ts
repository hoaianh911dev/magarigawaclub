import friendEndpoint from "../endpoints/friend.endpoint"
import axios from "../configs/axios"

export const getListFriendByUserId = async (params) => {
    const res = await axios.get(`${friendEndpoint.friend}?userid=${params.userId}`)
    return res.data
}

export const getListUnfriendByUserId = async(params) => {
    const res = await axios.get(`${friendEndpoint.unfriend}?userid=${params.userId}&nameSearch=${params.nameSearch}`)
    return res.data
}

export const updateFriend = async(params) => {
    const res = await axios.put(`${friendEndpoint.friend}?userid=${params.userId}`, {friendid: params.friendId})
    return res.data
}