import { useEffect, useState } from 'react'
import { Circle, Popup } from 'react-leaflet'
import { citiesVisitValues } from './util'
import MapCircleOverlaid from './MapCircleOverlaid'
import './utils.css'

const MapCircles = ({
  cities,
  originalCities,
  modifiedCitiesMap,
  setModifiedCitiesMap,
}) => {
  // const [modifiedHex, setModifiedHex] = useState(
  //   citiesVisitValues['notvisited'].hex
  // )

  useEffect(() => {
    console.log('MapCircles useEffect', modifiedCitiesMap)
  }, [modifiedCitiesMap])

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

      // undefined if city is not being modified
      let modifiedMapData = modifiedCitiesMap.get(city.name)
      // console.log('modifiedMapData', modifiedMapData)
      // if (
      //   modifiedMapData &&
      //   modifiedMapData.prevVisitedValue === city.visited
      // ) {
      //   modifiedCity = undefined
      // }

      // if (modifiedCity) {
      //   console.log('originalCities', originalCities)
      //   const originalCityToModify = originalCities.find(
      //     (c) => c.name === modifiedCity.name
      //   )
      //   console.log('modifiedCity', modifiedCity)
      //   console.log('originalCityToModify', originalCityToModify)
      //   if (modifiedCity.visited === originalCityToModify.visited)
      //     modifiedCity = undefined
      //   else {
      //     console.log()
      //     console.log('Modifying hexColor')
      //     console.log('modifiedCity.visited', modifiedCity.visited)
      //     console.log(
      //       'originalCityToModify.visited',
      //       originalCityToModify.visited
      //     )
      //     hexColor = citiesVisitValues['notvisited'].hex

      //     if (
      //       modifiedCity.visited === citiesVisitValues['visited'].visitedValue
      //     )
      //       hexColor = citiesVisitValues['visited'].hex
      //     else if (
      //       modifiedCity.visited === citiesVisitValues['tovisit'].visitedValue
      //     ) {
      //       // console.log('blue city is', city.name)
      //       hexColor = citiesVisitValues['tovisit'].hex
      //       radius = citiesVisitValues['tovisit'].radius
      //     }
      //   }
      // }

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
                    citiesVisitValues['notvisited'].visitedValue ? (
                      <div>Aún por visitar</div>
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
            {modifiedMapData && (
              <MapCircleOverlaid
                city={city}
                hexColor={hexColor}
                radius={radius}
                modifiedCitiesMap={modifiedCitiesMap}
              />
            )}
          </Circle>
        </div>
      )
    })
  return showThem()
}

export default MapCircles
