import './CirclePopup.css'
import { Circle, Popup } from 'react-leaflet'
import { beautifyDate, get12HourFormatOfDate } from '../../../../services/dateServices'
import MapCircleOverlaid from './MapCircleOverlaid'
// import './utils.css'
import {
  getVisitColor,
  getVisitLabel,
  isNotvisitedValue,
  isTovisitValue,
  isVisitedValue,
  visitValuesMap,
} from '../../../../services/cityService'

const CirclePopup = ({ cities, modifiedCitiesMap }) => {
  // const [radius, setRadius] = useState(2000)

  // useEffect(() => {
  //   console.log('MapCircles useEffect', modifiedCitiesMap)
  //   if (city.visited === visitValuesMap.tovisit) {
  //     setRadius(radius)
  //   }
  // }, [modifiedCitiesMap])

  const showThem = () =>
    cities.map(city => {
      if (!city) return <></>
      const { name, visited, lat, long, date } = city

      // console.log('city:', )
      let rad = String(name).includes('edell') ? 50000 : 2000
      let hexColor = getVisitColor(visited)

      if (isVisitedValue(visited)) {
        hexColor = '#00bc58'
      }
      if (isTovisitValue(visited)) {
        rad = 3500
      }

      let modifiedMapData = modifiedCitiesMap.get(name) // undefined if city is not being modified

      // if (city.visited === citiesVisitValues['tovisit'])
      //   console.log('city.visited', city)

      return (
        <div key={name}>
          <Circle
            center={[lat, long]}
            color={hexColor}
            fillColor={hexColor}
            fillOpacity={0.4}
            radius={rad}
            key={name}
            className={`${visited === visitValuesMap.tovisit ? 'circlePopup__pulsingCircle' : ''}`}
          >
            <Popup>
              <div className='circlePopup__cityInfoContainer'>
                <div className='circlePopup__cityInfoName'>{name}</div>
                <div className='circlePopup__circleContainer'>
                  <div
                    className={`circlePopup__circleWithBorder ${
                      isNotvisitedValue(visited)
                        ? 'circlePopup__grey'
                        : isVisitedValue(visited)
                        ? 'circlePopup__green'
                        : 'circlePopup__blue'
                    }`}
                  ></div>
                  <div className='circlePopup__infoVisited'>
                    <div>{getVisitLabel(visited)}</div>
                  </div>
                </div>
                {date && (
                  <>
                    <div className='circlePopup__dateInfo'>
                      <strong>Día: </strong>
                      <span>{beautifyDate(date)}</span>
                    </div>
                    <div className='circlePopup__dateInfo'>
                      <strong>Hora: </strong>
                      <span>{get12HourFormatOfDate(date)}</span>
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

export default CirclePopup
