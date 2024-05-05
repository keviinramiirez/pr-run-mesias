import React from 'react'
import { MapContainer, TileLayer } from 'react-leaflet'
import './PRMap.css'
// import { showDataOnMap } from '../../utils/util'
import MapCircles from '../../utils/MapCircles'

function PRMap({ cities, modifiedCitiesMap, setModifiedCitiesMap }) {
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
        <MapCircles
          cities={cities}
          // originalCities={originalCities}
          modifiedCitiesMap={modifiedCitiesMap}
          setModifiedCitiesMap={setModifiedCitiesMap}
        />
      </MapContainer>
    </div>
  )
}

export default PRMap
