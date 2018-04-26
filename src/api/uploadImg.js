import {commonParams} from './config.js'
import axios from 'axios'
import md5 from 'js-md5'
import Qs from 'qs'
export function setUploadImg (userId, token, mobileType, imgages) {
  const url = '/api/app.php/Home/AppShare/add'
  const Timestamp = (new Date()).valueOf() + ''
  const data = Object.assign({}, commonParams, {
    Timestamp: Timestamp,
    mobileType: mobileType,
    Sign: md5(commonParams.appid + Timestamp + userId + token),
    imgages: imgages,
    userid: userId
  })
  return axios.post(url, Qs.stringify(data)).then((res) => {
    return Promise.resolve(res.data)
  })
}
