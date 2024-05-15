import { Circle } from 'react-leaflet'
import './CirclePopup.css'
import { visitValuesMap } from '../../../../services/cityService'

const MapCircleOverlaid = ({ city, hexColor, radius }) => {
  const { visited, lat, long } = city

  return (
    <>
      {city?.visited === visitValuesMap.tovisit && (
        <>
          <Circle
            center={[lat, long]}
            color={hexColor}
            fillColor={hexColor}
            fillOpacity={0.4}
            radius={radius + 4000}
            // className={`${visited === 2 ? 'pulsing-circle' : ''}`}
            // className='pulsing-circle'
          />
          <Circle
            center={[lat, long]}
            color={hexColor}
            fillColor={hexColor}
            fillOpacity={0.4}
            radius={radius}
            className={'circlePopup__blue'}
          />
        </>
      )}
      {visited === visitValuesMap.visited && (
        <Circle
          center={[lat, long]}
          color={'#01823d'}
          fillColor={'#01823d'}
          fillOpacity={0.4}
          radius={radius}
          className={'circlePopup__green'}
        />
      )}
      {visited === visitValuesMap.notvisited && (
        <Circle
          center={[lat, long]}
          color={hexColor}
          fillColor={hexColor}
          fillOpacity={0.4}
          radius={radius}
          className={'circlePopup__grey'}
        />
      )}
    </>
  )
}

export default MapCircleOverlaid
