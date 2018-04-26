import * as types from './mutation-types'
const mutations = {
  [types.SET_BASEDATA] (state, data) {
    state.baseData = data
  },
  [types.SET_GOODS] (state, data) {
    state.goods = data
  },
  [types.SET_MYINTEGRAL] (state, count) {
    state.myintegral = count
  },
  [types.SET_USERID] (state, id) {
    state.userid = id
  },
  [types.SET_TOKEN] (state, token) {
    state.token = token
  },
  [types.SET_PAISELIST] (state, list) {
    state.praiseList = list
  },
  [types.SET_USERNAME] (state, name) {
    state.username = name
  },
  [types.SET_PASSWORD] (state, password) {
    state.password = password
  },
  [types.SET_SHAREDETAIL] (state, list) {
    state.shareDetail = list
  }
}

export default mutations
