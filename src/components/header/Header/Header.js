import { useState, useEffect } from 'react'
import AuthContext from '../../../store/AuthContext/AuthContext'
import AccountCircleIcon from '@material-ui/icons/AccountCircle'
import './Header.css'
import LoginCard from '../AuthCard/LoginCard'
import AuthCard from '../AuthCard/AuthCard'
import { doSignOut } from '../../../services/authService'
import { useAuthContext } from '../../../store/AuthContext/AuthProvider'
import { Avatar } from '@material-ui/core'

const Header = ({
  iconEl,
  authCardDimensions,
  onAuthCardClick,
  onHideAuthCard,
  // isLoggedIn,
  onLogout,
}) => {
  const [pw, setPw] = useState('')
  const { authState } = useAuthContext()
  const { currentUser, isLoggedIn } = authState
  // const { photoURL } = currentUser

  useEffect(() => {
    // console.log('useEffect authState', currentUser?.photoURL)
  }, [])

  // useEffect(() => {
  //   if (password?.length > 0) {
  //     handleLoginCard(true)
  //   }
  //   // else console.log('useEffect NOPE')
  // }, [password])

  // useEffect(() => {
  //   if (password?.length > 0) {
  //     handleLoginCard(true)
  //   }
  //   // else console.log('useEffect NOPE')
  // }, [pw])

  const handleLogin = () => {
    // const loginSuccess = signin(password)
    // console.log('loginSuccess', loginSuccess)
    // if (loginSuccess) {
    //   onHideLoginCard()
    // } else {
    //   handleLoginCard()
    // }
    /////////////////////signin(pw)
  }

  // const handleLogout = () => {
  //   doSignOut()
  //   // logout()
  //   // onLogout()
  // }

  const handleInsta = () => {
    window.open('https://www.instagram.com/elmesias_delaspesas/')
    // window.open(window.location.origin + "/ROUTE_U_WANT", '_blank', 'toolbar=0,location=0,menubar=0');
  }

  return (
    <>
      <div className='header'>
        <p style={{ color: '#f5f6fa', pointer: 'none', userSelect: 'none' }}>_</p>
        {/* <FaInstagram onClick={handleInsta} /> */}

        {/* {!isLoggedIn && ( */}
        <div className='header__icon'>
          <Avatar
            src={currentUser?.photoURL}
            onClick={() => onAuthCardClick(isLoggedIn)}
            ref={iconEl}
          />
          {/* {!photoURL && (
              <AccountCircleIcon
                fontSize='large'
                color='primary'
                onClick={() => onAuthCardClick()}
                ref={iconEl}
              />
            )} */}
        </div>
        {/* )} */}
        {/* {isLoggedIn && (
          <div className='header__icon'>
            <ExitToApp fontSize='large' color='primary' onClick={handleLogout} ref={iconEl} />
          </div>
        )} */}

        {/* {loginCard && <AuthCard onClose={handleAuthCard} />} */}
      </div>

      {Object.keys(authCardDimensions).length > 0 && (
        <AuthCard
          authCardDimensions={authCardDimensions}
          onLogin={handleLogin}
          onHideAuthCard={onHideAuthCard}
          onPasswordChange={e => setPw(e.target.value)}
          isButtonDisabled={pw?.length === 0}
          onLogout={onLogout}
        />
      )}
    </>
  )
}

export default Header
