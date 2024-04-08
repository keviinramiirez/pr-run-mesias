import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { auth } from './Firebase'

function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const signIn = (e) => {
    e.preventDefault()

    auth
      .signInWithEmailAndPassword(email, password)
      .then((auth) => {
        console.log(auth)
      })
      .catch((err) => alert(err.message))
  }
}
