import React from 'react'
import { MapContainer, TileLayer } from 'react-leaflet'
// import { Map as MapContainer, TileLayer } from 'react-leaflet'
// import { Map as MapContainer, TileLayer } from 'react-leaflet'

// import { MapContainer } from 'react-leaflet/MapContainer'
// import { TileLayer } from 'react-leaflet/TileLayer'
import './PRMap.css'
import { showDataOnMap } from '../../utils/util'
import MapCircles from '../../utils/MapCircles'

function PRMap({ cities }) {
  // const [mapZoom, _] = useState(8)
  // const [mapCenter, __] = useState({
  //   lat: 18.200178,
  //   lng: -66.464513,
  // })
  // console.log('PRMap cities', cities)
  return (
    <div className='prmap'>
      <MapContainer
        center={{
          lat: 18.200178,
          lng: -66.464513,
        }}
        zoom={8}
      >
        <TileLayer
          url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        />
        {/* {showDataOnMap(cities)} */}
        <MapCircles cities={cities} />
      </MapContainer>
    </div>
  )
}

export default PRMap
