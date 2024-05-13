// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
// import firebase from 'firebase'

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getAuth, onAuthStateChanged } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyDFlpGmYKmGb5PYDmelsjcMAHqqCQ8rkmU',
  authDomain: 'pr-run-mesias.firebaseapp.com',
  projectId: 'pr-run-mesias',
  storageBucket: 'pr-run-mesias.appspot.com',
  messagingSenderId: '52872121258',
  appId: '1:52872121258:web:09f70d1ac055424c49f9d3',
}

// Initialize Firebase
// const firebaseApp = firebase.initializeApp(firebaseConfig)
// const db = firebaseApp.firestore()
// const auth = firebase.auth()

const app = initializeApp(firebaseConfig)
const auth = getAuth(app)
const db = getFirestore(app)
// const todosCol = collection(db, 'todos')

// onAuthStateChanged(auth, user => {
//   console.log((user != null) ? 'logged in' : 'No user')
// })

export { db, auth }
