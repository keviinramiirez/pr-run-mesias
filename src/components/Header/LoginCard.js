import React, { useState } from 'react'
import './LoginCard.css'
import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import Input from '@material-ui/core/Input'

const LoginCard = ({ loginCardDimensions, onHideCard, onLogin }) => {
  const [password, setPassword] = useState('')

  // const handlePasswordChange = (e) => setPassword(e.target.value)

  return (
    // <div
    //   className='loginCard'
    //   // style={{ top: cardDimensions.top + 'px', left: cardDimensions.left + 'px', width: '60px' }}
    //   // style={{ top: cardDimensions.top + 'px', left: '-115px', width: '140px' }}
    //   style={{
    //     top: loginCardDimensions.top + 'px',
    //     right: loginCardDimensions.right + 'px',
    //   }}
    //   onClick={onHideCard}
    // >
    //   <div className='card'>
    //     <span>Mesias Login</span>
    //     <section>
    //       <div className='cardItemContainer'>
    //         <div className='cardItem user-select-none'>
    //           <small>
    //             <b>{'QUe Hay'}</b>
    //           </small>
    //         </div>
    //       </div>
    //     </section>
    //   </div>
    // </div>
    <Card
      className='loginCard'
      variant='outlined'
      style={{
        top: loginCardDimensions.top + 'px',
        right: loginCardDimensions.right + 'px',
      }}
    >
      <CardContent>
        <Typography variant='h5' color='primary' align='center' gutterBottom>
          Mesias Login
        </Typography>
        <div style={{ marginTop: '2em' }}>
          <Input
            fullWidth
            placeholder='Contraseña'
            color='primary'
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button
            fullWidth
            style={{ marginTop: '1em' }}
            onClick={() => onLogin(password)}
            variant='contained'
            color='primary'
          >
            Login
          </Button>
        </div>

        {/* <Typography component='h2'>WUEH</Typography>
        <Typography color='textSecondary'>adjective</Typography>
        <Typography variant='body2' component='p'>
          well meaning and kindly.
          <br />
          {'"a benevolent smile"'}
        </Typography> */}
      </CardContent>
    </Card>
  )
}

export default LoginCard