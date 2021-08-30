import { logout } from '@/api/user'
import { getToken, setToken, removeToken, setUserName, getUserName } from '@/utils/auth'
import { resetRouter } from '@/router'

const getDefaultState = () => {
  return {
    token: getToken(),
    name: '',
    avatar: '',
    roles: [],
    permissions: [],
    startSite: localStorage.getItem('startSite') || '南沙',
    endSite: localStorage.getItem('endSite') || '市桥',
    date: new Date(),
    userType: localStorage.getItem('userType') || '1'
  }
}

const state = getDefaultState()

const mutations = {
  RESET_STATE: (state) => {
    Object.assign(state, getDefaultState())
  },
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  SET_NAME: (state, name) => {
    state.name = name
  },
  SET_AVATAR: (state, avatar) => {
    state.avatar = avatar
  },
  SET_ROLES: (state, roles) => {
    state.roles = roles
  },
  SET_PERMISSIONS: (state, permissions) => {
    state.permissions = permissions
  },
  SET_STARTSITE: (state, startSite) => {
    state.startSite = startSite
  },
  SET_ENDSITE: (state, endSite) => {
    state.endSite = endSite
  },
  SET_DATE: (state, date) => {
    state.date = date
  },
  SET_USERTYPE: (state, userType) => {
    state.userType = userType
  }
}

const actions = {
  // user login
  setInfo({ commit }, userInfo) {
    return new Promise((resolve, reject) => {
      console.log(userInfo)
      const { token, userName } = userInfo
      commit('SET_TOKEN', token)
      commit('SET_NAME', userName)
      setToken(token)
      setUserName(userName)
      resolve()
    })
  },

  startSite({ commit }, startSite) {
    commit('SET_STARTSITE', startSite)
    localStorage.setItem('startSite', startSite)
  },

  endSite({ commit }, endSite) {
    commit('SET_ENDSITE', endSite)
    localStorage.setItem('endSite', endSite)
  },

  date({ commit }, date) {
    commit('SET_DATE', date)
    localStorage.setItem('date', date)
  },

  userType({ commit }, userType) {
    commit('SET_USERTYPE', userType)
    localStorage.setItem('userType', userType)
  },

  // get user info
  getInfo({ commit, state }) {
    return new Promise((resolve, reject) => {
      const name = getUserName()
      const startSite = localStorage.getItem('startSite')
      const endSite = localStorage.getItem('endSite')
      // const permissions = getUserPermissions()
      // const { name, avatar, roles, permissions } = getUserInfo()
      commit('SET_STARTSITE', startSite || '南沙')
      commit('SET_ENDSITE', endSite || '市桥')
      commit('SET_NAME', name || '')
      // commit('SET_PERMISSIONS', permissions || [])
      // commit('SET_AVATAR', avatar || '')
      // commit('SET_ROLES', roles || [])
      resolve()
    })
  },

  // user logout
  logout({ commit, state }) {
    return new Promise((resolve, reject) => {
      logout(state.token).then(() => {
        removeToken() // must remove  token  first
        // 移除用户信息
        // removeUserName()
        // removeUserPermissions()
        resetRouter()
        commit('RESET_STATE')
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  // remove token
  resetToken({ commit }) {
    return new Promise(resolve => {
      removeToken() // must remove  token  first
      commit('RESET_STATE')
      resolve()
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}

