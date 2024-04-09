import React from 'react'
import { MapContainer, TileLayer } from 'react-leaflet'
// import { Map as MapContainer, TileLayer } from 'react-leaflet'
// import { Map as MapContainer, TileLayer } from 'react-leaflet'

// import { MapContainer } from 'react-leaflet/MapContainer'
// import { TileLayer } from 'react-leaflet/TileLayer'
import './PRMap.css'
import { showDataOnMap } from '../utils/util'

function PRMap({ cities, casesType, center, zoom }) {
  console.log('cities', cities)
  return (
    <div className='prmap'>
      <MapContainer center={center} zoom={zoom}>
        <TileLayer
          url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        />
        {showDataOnMap(cities, casesType)}
      </MapContainer>
    </div>
  )
}

export default PRMap
