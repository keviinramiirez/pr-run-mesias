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

const CitiesList = ({ cities, onCityChange, visitedAmount }) => {
  // 0 = unvisitedGrey, 1 = visitedGreen, 2 = toVisitBlue
  console.log()

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
          <div
            className='citiesList__items'
            // style={{
            //   height: '400px',
            //   overflow: 'scroll',
            //   gap: '15px',
            //   display: 'flex',
            //   flexDirection: 'column',
            // }}
          >
            {cities?.map((city) => (
              <CityItem key={city.id} city={city} onCityChange={onCityChange} />
            ))}
            {/* <FormControl>
          <InputLabel id='select-label'>STATUS</InputLabel>
          <Select variant='outlined' onChange={onCityChange} value={0}>
          </Select>
        </FormControl> */}
            {/* <div>

        {/* {cities?.map((city) => (
          <VisitedCity
            key={city.id}
            cities={cities}
            city={city}
            onCityChange={onCityChange}
          />
        ))} */}
            {/* </div> */}
          </div>
        </CardContent>
      </Card>
    </>
  )
}

export default CitiesList
