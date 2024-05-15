import { setLocalStorage, logoutStorage } from '../services/authService'

import { verifyAndFetchGoogleUserData } from '../auth/auth'

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

const AuthReducer = (state, action) => {
  const { type, payload } = action
  // console.log('AuthReducer')

  switch (type) {
    case types.RESET: {
      // console.log('RESET', payload)
      // logoutStorage()
      return {
        ...payload,
        // currentUser: null, //email, emailVerified, photoURL, displayName, accessToken
        // isLoggedIn: false,
        // isEmailUser: false,
        // isGoogleUser: false,
        isLoading: false,
      }
    }
    // case types.INIT_USER: {
    //   // console.log('payload', payload)
    //   const { user, isEmail } = payload
    //   setLocalStorage({ token: user.accessToken }) // Local Storage
    //   if (user) {
    //     user.type = user.email === 'kevin.ramirez3@upr.edu' ? 'admin' : 'guest'
    //   }

    //   return {
    //     ...state,
    //     currentUser: user,
    //     isLoggedIn: true,
    //     isLoading: false,
    //     isEmailUser: isEmail,
    //     isGoogleUser: !isEmail,
    //   }
    // }
    case types.INIT_GOOGLE_USER: {
      const { user } = payload
      // console.log('user', user)
      // let currentUser = user
      // // setLocalStorage({ token: user.accessToken }) // Local Storage
      // // console.log('token', token)
      // // const currentUser = user
      // // currentUser.accessToken = token;
      // if (currentUser) {}
      //   await verifyAndFetchGoogleUserData(currentUser).then(userData => {
      //     console.log('userData', userData)

      //     currentUser = userData
      //   })

      // console.log('INIT_GOOGLE_USER user', user)

      return {
        ...state,
        currentUser: user,
        isLoggedIn: true,
        isLoading: false,
        isEmailUser: false,
        isGoogleUser: true,
      }
    }
    case types.SET_LOGIN_STATUS: {
      // const { token } = payload
      return {
        ...state,
        isLoggedIn: payload,
        isLoading: false,
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
    // case types.LOGIN: {
    //   const { password } = payload
    //   // if (password && exp)
    //   //   setLocalStorage({ token: password, exp }) // Local Storage
    //   setLocalStorage({ token: password, exp: 'to be defined' }) // Local Storage

    //   return {
    //     ...state, //not neccessary I think
    //     password,
    //   }
    //   // const { password, token, exp } = payload
    //   // if (token && exp) setLocalStorage({ token, exp }) // Local Storage

    //   // return {
    //   //   ...state, //not neccessary I think
    //   //   password,
    //   // }
    // }
    // case types.VERIFY: {
    //   const { password } = payload
    //   // console.log(permission_type, employee_id, location, restaurant_id)
    //   return {
    //     ...state,
    //     password,
    //   }
    // }
    default:
      return state
  }
}

export default AuthReducer
