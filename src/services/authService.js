// import moment from 'moment'
// import bcrypt from 'bcryptjs'

export const setLocalStorage = ({ token, exp }) => {
  // const expiresIn = moment().add(exp, 'days')

  // const hashedToken = bcrypt.hash(token)
  localStorage.setItem('token', token)
  // localStorage.setItem('exp', JSON.stringify(expiresIn.valueOf()))
}

export const getToken = () => {
  return localStorage.getItem('token')
}

export const logoutStorage = () => {
  // console.log('logoutStorage');
  localStorage.removeItem('token')
  // localStorage.removeItem('exp')
}

// export const isLoggedIn = () => moment().isBefore(getExpiration())

// export const isLoggedOut = () => {
//   if (!localStorage.getItem('exp')) return true
//   return !isLoggedIn()
// }

// const getExpiration = () => {
//   const expiration = localStorage.getItem('exp')
//   const expiresAt = JSON.parse(expiration)
//   return moment(expiresAt)
// }
