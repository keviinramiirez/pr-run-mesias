import React, { useEffect, useState } from 'react'
import './LoginCard.css'
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

const LoginCard = ({ loginCardDimensions, onPasswordChange, onLogin, isButtonDisabled }) => {
  const [showPassword, setShowPassword] = useState(false)

  const handleClickShowPassword = () => {
    console.log('showPassword', showPassword)
    setShowPassword(!showPassword)
  }

  return (
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
          {/* <Input
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
          /> */}

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
