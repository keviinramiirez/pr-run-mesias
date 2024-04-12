import { setLocalStorage } from '../services/authService'

const types = {
  RESET: 'RESET',
  VERIFY: 'VERIFY',
  LOGIN: 'LOGIN',
  SET_USER: 'SET_USER',
}

const AuthReducer = (state, action) => {
  const { type, payload } = action
  // console.log('AuthReducer')

  switch (type) {
    case types.SET_USER: {
      const { token } = payload
      return {
        ...state,
        password: token,
      }
    }
    case types.LOGIN: {
      const { password } = payload
      console.log('Reducer password', password)
      // if (password && exp)
      //   setLocalStorage({ token: password, exp }) // Local Storage
      setLocalStorage({ token: password, exp: 'to be defined' }) // Local Storage

      return {
        ...state, //not neccessary I think
        password,
      }
      // const { password, token, exp } = payload
      // if (token && exp) setLocalStorage({ token, exp }) // Local Storage

      // return {
      //   ...state, //not neccessary I think
      //   password,
      // }
    }
    case types.VERIFY: {
      const { password } = payload
      // console.log(permission_type, employee_id, location, restaurant_id)
      return {
        ...state,
        password,
      }
    }
    case types.RESET: {
      console.log('payload', payload)
      return payload
    }
    default:
      return state
  }
}

export default AuthReducer
