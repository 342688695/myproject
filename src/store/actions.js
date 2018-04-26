import {setUserId, setToken, setUserName, setPassword} from '../common/js/cache.js'
import * as types from './mutation-types'

export const saveUserId = function ({commit}, id) {
  commit(types.SET_USERID, setUserId(id))
}
export const saveToken = function ({commit}, token) {
  commit(types.SET_TOKEN, setToken(token))
}
export const insertPraiseList = function ({commit, state}, listItem) {
  let praiseList = state.praiseList.slice()
  praiseList.push(listItem)
  commit(types.SET_PAISELIST, praiseList)
}
export const saveUserName = function ({commit}, name) {
  commit(types.SET_USERNAME, setUserName(name))
}
export const savePassword = function ({commit}, password) {
  commit(types.SET_PASSWORD, setPassword(password))
}
