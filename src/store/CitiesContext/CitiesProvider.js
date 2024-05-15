import { useEffect, useReducer, useContext } from 'react'
import CitiesContext from './CitiesContext'
import CitiesReducer from './CitiesReducer'
import { db } from '../../auth/firebase'
import { collection, query, getDocs } from 'firebase/firestore'
import { subscribeUserCity, unsubscribeUserCity } from '../../services/cityService'

export function useCitiesContext() {
  return useContext(CitiesContext)
}

const CitiesProvider = ({ children }) => {
  // const [currentUser, setCurrentUser] = useState(null)
  // const [isLoggedIn, setIsLoggedIn] = useState(false)
  // const [isEmailUser, setIsEmailUser] = useState(false)
  // const [isGoogleUser, setIsGoogleUser] = useState(false)
  // const [isLoading, setIsLoading] = useState(true)
  const initState = {
    tovisitCities: [],
    visitedCities: [],
    notvisitedCities: [],
  }
  const [authState, dispatchAuthAction] = useReducer(AuthReducer, initState)

  /** Reset this context state to its initial state */
  // const resetState = () => dispatchAuthAction({ type: 'RESET', payload: initState })

  useEffect(() => {
    // const unsubscribe = onAuthStateChanged(auth, initializeUser)
    // return unsubscribe
  }, [])

  // const initializeUser = async user => {
  //   if (user) {
  //     await verifyAndFetchCitiesData(user).then(userData => {
  //       console.log('userData', userData)
  //       dispatchAuthAction({ type: 'INIT_GOOGLE_USER', payload: { user: userData } })
  //     })
  //   }
  //   // console.log('initializeUser authState.currentUser', authState.currentUser)
  // }

  const dispatchUserCitySubscription = async (city, isSubscribed) => {
    // console.log('-----unsortedCities', unsortedCities)
    // const isUserSubscribedToCity = authState.currentUser.subscribedCities.includes(city.name)
    // const isUserSubscribedToCity = authState.currentUser.subscribedCities.some(
    //   c => c.name === city.name
    // )
    if (isSubscribed) {
      console.log('unsubscribing to ', city.name)
      await unsubscribeUserCity(authState.currentUser, city)
        .then(user => dispatchAuthAction({ type: 'SUBSCRIPTION_USER_CITY', payload: { user } }))
        .catch(err => console.log('err', err))
    } else {
      await subscribeUserCity(authState.currentUser, city).then(user => {
        console.log('subscribing to ', city.name)
        dispatchAuthAction({ type: 'SUBSCRIPTION_USER_CITY', payload: { user } })
      })
    }
  }

  // const dispatchUnsubscribeUserCity = async city => {
  //   console.log('dispatchSubscribeUserCity')
  //   await unsubscribeUserCity(authState.currentUser, city)
  //     .then(user => {
  //       console.log('unsubscribeUserCity.then -> user', user)
  //       dispatchAuthAction({ type: 'SUBSCRIPTION_USER_CITY', payload: { user } })
  //     })
  //     .catch(err => console.log('err', err))
  // }

  // const dispatchSubscribeUserCity = async city => {
  //   console.log('dispatchSubscribeUserCity')
  //   await subscribeUserCity(authState.currentUser, city)
  //     .then(user => dispatchAuthAction({ type: 'SUBSCRIPTION_USER_CITY', payload: { user } }))
  //     .catch(err => console.log('err', err))
  // }

  // const dispatchUnsubscribeUserCity = async city => {
  //   console.log('dispatchSubscribeUserCity')
  //   await unsubscribeUserCity(authState.currentUser, city)
  //     .then(user => {
  //       console.log('unsubscribeUserCity.then -> user', user)
  //       dispatchAuthAction({ type: 'SUBSCRIPTION_USER_CITY', payload: { user } })
  //     })
  //     .catch(err => console.log('err', err))
  // }

  // const fetchSignInWithGoogle = (onHideAuthCard) => {
  //   // const doSignInWithGoogle = async () => {
  //   //   const provider = new GoogleAuthProvider()
  //   //   const result = await signInWithPopup(auth, provider)
  //   //   return result
  //   // }
  //   // doSignInWithGoogle()

  //   setIsLoggedIn(true)
  //   doSignInWithGoogle()
  //   // .then((result) => {
  //   //   // This gives you a Google Access Token. You can use it to access the Google API.
  //   //   const credential = GoogleAuthProvider.credentialFromResult(result)
  //   //   const token = credential.accessToken
  //   //   const user = result.user
  //   //   console.log('credential, user', token, user)
  //   //   dispatchAuthAction({ type: 'INIT_GOOGLE_USER', payload: { user, token } })

  //   //   // setIsLoggedIn(true)
  //   //   onHideAuthCard()
  //   //   // IdP data available using getAdditionalUserInfo(result)
  //   // })
  //   // .catch((err) => {
  //   //   setIsLoggedIn(false)

  //   //   // Handle Errors here.
  //   //   const errorCode = err.code
  //   //   const errorMessage = err.message
  //   //   // The email of the user's account used.
  //   //   const email = err.customData.email
  //   //   // The AuthCredential type that was used.
  //   //   const credential = GoogleAuthProvider.credentialFromError(err)
  //   //   console.log('error signin in with Google', credential)
  //   // })
  // }

  // const fetchUserDataByToken = async () => {
  //   const getUserData = async () => {
  //     const token = getToken()
  //     // console.log('fetchUserDataByToken token', token)
  //     if (!token) return
  //     // console.log('token', token)

  //     const q = query(collection(db, 'users'))
  //     const querySnapshot = await getDocs(q)
  //     // console.log('querySnapshot', querySnapshot)

  //     querySnapshot.forEach(async (doc) => {
  //       const hashedPassword = doc.data().password
  //       // console.log('forEach hashedPassword', hashedPassword)

  //       if (token === hashedPassword) {
  //         // console.log('token === hashedPassword', true)
  //         // dispatchAuthAction({
  //         //   type: 'SET_USER',
  //         //   payload: { token },
  //         // })
  //       }
  //     })
  //   }
  //   getUserData()
  // }

  // const signinFetch = async (password) => {
  //   // console.log('signinFetch', password)

  //   const signin = async () => {
  //     const q = query(collection(db, 'users'))
  //     const querySnapshot = await getDocs(q)
  //     // console.log('querySnapshot', querySnapshot)
  //     querySnapshot.forEach(async (doc) => {
  //       const hashedPassword = doc.data().password

  //       if (await bcrypt.compare(password, hashedPassword)) {
  //         // dispatchAuthAction({
  //         //   type: 'LOGIN',
  //         //   payload: { password: hashedPassword },
  //         // })
  //         // console.log('signinFetch isLoggedIn', isLoggedIn)
  //       } else logoutFetch()
  //       // return await bcrypt.compare(password, hashedPassword)
  //       // await bcrypt.compare(password, hashedPassword).then((res, isMatch) => {
  //       //   console.log('bcrypt res', res, isMatch)
  //       //   dispatchAuthAction({
  //       //     type: 'LOGIN',
  //       //     payload: { password: hashedPassword },
  //       //   })
  //       // })
  //       // else isLoggedIn = false
  //     })
  //     // return isLoggedIn
  //   }
  //   signin()
  // }

  // const logoutFetch = () => {
  //   // const logout = async () => {
  //   // return axios.get('/protected/auth/logout')
  //   // return axios.get(server.logout()).then(_ => {
  //   //   logoutStorage();
  //   //   resetState();
  //   //   console.log('resetting state')
  //   //   return true;
  //   // })
  //   logoutStorage()
  //   // resetState()
  //   // }
  //   // logout()
  // }

  const authContext = {
    authState,
    // authState,
    // resetState,
    // verifyPermission: verifyPermissionFetch,
    // signup: signupFetch,
    setIsLoggedIn,
    dispatchSigninWithGoogle,
    dispatchUserCitySubscription,
    // fetchSignInWithGoogle,
    // signin: signinFetch,
    // logout: logoutFetch,
    // fetchUserDataByToken,
  }

  return (
    <AuthContext.Provider value={authContext}>
      {!authState?.isLoading && children}
    </AuthContext.Provider>
  )
}

export default CitiesProvider

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