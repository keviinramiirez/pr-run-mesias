import { useState, useEffect, useContext } from 'react'
import AuthContext from '../../store/AuthContext'
import AccountCircleIcon from '@material-ui/icons/AccountCircle'
import './Header.css'
import LoginCard from './LoginCard'
import ExitToApp from '@material-ui/icons/ExitToApp'
import { FaInstagram } from 'react-icons/fa'

const Header = ({
  iconEl,
  loginCardDimensions,
  handleLoginCard,
  onHideLoginCard,
  isLoggedIn,
  onLogout,
}) => {
  const [pw, setPw] = useState('')
  // const [disableButton, setDisableButton] = useState(true)
  const { authState, signin, logout, fetchUserDataByToken } =
    useContext(AuthContext)
  const { password } = authState

  useEffect(() => {
    fetchUserDataByToken()
  }, [])

  useEffect(() => {
    console.log('useEffect password', password)
    if (password?.length > 0) {
      console.log('useEffect isLoggedIn')
      handleLoginCard(true)
    }
    // else console.log('useEffect NOPE')
  }, [password])

  useEffect(() => {
    console.log('useEffect password', password)
    if (password?.length > 0) {
      console.log('useEffect isLoggedIn')
      handleLoginCard(true)
    }
    // else console.log('useEffect NOPE')
  }, [pw])

  const handleLogin = () => {
    // const loginSuccess = signin(password)
    // console.log('loginSuccess', loginSuccess)
    // if (loginSuccess) {
    //   onHideLoginCard()
    // } else {
    //   handleLoginCard()
    // }
    signin(pw)
  }

  const handleLogout = () => {
    logout()
    // setLoggedIn(false)
    onLogout()
  }

  const handleInsta = () => {
    window.open('https://www.instagram.com/elmesias_delaspesas/')
    // window.open(window.location.origin + "/ROUTE_U_WANT", '_blank', 'toolbar=0,location=0,menubar=0');
  }

  return (
    <div>
      <div className='header'>
        <p style={{ color: '#f5f6fa', pointer: 'none', userSelect: 'none' }}>
          _
        </p>
        {/* <FaInstagram onClick={handleInsta} /> */}

        {!isLoggedIn && (
          <div className='header__icon'>
            <AccountCircleIcon
              fontSize='large'
              color='primary'
              onClick={() => handleLoginCard()}
              ref={iconEl}
            />
          </div>
        )}
        {isLoggedIn && (
          <div className='header__icon'>
            <ExitToApp
              fontSize='large'
              color='primary'
              onClick={handleLogout}
              ref={iconEl}
            />
          </div>
        )}

        {/* {loginCard && <LoginCard onClose={handleLoginCard} />} */}
      </div>

      {Object.keys(loginCardDimensions).length > 0 && (
        <LoginCard
          loginCardDimensions={loginCardDimensions}
          onLogin={handleLogin}
          onHideLoginCard={onHideLoginCard}
          onPasswordChange={(e) => setPw(e.target.value)}
          isButtonDisabled={pw?.length === 0}
        />
      )}
    </div>
  )
}

export default Header
