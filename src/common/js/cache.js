import storage from 'good-storage'

const USER_ID = '_userid_'
const TOKEN = '_token_'
const USER_NAME = '_username_'
const PASSWORD = '_password_'

export function setUserId (uerid) {
  return storage.set(USER_ID, uerid)
}
export function setToken (token) {
  return storage.set(TOKEN, token)
}
export function loadUserId () {
  return storage.get(USER_ID, [])
}
export function loadToken () {
  return storage.get(TOKEN, [])
}
export function setUserName (username) {
  return storage.session.set(USER_NAME, username)
}
export function setPassword (password) {
  return storage.session.set(PASSWORD, password)
}
export function loadUserName () {
  return storage.session.get(USER_NAME, [])
}
export function loadPassword () {
  return storage.session.get(PASSWORD, [])
}
export function clearStorage () {
  return storage.clear()
}
