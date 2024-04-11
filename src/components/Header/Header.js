import { useState, useEffect, useContext } from 'react'
import AuthContext from '../../store/AuthContext'
import AccountCircleIcon from '@material-ui/icons/AccountCircle'
import './Header.css'
import LoginCard from './LoginCard'
import ExitToApp from '@material-ui/icons/ExitToApp'

const Header = ({
  iconEl,
  loginCardDimensions,
  handleLoginCard,
  onHideLoginCard,
  isLoggedIn,
  onLogout,
}) => {
  const [pw, setPw] = useState('')
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

  return (
    <div>
      <div className='header'>
        <p style={{ color: '#f5f6fa', pointer: 'none', userSelect: 'none' }}>
          _
        </p>

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
        />
      )}
    </div>
  )
}

export default Header
