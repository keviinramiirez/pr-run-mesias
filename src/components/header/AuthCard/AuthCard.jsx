import React, { useEffect, useState } from 'react'
import './AuthCard.css'
import { useAuthContext } from '../../../store/AuthProvider'
import Login from './Login'

import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import Input from '@material-ui/core/Input'
import TextField from '@material-ui/core/TextField'
import InputAdornment from '@material-ui/core/InputAdornment'
import IconButton from '@material-ui/core/IconButton'
import VisibilityOff from '@material-ui/icons/VisibilityOff'
import Visibility from '@material-ui/icons/Visibility'
import Register from './Register'
const activeBorderCSS = '2px solid #32a1ce'

const AuthCard = ({ authCardDimensions, onHideAuthCard, onLogout, isButtonDisabled }) => {
  // const [showPassword, setShowPassword] = useState(false)
  const [isLogginActive, setIsLogginActive] = useState(true)
  const [isRegisterActive, setIsRegisterActive] = useState(false)

  // const { currentUser, isLoggedIn } = useAuthContext()
  const { authState } = useAuthContext()
  const { currentUser, isLoggedIn } = authState

  // const { displayName } = currentUser

  // const handleClickShowPassword = () => {
  //   console.log('showPassword', showPassword)
  //   setShowPassword(!showPassword)
  // }

  useEffect(() => {
    // console.log('isLoggedIn', isLoggedIn)
  }, [])

  const activateLogin = () => {
    setIsLogginActive(true)
    setIsRegisterActive(false)
  }

  const activateRegister = () => {
    setIsLogginActive(false)
    setIsRegisterActive(true)
  }

  const handleLogout = () => {
    onLogout()
    // setIsLogginActive(false)
  }

  return (
    <Card
      className='authCard'
      variant='outlined'
      style={{
        top: authCardDimensions.top + 'px',
        right: authCardDimensions.right + 'px',
      }}
    >
      <CardContent
        className='authCard__content'
        // style={{ padding: `${isLoggedIn ? '20px' : '0'}` }}
      >
        {!isLoggedIn && (
          <>
            {/* <div className='authCard__tabs'>
              <div
                className='authCard__tab authCard__loginTab'
                style={{ borderBottom: `${isLogginActive ? activeBorderCSS : ''}` }}
                onClick={activateLogin}
              >
                <p>Iniciar</p>
              </div>
              <div
                className='authCard__tab authCard__registerTab'
                style={{ borderBottom: `${isRegisterActive ? activeBorderCSS : ''}` }}
                onClick={activateRegister}
              >
                <p>Registrarte</p>
              </div>
            </div> */}
            <div className='authCard__loginFieldContainer'>
              {isLogginActive && <Login onHideAuthCard={onHideAuthCard} />}
              {/* {isRegisterActive && <Register onActivateLogin={activateLogin} />} */}
            </div>
          </>
        )}
        {isLoggedIn && (
          <div
            className='authCard__logoutProfileContent'
            // style={{ padding: `${isLoggedIn ? '20px' : '0'}` }}
          >
            <h5>{currentUser?.displayName}</h5>
            <Button
              type='submit'
              fullWidth
              variant='contained'
              color='secondary'
              // className={`px-4 py-2 text-white font-medium rounded-lg ${isLoggedIn ? 'bg-gray-300 cursor-not-allowed' : 'bg-indigo-600 hover:bg-indigo-700 hover:shadow-xl transition duration-300'}`}
              className={'authCard__logoutButton'}
              onClick={handleLogout}
            >
              {'Cerrar Sesión'}
            </Button>
          </div>
        )}

        {/* <Typography variant='h5' color='primary' align='center' gutterBottom>
          Mesias Login
        </Typography>
        <div style={{ marginTop: '2em' }}>
          <TextField
            fullWidth
            onChange={onPasswordChange}
            placeholder='Contraseña'
            // type='password'
            type={`${showPassword ? '' : 'password'}`}
            color='primary'
            InputProps={{
              endAdornment: (
                <InputAdornment position='end'>
                  <IconButton
                    aria-label='toggle password visibility'
                    onClick={handleClickShowPassword}
                    edge='end'
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          <Input
            fullWidth
            placeholder='Contraseña'
            color='primary'
            onChange={onPasswordChange}
            type='password'
            inputProps={{
              endAdornment: (
                <InputAdornment position='end'>
                  <IconButton
                    aria-label='toggle password visibility'
                    onClick={handleClickShowPassword}
                    edge='end'
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />

          <Button
            fullWidth
            style={{ marginTop: '1em' }}
            onClick={onLogin}
            variant='contained'
            color='primary'
            disabled={isButtonDisabled}
            // className={`${pw?.length > 0 ? '' : 'disableButton'}`}
          >
            Login
          </Button>
        </div> */}
      </CardContent>
    </Card>
  )
}

export default AuthCard

{
  /* <Typography component='h2'>WUEH</Typography>
        <Typography color='textSecondary'>adjective</Typography>
        <Typography variant='body2' component='p'>
          well meaning and kindly.
          <br />
          {'"a benevolent smile"'}
        </Typography> */
}
