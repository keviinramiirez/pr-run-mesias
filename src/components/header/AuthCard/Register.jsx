import { useState } from 'react'
import { useAuth } from '../../../store/AuthContext/AuthProvider'
import { doCreateUserWithEmailAndPassword } from '../../../services/authService'

const Register = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [isRegistering, setIsRegistaring] = useState(false)
  const [errorMsg, setErrorMsg] = useState('')

  const onSubmit = async e => {
    e.preventDefault()
    if (!isRegistering) {
      setIsRegistaring(true)
      await doCreateUserWithEmailAndPassword(email, password)
    }
  }

  return <div>Register Component</div>
}

export default Register
