import './ModifiableCityItem.css'
import { beautifyDate, get12HourFormatOfDate } from '../../../../services/dateServices'
import Circle from '../../../map/Circle'
import { Button } from '@material-ui/core'
// import { useAuthContext } from '../../../../store/AuthProvider'
// import { useState, useEffect } from 'react'
// import { checkIsSubscribedCity, getCityVisitedColor } from '../../../../services/cityService'

const ModifiableCityItem = ({
  city,
  userType,
  isSubscribedCity,
  onSubscription,
  onOpenCityEdit,
}) => {
  const { name, lat, visited, date } = city

  // Context API
  // const { dispatchUserCitySubscription } = useAuthContext()
  // const { currentUser } = authState
  // const { subscribedCities } = currentUser

  // if (subscribedCities) console.log('subscribedCities', subscribedCities)

  // useEffect(() => {
  //   setIsSubscribedCity(isSubscribedCity(currentUser, city))
  // }, [subscribedCities])

  return (
    <tr key={name + lat} className='modifiableTableItem'>
      <td>
        <Circle visited={visited} />
      </td>
      <td
        style={{
          width: `${userType === 'admin' ? '180px' : ''}`,
          // color: getCityVisitedColor(city),
        }}
      >
        {name}
      </td>
      <td style={{ width: `${userType === 'admin' ? '110px' : ''}` }}>
        {date && (
          <div className='modifiableTableItem__dateContent'>
            <p>{beautifyDate(date)}</p>
            <span>{get12HourFormatOfDate(date)} </span>
          </div>
        )}
      </td>
      <td>
        {userType === 'admin' && (
          <Button onClick={() => onOpenCityEdit(city)} color='primary' variant='outlined'>
            Ver
          </Button>
        )}
        {userType === 'guest' && visited === 2 && (
          <Button
            className='modifiableTableItem__button'
            // onClick={() => onSubscribe(city)}
            onClick={() => onSubscription(city)}
            // color={'secondary'}
            color={`${isSubscribedCity ? 'secondary' : 'primary'}`}
            variant={`${isSubscribedCity ? 'outlined' : 'contained'}`}
            fullWidth
          >
            {`${isSubscribedCity ? 'Desuscribirse' : 'suscribirse'}`}
          </Button>
        )}
      </td>
      {/* {date && (
        <>
          <td>
            <span>{beautifyDate(date)} </span>
          </td>
          <td>
            <span>{get12HourFormatOfDate(date)} </span>
          </td>
        </>
      )} */}
    </tr>
  )
}

export default ModifiableCityItem
