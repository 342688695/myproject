import {loadUserId, loadToken, loadUserName, loadPassword} from '../common/js/cache.js'
const state = {
  baseData: {},
  goods: [],
  myintegral: '',
  userid: loadUserId(),
  token: loadToken(),
  praiseList: [],
  username: loadUserName(),
  password: loadPassword(),
  shareDetail: {}
}

export default state
