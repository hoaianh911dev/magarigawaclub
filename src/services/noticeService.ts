import noticeEndpoint from '../endpoints/notice.endpoint'
import axios from '../configs/axios'

export const getListNoticeByUserId = async(params) => {
    const res = await axios.get(`${noticeEndpoint.notice}?userid=${params.userId}`)
    return res.data
}

export const getNoticeById = async(params) => {
    const res = await axios.get(`${noticeEndpoint.notice}?id=${params.id}`)
    return res.data
}