import { Circle, Popup } from 'react-leaflet'
import { citiesVisitValues } from './util'
import {
  beautifyDate,
  beautifyDateHour,
  get12HourFormatOfDate,
} from '../services/dateServices'
import MapCircleOverlaid from './MapCircleOverlaid'
import './utils.css'

const MapCircles = ({ cities, modifiedMapClone, modifiedCitiesMap }) => {
  // const [radius, setRadius] = useState(2000)

  // useEffect(() => {
  //   console.log('MapCircles useEffect', modifiedCitiesMap)
  //   if (city.visited === citiesVisitValues['tovisit'].visitedValue) {
  //     setRadius(radius)
  //   }
  // }, [modifiedCitiesMap])

  const showThem = () =>
    cities.map((city) => {
      if (!city) return <></>
      // console.log('city:', )
      let rad = String(city.name).includes('edell') ? 50000 : 2000
      let hexColor = citiesVisitValues.notVisited.hex

      if (city.visited === citiesVisitValues.visited.visitedValue)
        hexColor = citiesVisitValues.visited.hex
      else if (city.visited === citiesVisitValues.tovisit.visitedValue) {
        // console.log('blue city is', city.name)
        hexColor = citiesVisitValues.tovisit.hex
        rad = citiesVisitValues.tovisit.radius
      }
      // setRadius(rad)

      // undefined if city is not being modified
      let modifiedMapData = modifiedCitiesMap.get(city.name)

      // if (city.visited === citiesVisitValues['tovisit'].visitedValue)
      //   console.log('city.visited', city)

      return (
        <div key={city.name}>
          <Circle
            center={[city.lat, city.long]}
            color={hexColor}
            fillColor={hexColor}
            fillOpacity={0.4}
            radius={
              rad
              // + (city.visited === citiesVisitValues.tovisit.visitedValue
              //   ? 2000
              //   : 0)
            }
            key={city.name}
            className={`${
              city.visited === citiesVisitValues.tovisit.visitedValue
                ? 'pulsing-circle'
                : ''
            }`}
          >
            <Popup>
              <div className='util__cityInfoContainer'>
                <div className='util__cityInfoName'>{city.name}</div>
                <div className='util__circleContainer'>
                  <div
                    className={`util__circleWithBorder ${
                      city.visited === citiesVisitValues.notVisited.visitedValue
                        ? 'util__Grey'
                        : city.visited ===
                          citiesVisitValues.visited.visitedValue
                        ? 'util__Green'
                        : 'util__Blue'
                    }`}
                  ></div>
                  <div className='util__infoVisited'>
                    {city.visited ===
                    citiesVisitValues.notVisited.visitedValue ? (
                      <div>Aún por visitar</div>
                    ) : city.visited ===
                      citiesVisitValues.visited.visitedValue ? (
                      <div>Ya lo corrimos</div>
                    ) : (
                      <div>Próxima corrida</div>
                    )}
                  </div>
                </div>
                {city?.date && (
                  <>
                    <div className='util__dateInfo'>
                      <strong>Día: </strong>
                      <span>{beautifyDate(city.date)}</span>
                    </div>
                    <div className='util__dateInfo'>
                      <strong>Hora: </strong>
                      <span>{get12HourFormatOfDate(city.date)}</span>
                    </div>
                  </>
                )}
              </div>
            </Popup>
            {modifiedMapData && (
              <MapCircleOverlaid
                city={city}
                hexColor={hexColor}
                radius={rad}
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
