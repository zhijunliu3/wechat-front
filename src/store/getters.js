const getters = {
  token: state => state.user.token,
  name: state => state.user.name,
  startSite: state => state.user.startSite,
  endSite: state => state.user.endSite,
  date: state => new Date() > state.user.date ? new Date() : state.user.date,
  userType: state => state.user.userType
}
export default getters
