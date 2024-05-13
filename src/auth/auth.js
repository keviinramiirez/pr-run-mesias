import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
} from 'firebase/auth'
import { auth, db } from './firebase'
import {
  deleteField,
  updateDoc,
  collection,
  query,
  getDocs,
  getDoc,
  setDoc,
  doc,
  where,
} from 'firebase/firestore'

const getUserJSONInitData = user => {
  return {
    email: user.email,
    displayName: user.displayName,
    photoURL: user.photoURL,
    accessToken: user.accessToken,
    // type: 'guest',
  }
}

/** Returns true if user is admin. Otherwise, return false */
export const verifyAndFetchGoogleUserData = async user => {
  // const testEmail = 'kevin.ramirez3@upr.edu'
  // const testEmail = 'kevjramirez@gmail.com'

  const docSnap = await getDoc(doc(db, 'users', user.email)) //
  const userData = docSnap.data()
  // if (docSnap.exists()) {
  // console.log('Document data:', user.email, '\n', userData)
  //   // return userData.type === 'admin'
  // } else {
  user = getUserJSONInitData(user)
  if (!docSnap.exists()) {
    // console.log('No such document > userData', userData)
    // console.log('---', user)
    user.type = 'guest'
    user.subscribedCities = []
    await setDoc(doc(db, 'users', user.email), user)
    // return false
  } else {
    // console.log('userData', userData)
    user.type = userData.type
    user.subscribedCities = userData.subscribedCities
  }

  return user

  // const q = query(collection(db, 'cities'), where('email', '==', 'kevin.ramirez3@upr.edu'))
  // const querySnapshot = await getDocs(q)
  // querySnapshot.forEach((doc) => {
  //   // doc.data() is never undefined for query doc snapshots
  //   console.log(doc.id, ' => ', doc.data())
  // })
}

export const doCreateUserWithEmailAndPassword = async (email, password) => {
  return createUserWithEmailAndPassword(auth, email, password)
}

export const doSignInWithEmailAndPassword = async (email, password) => {
  return signInWithEmailAndPassword(auth, email, password)
}

export const doSignInWithGoogle = async () => {
  const provider = new GoogleAuthProvider()
  console.log('provider', provider)
  const result = await signInWithPopup(auth, provider)

  return result
}

export const doSignOut = () => {
  // setIsLoggedIn(false)
  return auth.signOut()
}

export const setLocalStorage = ({ token, exp }) => {
  // const expiresIn = moment().add(exp, 'days')

  // const hashedToken = bcrypt.hash(token)
  localStorage.setItem('token', token)
  // localStorage.setItem('exp', JSON.stringify(expiresIn.valueOf()))
}

// export const doPasswordReset = (password) => {
//   return setPasswordResetEmail(auth.currentUser, password)
// }

// export const doPasswordChange = (password) => {
//   return updatePassword(auth.currentUser, password)
// }

// export const doSendEmailVerification = () => {
//   return sendEmailVerification(auth.currentUser, {
//     url: `${window.location.origin}/`
//   })
// }
