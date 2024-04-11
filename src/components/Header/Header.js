// import { useState, useRef } from 'react'
import AccountCircleIcon from '@material-ui/icons/AccountCircle'
import './Header.css'
import LoginCard from './LoginCard'
import ExitToApp from '@material-ui/icons/ExitToApp'

const Header = ({ iconEl, handleLoginCard, isLoggedIn, onLogout }) => {
  // const [loginCard, setLoginCard] = useState(false)
  // const [loginCardDimensions, setLoginCardDimensions] = useState({})

  // const iconEl = useRef(null)

  // const handleLoginCard = () => {
  //   console.log('loginCard', loginCard)
  //   // setLoginCard(!loginCard)
  //   const isAlreadyOpen = Object.keys(loginCardDimensions).length > 0
  //   // if (loginCard) setLoginCard(false)
  //   if (isAlreadyOpen) setLoginCardDimensions({})
  //   else {
  //     // if (unseenNotificationAmount > 0) {
  //     //   axios.post(server.markNotificationsAsSeen()).then(_ => {
  //     //     setUnseenNotificationAmount(0);
  //     //   })
  //     // }
  //     console.log('iconEl', iconEl, loginCardDimensions)
  //     const iconMarginRightMarginRight = 32
  //     setLoginCardDimensions({
  //       top: iconEl.current.clientTop + iconEl.current.clientHeight,
  //       right: iconMarginRightMarginRight + iconEl.current.clientWidth,
  //     })
  //     // setLoginCard(true)
  //   }
  // }

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
              onClick={handleLoginCard}
              ref={iconEl}
            />
          </div>
        )}
        {isLoggedIn && (
          <div className='header__icon'>
            <ExitToApp
              fontSize='large'
              color='primary'
              onClick={onLogout}
              ref={iconEl}
            />
          </div>
        )}
        {/* {Object.keys(loginCardDimensions).length > 0 && ( */}

        {/* {loginCard && <LoginCard onClose={handleLoginCard} />} */}
      </div>
      {/* {Object.keys(loginCardDimensions).length > 0 && (
        <LoginCard loginCardDimensions={loginCardDimensions} />
      )} */}
    </div>
    // <>
    //   {window.innerWidth <= 425 && (
    //     <div onClick={openNavDrawer}>
    //       <Icon
    //         IconComponent={iconComponents.Bars}
    //         size='md'
    //         color='dark'
    //         className='mb-1'
    //       />
    //     </div>
    //   )}
    //   <div
    //     className='navbar__icon'
    //     ref={bellIconEl}
    //   >
    //     <Icon
    //       IconComponent={iconComponents.Bell}
    //       size='lg'
    //       color='primary'
    //       className='mb-1'
    //       onClick={toggleNotificationCard}
    //     />
    //     <NotificationAmountLabel
    //       unseenNotificationAmount={unseenNotificationAmount}
    //     />
    //   </div>
    //   {Object.keys(notificationCardDimensions).length > 0 && (
    //     <NotificationCard
    //       cardDimensions={notificationCardDimensions}
    //       notifications={notifications}
    //       onHideCard={hideNotificationCard}
    //     />
    //   )}
    //   {displayNavDrawer && <NavDrawer onClose={closeNavDrawer} />}
    // </>
  )
}

export default Header
