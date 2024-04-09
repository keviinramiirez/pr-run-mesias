import React from 'react'
import numeral from 'numeral'
import { Circle, Popup } from 'react-leaflet'
import './utils.css'

export const sortCitiesByName = (data) => {
  const sortedData = [...data]
  sortedData.sort((a, b) => (a.name > b.name ? 1 : -1))
  return sortedData
}

const casesTypeColors = {
  notvisited: {
    hex: '#808080',
    rgb: 'rgb(204, 16, 52)',
    half_op: 'rgba(204, 16, 52, 0.5)',
    radius: 2000,
  },
  visited: {
    hex: '#00d061',
    rgb: 'rgb(125, 215, 29)',
    half_op: 'rgba(125, 215, 29, 0.5)',
    radius: 2000,
  },
  tovisit: {
    hex: '#0050ef',
    rgb: 'rgb(251, 68, 67)',
    half_op: 'rgba(251, 68, 67, 0.5)',
    radius: 3500,
  },
}

export const showDataOnMap = (cities) =>
  cities.map((city) => {
    // console.log('city:', )
    let radius = String(city.name).includes('edell') ? 50000 : 2000
    let hexColor = casesTypeColors['notvisited'].hex

    if (city.visited > 0) hexColor = casesTypeColors['visited'].hex
    else if (city.visited < 0) {
      hexColor = casesTypeColors['tovisit'].hex
      radius = casesTypeColors['tovisit'].radius
    }

    // if (city.visited >= 0) return null

    return (
      <div>
        <Circle
          center={[city.lat, city.long]}
          color={hexColor}
          fillColor={hexColor}
          fillOpacity={0.4}
          radius={radius}
          // className={`${city.visited < 0 ? 'circle-zoom' : ''}`}
        >
          <Popup>
            <div className='util__cityInfoContainer'>
              <div className='util__cityInfoName'>{city.name}</div>
              <div className='util__circleContainer'>
                <div
                  className={`util__circleWithBorder ${
                    city.visited > 0 ? 'util__Green' : 'util__Grey'
                  }`}
                ></div>
                <div className='util__infoVisited'>
                  {city.visited > 0 ? (
                    <div>Ya lo corrimos</div>
                  ) : (
                    <div>Aún sin visitar</div>
                  )}
                </div>
              </div>
            </div>
          </Popup>
        </Circle>
        {city.visited < 0 && (
          <Circle
            center={[city.lat, city.long]}
            color={hexColor}
            fillColor={hexColor}
            fillOpacity={0.4}
            radius={radius + 4000}
            className={`${city.visited < 0 ? 'pulsing-circle' : ''}`}
          ></Circle>
        )}
      </div>
    )
  })

// <Popup>
//         <div className='info-container'>
//           <div className='info-flag'
//               style={{ backgroundImage: `url(${country.countryInfo.flag})` }}>
//             </div>
//           <div className='util__infoName'>{city.name}</div>
//           <div className='info-confirmed'>Label Here</div>
//           <div className='info-deaths'>
//             Deaths: {numeral(country.deaths).format('0,0')}
//           </div>
//         </div>
//       </Popup>