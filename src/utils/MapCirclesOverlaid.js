import { citiesVisitValues } from './util'
import { Circle } from 'react-leaflet'

const MapCirclesOverlaid = ({ city, hexColor, radius }) => {
  return (
    <>
      {city.visited === citiesVisitValues['tovisit'].visitedValue && (
        <>
          <Circle
            center={[city.lat, city.long]}
            color={hexColor}
            fillColor={hexColor}
            fillOpacity={0.4}
            radius={radius + 4000}
            className={`${city.visited > 1 ? 'pulsing-circle' : ''}`}
          />
          <Circle
            center={[city.lat, city.long]}
            color={hexColor}
            fillColor={hexColor}
            fillOpacity={0.4}
            radius={radius}
            className={'util__Blue'}
          />
        </>
      )}
      {city.visited === citiesVisitValues['visited'].visitedValue && (
        <Circle
          center={[city.lat, city.long]}
          color={hexColor}
          fillColor={hexColor}
          fillOpacity={0.4}
          radius={radius}
          className={'util__Green'}
        />
      )}
      {city.visited === citiesVisitValues['notvisited'].visitedValue && (
        <Circle
          center={[city.lat, city.long]}
          color={hexColor}
          fillColor={hexColor}
          fillOpacity={0.4}
          radius={radius}
          className={'util__Grey'}
        />
      )}
    </>
  )
}

export default MapCirclesOverlaid