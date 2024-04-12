import React from 'react'
import './CitiesList.css'
import {
  Card,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  CardContent,
} from '@material-ui/core'
import CityItem from './CityItem'
import '../../App.css'

const CitiesList = ({ cities, visitedAmount, onCityChange }) => {
  // 0 = unvisitedGrey, 1 = visitedGreen, 2 = toVisitBlue

  return (
    <>
      <Card className='app__cityListCard citiesList__modifiableList'>
        {/* <h3 style={{ position: 'fixed' }}>
          Ya corrimos en{' '}
          <span style={{ color: '#0050ef' }}>{visitedAmount}</span> ciudades
        </h3> */}
        <CardContent
          className='citiesList__cardContent'
          style={{ overflow: 'hidden !important' }}
        >
          <div className='citiesList__items'>
            {/* style={{
              height: '400px',
              overflow: 'scroll',
              gap: '15px',
              display: 'flex',
              flexDirection: 'column',
            }} */}
            {cities?.map((city) => (
              <CityItem key={city.id} city={city} onCityChange={onCityChange} />
            ))}
          </div>
        </CardContent>
      </Card>
    </>
  )
}

export default CitiesList
