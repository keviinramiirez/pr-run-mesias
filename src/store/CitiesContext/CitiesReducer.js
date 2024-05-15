import { setLocalStorage, logoutStorage } from '../../services/authService'

import { verifyAndFetchGoogleUserData } from '../../auth/auth'

const types = {
  RESET: 'RESET',
  VERIFY: 'VERIFY',
  LOGIN: 'LOGIN',
  SET_USER: 'SET_USER',
  INIT_USER: 'INIT_USER',
  SET_LOGIN_STATUS: 'SET_LOGIN_STATUS',
  INIT_GOOGLE_USER: 'INIT_GOOGLE_USER',
  SUBSCRIPTION_USER_CITY: 'SUBSCRIPTION_USER_CITY',
}

const CitiesReducer = (state, action) => {
  const { type, payload } = action
  // console.log('CitiesReducer')

  switch (type) {
    case types.RESET: {
      // console.log('RESET', payload)
      // logoutStorage()
      return {
        ...payload,
      }
    }
    case types.SUBSCRIPTION_USER_CITY: {
      const { user } = payload
      // console.log('city', user)

      return {
        ...state,
        currentUser: user,
        isLoggedIn: payload,
        isLoading: false,
      }
    }
    default:
      return state
  }
}

export default CitiesReducer
