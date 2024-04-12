import { useEffect, useState } from 'react'
import { Circle, Popup } from 'react-leaflet'
import { citiesVisitValues } from './util'
import MapCirclesOverlaid from './MapCirclesOverlaid'
import './utils.css'

const MapCircles = ({ cities }) => {
  const [modifiedHex, setModifiedHex] = useState(
    citiesVisitValues['notvisited'].hex
  )

  // useEffect(() => {
  //   console.log('MapCircles useEffect', cities)
  // }, [cities])

  const showThem = () =>
    cities.map((city) => {
      // console.log('city:', )
      let radius = String(city.name).includes('edell') ? 50000 : 2000
      let hexColor = citiesVisitValues['notvisited'].hex

      if (city.visited === citiesVisitValues['visited'].visitedValue)
        hexColor = citiesVisitValues['visited'].hex
      else if (city.visited === citiesVisitValues['tovisit'].visitedValue) {
        // console.log('blue city is', city.name)
        hexColor = citiesVisitValues['tovisit'].hex
        radius = citiesVisitValues['tovisit'].radius
      }

      // if (city.visited === 1) setHexColor(citiesVisitValues['visited'].hex)
      // else if (city.visited > 1) {
      //   console.log('blue city is', city.name)
      //   setHexColor(citiesVisitValues['tovisit'].hex)
      //   radius = citiesVisitValues['tovisit'].radius
      // }

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
                      city.visited ===
                      citiesVisitValues['notvisited'].visitedValue
                        ? 'util__Grey'
                        : city.visited ===
                          citiesVisitValues['visited'].visitedValue
                        ? 'util__Green'
                        : 'util__Blue'
                    }`}
                  ></div>
                  <div className='util__infoVisited'>
                    {city.visited ===
                    citiesVisitValues['tovisit'].visitedValue ? (
                      <div>Ya lo corrimos</div>
                    ) : city.visited ===
                      citiesVisitValues['visited'].visitedValue ? (
                      <div>Ya lo corrimos</div>
                    ) : (
                      <div>Próxima corrida</div>
                    )}
                  </div>
                </div>
              </div>
            </Popup>
          </Circle>
          <MapCirclesOverlaid city={city} hexColor={hexColor} radius={radius} />
        </div>
      )
    })
  return showThem()
}

export default MapCircles
