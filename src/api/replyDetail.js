import {commonParams} from './config.js'
import axios from 'axios'
import md5 from 'js-md5'
import Qs from 'qs'
export function getreplyDetail (userId, token, shareId, content, level, parentId) {
  const url = '/api/app.php/Home/AppShare/addReply'
  const Timestamp = (new Date()).valueOf() + ''
  const data = Object.assign({}, commonParams, {
    Timestamp: Timestamp,
    Sign: md5(commonParams.appid + Timestamp + userId + token),
    userid: userId,
    shareId: shareId,
    content: content,
    level: level,
    parentId: parentId
  })
  return axios.post(url, Qs.stringify(data)).then((res) => {
    return Promise.resolve(res.data)
  })
}
