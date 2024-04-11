import { setLocalStorage } from '../services/authService'

const types = {
  RESET: 'RESET',
  VERIFY: 'VERIFY',
  LOGIN: 'LOGIN',
  SET_USER: 'SET_USER',
}

const AuthReducer = (state, action) => {
  const { type, payload } = action

  switch (type) {
    case types.SET_USER: {
      const { password } = payload
      return {
        // ...state,
        password,
      }
    }
    case types.LOGIN: {
      const { password, token, exp } = payload
      if (token && exp) setLocalStorage({ token, exp }) // Local Storage

      return {
        ...state, //not neccessary I think
        password,
      }
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
