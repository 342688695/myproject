import {commonParams} from './config.js'
import axios from 'axios'
import md5 from 'js-md5'
import Qs from 'qs'
export function getFouceDetail (userId, token, dateTime) {
  const url = '/api/app.php/Home/AppAttention/index'
  const Timestamp = (new Date()).valueOf() + ''
  const data = Object.assign({}, commonParams, {
    Timestamp: Timestamp,
    Sign: md5(commonParams.appid + Timestamp + userId + token),
    userid: userId,
    dateTime: dateTime
  })
  return axios.post(url, Qs.stringify(data)).then((res) => {
    return Promise.resolve(res.data)
  })
}
