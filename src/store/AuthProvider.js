import { useReducer } from 'react'
import AuthContext from './AuthContext'
import AuthReducer from './AuthReducer'
import bcrypt from 'bcryptjs'
import { logoutStorage, getToken } from '../services/authService'
// import { ServerRoutes as server } from '../services/apiService'
import { db } from '../Firebase'
import { collection, query, getDocs } from 'firebase/firestore'

const AuthProvider = ({ children }) => {
  // console.log('AuthProvider')
  const initState = {
    password: '',
  }
  const [authState, dispatchAuthAction] = useReducer(AuthReducer, initState)

  // /** Reset this context state to its initial state */
  const resetState = () =>
    dispatchAuthAction({ type: 'RESET', payload: initState })

  // const fetchUserDataByToken = async () => {
  //   const getUserData = async () => {
  //     axios.get(server.getUserData()).then(res => {
  //       // console.log('getUserData res.data', res.data)
  //       dispatchAuthAction({
  //         type: 'SET_USER',
  //         payload: res.data,
  //       })
  //       return res
  //     })
  //   }
  //   getUserData()
  // }

  const fetchUserDataByToken = async () => {
    const getUserData = async () => {
      const token = getToken()
      console.log('fetchUserDataByToken token', token)
      if (!token) return
      // console.log('token', token)

      const q = query(collection(db, 'users'))
      const querySnapshot = await getDocs(q)
      // console.log('querySnapshot', querySnapshot)

      querySnapshot.forEach(async (doc) => {
        const hashedPassword = doc.data().password
        // console.log('forEach hashedPassword', hashedPassword)

        if (token === hashedPassword) {
          console.log('token === hashedPassword', true)
          dispatchAuthAction({
            type: 'SET_USER',
            payload: { token },
          })
        }
      })
    }
    getUserData()
  }

  const signinFetch = async (password) => {
    console.log('signinFetch', password)

    const signin = async () => {
      // const isLoggedIn = false
      // const q = query(collection(db, 'users', 'Password'))
      // getDoc(doc(db, 'cities', 'password')).then((d) => {
      //   console.log('d', d)
      // })
      const q = query(collection(db, 'users'))
      const querySnapshot = await getDocs(q)
      // console.log('querySnapshot', querySnapshot)
      console.log('querySnapshot', querySnapshot)
      querySnapshot.forEach(async (doc) => {
        const hashedPassword = doc.data().password

        if (await bcrypt.compare(password, hashedPassword)) {
          dispatchAuthAction({
            type: 'LOGIN',
            payload: { password: hashedPassword },
          })
          // isLoggedIn = true
          // console.log('signinFetch isLoggedIn', isLoggedIn)
        } else logoutFetch()
        // return await bcrypt.compare(password, hashedPassword)
        // await bcrypt.compare(password, hashedPassword).then((res, isMatch) => {
        //   console.log('bcrypt res', res, isMatch)
        //   dispatchAuthAction({
        //     type: 'LOGIN',
        //     payload: { password: hashedPassword },
        //   })
        // })
        // else isLoggedIn = false
      })
      // return isLoggedIn
    }
    signin()
    // return signin().then((hashedPassword) => {
    //   console.log('hashedPassword', hashedPassword)
    //   dispatchAuthAction({
    //     type: 'LOGIN',
    //     payload: { password: hashedPassword },
    //   })
    //   return hashedPassword
    // })
  }

  // const signupFetch = async (userInfo, codeToRemove, setRedirectToApp) => {
  //   const signup = async () => {
  //     userInfo['code'] = codeToRemove;

  //     axios.post(server.signup(), userInfo)
  //       .then(res => {
  //         // console.log('res', res.data)
  //         const { user_id, token } = res.data
  //         verifyTokenAndGetUserInfoFetch(user_id, token, setRedirectToApp)
  //       })
  //       .catch(err => {
  //         console.log('err', err)
  //         if (err.response.status)
  //           console.log('msg', err.response.status)
  //       })
  //   }
  //   signup()
  // }

  // const verifyTokenAndGetUserInfoFetch = async (user_id, token, setRedirectToApp) => {
  //   const verifyTokenGetUser = async () => {
  //     // console.log('verifyTokenGetUser', user_id)
  //     axios.post(server.verifyTokenAndGetUser(), { user_id, token }).then(res => {
  //         // console.log('verifyTokenGetUser dispatch LOGIN', res.data)
  //         dispatchAuthAction({
  //           type: 'LOGIN',
  //           payload: { ...res.data },
  //         })
  //         return setRedirectToApp
  //       })
  //       .then(_ => {
  //         console.log('Redirecting to app\'s layout')
  //         setRedirectToApp(true)
  //       })
  //   }
  //   verifyTokenGetUser()
  // }

  // const verifyPermissionFetch = async (email, code) => {
  //   const verifyPermission = async () => {
  //     return axios.post(server.verifyPermission(), { email, code }).then(res => {
  //       dispatchAuthAction({
  //         type: 'VERIFY',
  //         payload: res.data
  //       })
  //       // console.log('res.data', res.data)
  //       return res.data;
  //     })
  //   }
  //   return verifyPermission()
  // }

  const logoutFetch = () => {
    // const logout = async () => {
    // return axios.get('/protected/auth/logout')
    // return axios.get(server.logout()).then(_ => {
    //   logoutStorage();
    //   resetState();
    //   console.log('resetting state')
    //   return true;
    // })
    logoutStorage()
    resetState()
    console.log('resetting state')
    // }
    // logout()
  }

  console.log('AuthProvider')

  const authContext = {
    authState,
    resetState,
    // verifyPermission: verifyPermissionFetch,
    // signup: signupFetch,
    signin: signinFetch,
    logout: logoutFetch,
    fetchUserDataByToken,
  }

  return (
    <AuthContext.Provider value={authContext}>{children}</AuthContext.Provider>
  )
}

export default AuthProvider
