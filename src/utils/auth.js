const TokenKey = 'token'

export function getToken() {
  return localStorage.getItem(TokenKey)
}

export function setToken(token) {
  return localStorage.setItem(TokenKey, token)
}

export function removeToken() {
  return localStorage.removeItem(TokenKey)
}

const UserNameKey = 'name'

export function getUserName() {
  return localStorage.getItem(UserNameKey)
}

export function setUserName(userName) {
  return localStorage.setItem(UserNameKey, userName)
}

export function removeUserName() {
  return localStorage.removeItem(UserNameKey)
}

const UserPermissionsKey = 'permissions'

export function getUserPermissions() {
  return JSON.parse(localStorage.getItem(UserPermissionsKey))
}

export function setUserPermissions(permissions) {
  return localStorage.setItem(UserPermissionsKey, JSON.stringify(permissions))
}

export function removeUserPermissions() {
  return localStorage.removeItem(UserPermissionsKey)
}
